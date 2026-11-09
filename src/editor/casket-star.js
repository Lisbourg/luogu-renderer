/* ============================================================================
 * CasketStar —— 编辑器总组件
 * ----------------------------------------------------------------------------
 * 结构：header(MToolbar) / content(cs-editor + cs-viewer) / footer（字数统计、
 * 同步开关、回到顶部）；弹窗 Teleport 到 #app（无 #app 则 body）；
 * 编辑器↔预览双向滚动同步（mdast 块偏移 ↔ DOM 位置线性插值）；
 * 拖拽/粘贴上传（upload prop 注入）；60 秒节流自动保存。
 * ========================================================================== */
import {
  defineComponent, ref, computed, watch, nextTick, useModel, unref,
  openBlock, createElementBlock, createElementVNode, createVNode,
  createCommentVNode, renderList, mergeDefaults, mergeProps, useAttrs,
  normalizeClass, normalizeStyle, toDisplayString, isRef, Teleport, createBlock,
  onMounted, onUnmounted, Fragment, createTextVNode,
} from '../bridge/vue.js';
import { throttle, sortedIndex } from '../bridge/lodash.js';
import { FontAwesomeIcon } from './fontawesome.js';
import { translateToolbarText, setLanguageTables } from './i18n.js';
import { MToolbar } from './toolbar.js';
import { MEditor } from './edit-area.js';
import { MViewer } from './viewer.js';
import { readAutoSaveList } from './dialogs.js';
import { casketDefaultPluginsFactory } from './plugins.js';

const casketHeaderProps = {
        key: 0,
        class: "cs-header"
    },
    casketFooterProps = {
        key: 1,
        class: "cs-footer"
    },
    casketFooterLeftProps = {
        class: "cs-footer-left"
    },
    casketFooterRightProps = {
        class: "cs-footer-right"
    },
    CasketStar = defineComponent({
        inheritAttrs: false,
        __name: "CasketStar",
        props: mergeDefaults({
            plugins: {
                default: casketDefaultPluginsFactory
            },
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            showViewer: {
                type: Boolean,
                default: true
            },
            showEditor: {
                type: Boolean,
                default: true
            },
            fullScreen: {
                type: Boolean,
                default: false
            },
            lang: {
                default: () => []
            },
            upload: {
                type: Function,
                default: void 0
            },
            height: {
                default: "400px"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            autosave: {
                default: 10
            },
            interval: {
                default: 500
            },
            extData: {
                default: () => Object()
            }
        }, {
            modelValue: {
                required: true
            },
            modelModifiers: {}
        }),
        emits: mergeDefaults(["viewupdated"], ["update:modelValue"]),
        setup(props, {
            emit: emitFn
        }) {
            let cmView;
            const attrs = useAttrs(),
                // 弹窗 Teleport 目标：真站源码即此逻辑 —— 有 #app 用 #app，否则 body
                teleportTarget = typeof document > "u" || !document.querySelector("#app") ? "body" : "#app",
                propsAlias = props,
                runtimeState = ref({
                    showEditor: propsAlias.showEditor,
                    showViewer: propsAlias.showViewer,
                    fullScreen: propsAlias.fullScreen,
                    interval: propsAlias.interval,
                    plugins: propsAlias.plugins,
                    data: {
                        upload: propsAlias.upload,
                        ...propsAlias.extData
                    }
                }),
                emit = emitFn;
            watch(runtimeState.value, (() => {
                nextTick((() => recalcAndSync()))
            }));
            const modelValueRef = useModel(props, "modelValue");
            // 重建 i18n 翻译表：lang 数组里的每一张词表都覆盖英文底表
            setLanguageTables(propsAlias.lang);
            const draggingRef = ref(false),
                uploadingRef = ref(false),
                lastSavedAtRef = ref(0);

            function onEditorReady(view) {
                cmView = view.view, editorScrollDOMRef.value = cmView.scrollDOM, editorScrollDOMRef.value.onscroll = () => syncViewerFromEditor(), editorScrollDOMRef.value.ondragover = onDragOver, editorScrollDOMRef.value.ondragenter = onDragEnter, editorScrollDOMRef.value.ondragleave = onDragLeave, editorScrollDOMRef.value.ondrop = onDrop, editorScrollDOMRef.value.addEventListener("paste", onPaste, true)
            }
            let docOffsets = [],
                screenOffsets = [];
            const syncEnabledRef = ref(true),
                editorScrollDOMRef = ref(null),
                viewerElRef = ref(null),
                dialogRef = ref(null);
            let mdastTree = null,
                viewerElement = null;

            // 编辑区按内容高度算出的最大可滚动距离
            function editorMaxScroll() {
                if (!cmView || !editorScrollDOMRef.value) return 0;
                const {
                    top: top,
                    bottom: bottom
                } = cmView.documentPadding, contentH = (cmView.contentHeight - bottom + Math.min(top, bottom)) / cmView.scaleY;
                return Math.max(0, Math.min(editorScrollDOMRef.value.scrollHeight, contentH) - editorScrollDOMRef.value.clientHeight)
            }

            function viewerMaxScroll() {
                return viewerElRef.value ? viewerElRef.value.scrollHeight - viewerElRef.value.clientHeight : 0
            }

            // 重算映射表：docOffsets = 各 mdast 块在文档中的偏移；
            // screenOffsets = 对应 DOM 块在预览里的屏幕位置（跳过 KaTeX display）
            function recalcSyncMaps() {
                !cmView || !editorScrollDOMRef.value || !viewerElRef.value || !syncEnabledRef.value || !mdastTree || !viewerElement || ([docOffsets, screenOffsets] = function (tree, el) {
                    var pos;
                    const docOffs = [0],
                        screenOffs = [0];
                    for (const child of tree.children) void 0 !== (null == (pos = child.position) ? void 0 : pos.start.offset) && docOffs.push(child.position.start.offset);
                    const scrollBase = el.scrollTop - el.getBoundingClientRect().top;
                    let maxBottom = 0;
                    for (const child of Array.from(el.children))
                        if (!child.classList.contains("katex-display")) {
                            const {
                                top: top,
                                bottom: bottom
                            } = child.getBoundingClientRect();
                            screenOffs.push(top + scrollBase), maxBottom = Math.max(maxBottom, bottom + scrollBase)
                        } return docOffs.push(cmView.state.doc.length), screenOffs.push(maxBottom), [docOffs, screenOffs]
                }(mdastTree, viewerElement))
            }

            // 自动保存（60 秒节流）：写 localStorage["casket-auto-save"]
            function saveNowInternal() {
                if (propsAlias.autosave <= 0) return false;
                const now = Date.now(),
                    ok = function (record, limit) {
                        if (limit <= 0) return false;
                        const list = readAutoSaveList();
                        list.length >= limit && list.splice(0, list.length - limit + 1);
                        const last = list[list.length - 1];
                        if (last && last.content === record.content && last.source === record.source) return false;
                        list.push(record);
                        try {
                            return localStorage.setItem("casket-auto-save", JSON.stringify(list)), true
                        } catch {
                            return false
                        }
                    }({
                        time: now,
                        content: modelValueRef.value,
                        source: `${window.location.pathname}${window.location.search}`
                    }, propsAlias.autosave);
                return ok && (lastSavedAtRef.value = now), ok
            }
            const throttledSave = throttle((() => {
                saveNowInternal()
            }), 60000);

            // 模板里 Mod-s 绑定的"立即保存"
            function forceSave() {
                return !(propsAlias.autosave <= 0 || (throttledSave.cancel(), saveNowInternal(), 0))
            }

            function queueSave() {
                throttledSave()
            }
            // 预览重渲染 + 同步（100ms 节流；窗口 resize 也走这里）
            const recalcAndSync = throttle((() => {
                recalcSyncMaps(), syncViewerFromEditor()
            }), 100);

            function onViewerUpdate(tree, el) {
                mdastTree = tree, viewerElement = el, recalcAndSync(), emit("viewupdated", el, tree)
            }

            function getCodemirror() {
                return cmView
            }

            function getCasketstar() {
                return runtimeState.value
            }
            let hoverSide = "editor";

            // 编辑 → 预览滚动同步：按映射表线性插值
            function syncViewerFromEditor() {
                var sv, vv;
                if (!cmView || !editorScrollDOMRef.value || "editor" !== hoverSide || !syncEnabledRef.value) return;
                const scrollTop = editorScrollDOMRef.value.scrollTop,
                    docPos = cmView.lineBlockAtHeight(scrollTop).from;
                if (scrollTop + 10 >= editorMaxScroll()) return void(null == (sv = viewerElRef.value) || sv.scrollTo({
                    top: viewerMaxScroll() + 10
                }));
                const idx = sortedIndex(docOffsets, docPos + 1);
                if (idx <= 0) return;
                const prevDoc = docOffsets[idx - 1],
                    nextDoc = docOffsets[idx],
                    blockTop = cmView.lineBlockAt(prevDoc).top;
                {
                    const ratio = (scrollTop - blockTop) / (cmView.lineBlockAt(nextDoc).top - blockTop),
                        target = screenOffsets[idx - 1] + ratio * (screenOffsets[idx] - screenOffsets[idx - 1]);
                    null == (vv = viewerElRef.value) || vv.scrollTo({
                        top: target
                    })
                }
            }

            // 预览 → 编辑滚动同步（反向插值）
            function syncEditorFromViewer() {
                var se, ve;
                if ("viewer" !== hoverSide || !cmView || !viewerElRef.value || !syncEnabledRef.value) return;
                const scrollTop = viewerElRef.value.scrollTop;
                if (scrollTop + 10 >= viewerMaxScroll()) return void(null == (se = editorScrollDOMRef.value) || se.scrollTo({
                    top: editorMaxScroll()
                }));
                const idx = sortedIndex(screenOffsets, scrollTop + 1);
                if (idx <= 0) return;
                const prevScreen = screenOffsets[idx - 1],
                    ratio = (scrollTop - prevScreen) / (screenOffsets[idx] - prevScreen);
                {
                    const prevDoc = docOffsets[idx - 1],
                        nextDoc = docOffsets[idx],
                        blockTop = cmView.lineBlockAt(prevDoc).top,
                        delta = ratio * (cmView.lineBlockAt(nextDoc).top - blockTop);
                    return void(null == (ve = editorScrollDOMRef.value) || ve.scrollTo({
                        top: Math.max(0, Math.min(blockTop + delta, editorMaxScroll()))
                    }))
                }
            }

            function toggleSync() {
                syncEnabledRef.value ? syncEnabledRef.value = false : (syncEnabledRef.value = true, hoverSide = "editor", recalcSyncMaps(), syncViewerFromEditor())
            }

            function backToTop() {
                editorScrollDOMRef.value && editorScrollDOMRef.value.scrollTo({
                    top: 0,
                    behavior: "auto"
                }), viewerElRef.value && viewerElRef.value.scrollTo({
                    top: 0,
                    behavior: "auto"
                })
            }

            function onDragEnter(ev) {
                var dt;
                if (null != (dt = ev.dataTransfer) && dt.items)
                    for (let i = 0; i < ev.dataTransfer.items.length; i++)
                        if ("file" === ev.dataTransfer.items[i].kind) return void(draggingRef.value = true)
            }

            function onDragLeave() {
                draggingRef.value = false
            }

            function onDragOver(ev) {
                ev.preventDefault()
            }
            async function onDrop(ev) {
                var dt;
                draggingRef.value = false, propsAlias.upload && null != (dt = ev.dataTransfer) && dt.files.length && (ev.preventDefault(), await uploadAndInsert(ev.dataTransfer.files))
            }

            // 粘贴图片 → 上传（只拦图片文件，其余粘贴行为不动）
            function onPaste(ev) {
                if (!propsAlias.upload || ev.defaultPrevented || !ev.clipboardData) return;
                const images = Array.from(ev.clipboardData.files).filter(f => f.type.startsWith("image/"));
                if (!images.length) return;
                ev.preventDefault();
                const dt = new DataTransfer;
                for (const f of images) dt.items.add(f);
                uploadAndInsert(dt.files)
            }
            async function uploadAndInsert(files) {
                if (propsAlias.upload && !uploadingRef.value && !propsAlias.disabled) {
                    uploadingRef.value = true;
                    try {
                        const uploaded = await propsAlias.upload(files);
                        if (null == uploaded || !uploaded.length || !cmView) return;
                        const state = cmView.state,
                            md = uploaded.map(f => `![${f.alt}](${f.url})`).join("\n"),
                            transaction = state.update(state.changeByRange((range => ({
                                changes: {
                                    from: range.from,
                                    to: range.to,
                                    insert: md
                                },
                                range: EditorSelection.range(range.from + md.length, range.from + md.length)
                            }))));
                        cmView.update([transaction]), cmView.focus()
                    } catch (err) {
                        console.error("Image upload failed", err)
                    } finally {
                        uploadingRef.value = false
                    }
                }
            }
            return onMounted((() => {
                addEventListener("resize", recalcAndSync)
            })), onUnmounted((() => {
                var esd;
                throttledSave.flush(), removeEventListener("resize", recalcAndSync), null == (esd = editorScrollDOMRef.value) || esd.removeEventListener("paste", onPaste, true), null == cmView || cmView.destroy(), cmView = void 0
            })), (_ctx, _cache) => (openBlock(), createBlock(Teleport, {
                to: unref(teleportTarget),
                disabled: !runtimeState.value.fullScreen
            }, [createElementVNode("div", mergeProps(unref(attrs), {
                class: ["casket cs-main", {
                    "cs-full-screen": runtimeState.value.fullScreen
                }]
            }), [propsAlias.hideHeader ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", casketHeaderProps, [createVNode(MToolbar, {
                "toolbar-l": propsAlias.plugins.toolbarL,
                "toolbar-r": propsAlias.plugins.toolbarR,
                "get-codemirror": getCodemirror,
                "get-casketstar": getCasketstar,
                dialog: dialogRef.value,
                disabled: propsAlias.disabled || uploadingRef.value
            }, null, 8, ["toolbar-l", "toolbar-r", "dialog", "disabled"])])), createElementVNode("div", {
                class: "cs-content",
                style: normalizeStyle({
                    height: propsAlias.height
                })
            }, [runtimeState.value.showEditor ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["cs-editor", {
                    "cs-midline": runtimeState.value.showViewer,
                    "cs-zone-half": runtimeState.value.showViewer,
                    "cs-zone-full": !runtimeState.value.showViewer
                }]),
                onMouseover: _cache[1] || (_cache[1] = ev => isRef(hoverSide) ? hoverSide.value = "editor" : hoverSide = "editor")
            }, [createVNode(MEditor, {
                modelValue: modelValueRef.value,
                "onUpdate:modelValue": [_cache[0] || (_cache[0] = val => modelValueRef.value = val), queueSave],
                plugins: props.plugins,
                "get-codemirror": getCodemirror,
                "get-casketstar": getCasketstar,
                dialog: dialogRef.value,
                disabled: propsAlias.disabled || uploadingRef.value,
                "save-now": forceSave,
                onReady: onEditorReady
            }, null, 8, ["modelValue", "plugins", "dialog", "disabled"]), propsAlias.upload ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["cs-upload", {
                    dragging: draggingRef.value || uploadingRef.value
                }])
            }, toDisplayString(unref(translateToolbarText)(uploadingRef.value ? "image-uploading" : "release-to-update")), 3)) : createCommentVNode("", true)], 34)) : createCommentVNode("", true), runtimeState.value.showViewer ? (openBlock(), createElementBlock("div", {
                key: 1,
                ref_key: "viewer",
                ref: viewerElRef,
                class: normalizeClass(["cs-viewer", {
                    "cs-zone-half": runtimeState.value.showEditor,
                    "cs-zone-full": !runtimeState.value.showEditor
                }]),
                onScroll: syncEditorFromViewer,
                onMouseover: _cache[3] || (_cache[3] = ev => isRef(hoverSide) ? hoverSide.value = "viewer" : hoverSide = "viewer")
            }, [createVNode(MViewer, {
                modelValue: modelValueRef.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = val => modelValueRef.value = val),
                plugins: props.plugins,
                interval: runtimeState.value.interval,
                onUpdate: onViewerUpdate
            }, null, 8, ["modelValue", "plugins", "interval"])], 34)) : createCommentVNode("", true)], 4), propsAlias.hideFooter ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", casketFooterProps, [createElementVNode("div", casketFooterLeftProps, [createTextVNode(toDisplayString(unref(translateToolbarText)("character-count")) + toDisplayString(modelValueRef.value.length) + toDisplayString(unref(translateToolbarText)("character")) + " ", 1), lastSavedAtRef.value ? (openBlock(), createElementBlock(Fragment, {
                key: 0
            }, [createTextVNode(toDisplayString(" | " + unref(translateToolbarText)("auto-save-last") + " " + new Date(lastSavedAtRef.value).toLocaleTimeString()), 1)], 64)) : createCommentVNode("", true)]), createElementVNode("div", casketFooterRightProps, [createElementVNode("span", {
                class: "cs-footer-button",
                onClick: toggleSync
            }, toDisplayString(syncEnabledRef.value ? unref(translateToolbarText)("sync-disable") : unref(translateToolbarText)("sync-enable")), 1), createElementVNode("span", {
                class: "cs-footer-button",
                onClick: backToTop
            }, toDisplayString(unref(translateToolbarText)("back-to-top")), 1)])])), (openBlock(), createBlock(Teleport, {
                to: unref(teleportTarget)
            }, [createElementVNode("div", {
                ref_key: "dialog",
                ref: dialogRef,
                class: "casket"
            }, null, 512)], 8, ["to"]))], 16)], 8, ["to", "disabled"]))
        }
    });

export { CasketStar };
