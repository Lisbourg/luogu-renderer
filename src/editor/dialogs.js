/* ============================================================================
 * 弹窗体系：MDialog 外壳 + 各插入弹窗（代码/图片/表格/链接/帮助/自动保存）
 * ----------------------------------------------------------------------------
 * MDialog：点击容器空白处关闭（extra 模式为大弹窗不自动关）；内容走 default
 * 插槽，extra 模式右侧另有 view 插槽。各 Tool* 组件是 MDialog 的薄封装。
 * 弹窗由工具栏按钮动态 createVNode + render 挂到弹窗容器上，关闭即卸载。
 * ========================================================================== */
import {
  defineComponent, ref, unref, computed, watch, nextTick,
  openBlock, createElementBlock, createElementVNode, createVNode,
  createCommentVNode, createTextVNode, renderList, withDirectives,
  normalizeClass, toDisplayString, mergeDefaults, vModelText, vModelSelect, render,
  Fragment, Teleport, createBlock, renderSlot, withCtx,
} from '../bridge/vue.js';
import { FontAwesomeIcon } from './fontawesome.js';
import { toolbarIconMap } from './toolbar-icons.js';
import { translateToolbarText } from './i18n.js';

/* 以下常量为模板编译产物中的静态 VNode props，保持原写法即可。 */
const dialogHeaderProps = {
    class: "cs-dialog-header"
}, dialogViewProps = {
    key: 0,
    class: "cs-dialog-view"
};
const MDialog = defineComponent({
    __name: "MDialog",
    props: {
        extra: {
            type: Boolean,
            default: false
        }
    },
    emits: ["close"],
    setup(props, {
        emit: emitFn
    }) {
        const emitClose = emitFn,
            propsAlias = props,
            dialogRef = ref(void 0);

        function onContainerClick(ev) {
            propsAlias.extra || dialogRef.value && !dialogRef.value.contains(ev.target) && emitClose("close")
        }
        return (_ctx, _cache) => (openBlock(), createElementBlock("div", {
            class: "cs-dialog-container",
            onClick: onContainerClick
        }, [createElementVNode("div", {
            ref_key: "dialog",
            ref: dialogRef,
            class: normalizeClass(["cs-dialog", {
                "cs-dialog-big": propsAlias.extra
            }])
        }, [createElementVNode("div", {
            class: normalizeClass(propsAlias.extra ? "cs-dialog-sidebar" : "")
        }, [createElementVNode("div", dialogHeaderProps, [renderSlot(_ctx.$slots, "header"), createElementVNode("div", {
            class: "cs-close-container",
            onClick: _cache[0] || (_cache[0] = ev => emitClose("close"))
        }, [createVNode(unref(FontAwesomeIcon), {
            icon: unref(toolbarIconMap).xmark,
            class: "cs-icon"
        }, null, 8, ["icon"])])]), renderSlot(_ctx.$slots, "default")], 2), propsAlias.extra ? (openBlock(), createElementBlock("div", dialogViewProps, [renderSlot(_ctx.$slots, "view")])) : createCommentVNode("", true)], 2)]))
    }
});
const dialogItemProps_tc = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_tc = {
        class: "cs-dialog-item-label"
    },
    optionValueAttrs = ["value"],
    dialogItemProps_code = {
        class: "cs-dialog-item"
    },
    dialogItemLabelTallProps = {
        class: "cs-dialog-item-label",
        style: {
            "min-height": "50vh"
        }
    },
    dialogSubmitAreaProps_tc = {
        class: "cs-dialog-submit-area"
    },
    ToolCode = defineComponent({
        __name: "ToolCode",
        props: {
            confirm: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const propsAlias = props;

            function closeDialog() {
                render(null, propsAlias.container)
            }
            const langRef = ref(""),
                codeRef = ref(""),
                languageOptions = [{
                    value: "cpp",
                    name: "C++"
                }, {
                    value: "python",
                    name: "Python"
                }, {
                    value: "c",
                    name: "C"
                }, {
                    value: "java",
                    name: "Java"
                }, {
                    value: "javascript",
                    name: "Javascript"
                }, {
                    value: "markdown",
                    name: "Markdown"
                }, {
                    value: "latex",
                    name: "LaTeX"
                }];
            return (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("code-insert")), 1)])),
                default: withCtx((() => [createElementVNode("div", null, [createElementVNode("div", dialogItemProps_tc, [createElementVNode("div", dialogItemLabelProps_tc, toDisplayString(unref(translateToolbarText)("code-select")), 1), withDirectives(createElementVNode("select", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = val => langRef.value = val),
                    class: "cs-dialog-item-content"
                }, [(openBlock(), createElementBlock(Fragment, null, renderList(languageOptions, (opt => createElementVNode("option", {
                    key: opt.value,
                    value: opt.value
                }, toDisplayString(opt.name), 9, optionValueAttrs))), 64))], 512), [
                    [vModelSelect, langRef.value]
                ])]), createElementVNode("div", dialogItemProps_code, [createElementVNode("div", dialogItemLabelTallProps, toDisplayString(unref(translateToolbarText)("code")), 1), withDirectives(createElementVNode("textarea", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = val => codeRef.value = val),
                    class: "cs-dialog-item-content"
                }, null, 512), [
                    [vModelText, codeRef.value]
                ])]), createElementVNode("div", dialogSubmitAreaProps_tc, [createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: _cache[2] || (_cache[2] = () => {
                        propsAlias.confirm(langRef.value, codeRef.value), closeDialog()
                    })
                }, toDisplayString(unref(translateToolbarText)("confirm")), 1), createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: closeDialog
                }, toDisplayString(unref(translateToolbarText)("cancel")), 1)])])])),
                _: 1
            }))
        }
    }),
    dialogItemProps_ti = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_ti = {
        class: "cs-dialog-item-label"
    },
    dialogItemProps_alt = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_alt = {
        class: "cs-dialog-item-label"
    },
    dialogItemUploadProps = {
        key: 0,
        class: "cs-dialog-item"
    },
    fileInputDisabledAttrs = ["disabled"],
    dialogSubmitAreaProps_ti = {
        class: "cs-dialog-submit-area"
    },
    confirmDisabledAttrs = ["disabled"],
    ToolImage = defineComponent({
        __name: "ToolImage",
        props: {
            confirm: {
                type: Function
            },
            upload: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const propsAlias = props;
            let uploadedOnce = false;

            function closeDialog() {
                uploadedOnce = true, render(null, propsAlias.container)
            }
            const urlRef = ref(""),
                altRef = ref(""),
                inputImageRef = ref(null),
                draggingRef = ref(false),
                uploadingRef = ref(false);

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
            async function uploadFiles(files) {
                if (propsAlias.upload && !uploadingRef.value && files.length) {
                    uploadingRef.value = true;
                    try {
                        const uploaded = await propsAlias.upload(files);
                        null != uploaded && uploaded.length && !uploadedOnce && (altRef.value = uploaded[0].alt, urlRef.value = uploaded[0].url)
                    } catch (err) {
                        console.error("Image upload failed", err)
                    } finally {
                        uploadingRef.value = false
                    }
                }
            }
            async function onDrop(ev) {
                draggingRef.value = false, propsAlias.upload && ev.dataTransfer && (ev.preventDefault(), await uploadFiles(ev.dataTransfer.files))
            }

            function openFilePicker() {
                var inp;
                uploadingRef.value || null == (inp = inputImageRef.value) || inp.click()
            }
            async function onFileChange() {
                const inp = inputImageRef.value;
                if (null != inp && inp.files) try {
                    await uploadFiles(inp.files)
                } finally {
                    inp.value = ""
                }
            }
            return (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("image-insert")), 1)])),
                default: withCtx((() => [createElementVNode("div", null, [createElementVNode("div", dialogItemProps_ti, [createElementVNode("div", dialogItemLabelProps_ti, toDisplayString(unref(translateToolbarText)("image-url")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = val => urlRef.value = val),
                    type: "text",
                    class: "cs-dialog-item-content"
                }, null, 512), [
                    [vModelText, urlRef.value]
                ])]), createElementVNode("div", dialogItemProps_alt, [createElementVNode("div", dialogItemLabelProps_alt, toDisplayString(unref(translateToolbarText)("image-alt")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = val => altRef.value = val),
                    type: "text",
                    class: "cs-dialog-item-content"
                }, null, 512), [
                    [vModelText, altRef.value]
                ])]), propsAlias.upload ? (openBlock(), createElementBlock("div", dialogItemUploadProps, [createElementVNode("div", {
                    class: "cs-dialog-upload",
                    onClick: openFilePicker,
                    onDragenter: onDragEnter,
                    onDragleave: onDragLeave,
                    onDragover: onDragOver,
                    onDrop: onDrop
                }, toDisplayString(unref(translateToolbarText)(uploadingRef.value ? "image-uploading" : "image-upload")), 33), createElementVNode("input", {
                    ref_key: "inputImage",
                    ref: inputImageRef,
                    type: "file",
                    accept: "image/*",
                    disabled: uploadingRef.value,
                    style: {
                        display: "none"
                    },
                    onChange: onFileChange
                }, null, 40, fileInputDisabledAttrs)])) : createCommentVNode("", true), createElementVNode("div", dialogSubmitAreaProps_ti, [createElementVNode("button", {
                    disabled: uploadingRef.value,
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: _cache[2] || (_cache[2] = () => {
                        propsAlias.confirm(urlRef.value, altRef.value), closeDialog()
                    })
                }, toDisplayString(unref(translateToolbarText)("confirm")), 9, confirmDisabledAttrs), createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: closeDialog
                }, toDisplayString(unref(translateToolbarText)("cancel")), 1)])])])),
                _: 1
            }))
        }
    }),
    dialogTimelineProps = {
        class: "cs-dialog-timeline"
    },
    timelineItemEvents = ["onClick"],
    dialogTimelineTimeProps = {
        class: "cs-dialog-timeline-item-time"
    },
    dialogTimelineSourceProps = {
        key: 0,
        class: "cs-dialog-timeline-item-source"
    },
    dialogSubmitAreaProps_as = {
        class: "cs-dialog-submit-area"
    },
    noRecordMarker = {
        key: 0
    },
    AutoSaveDialog = defineComponent({
        __name: "AutoSave",
        props: {
            confirm: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const selectedRef = ref(null),
                propsAlias = props,
                saveRecords = readAutoSaveList();

            function closeDialog() {
                render(null, propsAlias.container)
            }
            return (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                extra: "",
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("auto-save")), 1)])),
                view: withCtx((() => [selectedRef.value ? (openBlock(), createElementBlock(Fragment, {
                    key: 0
                }, [createElementVNode("h3", null, toDisplayString(unref(translateToolbarText)("auto-save-time")) + " " + toDisplayString(new Date(selectedRef.value.time).toLocaleString()), 1), selectedRef.value.source ? (openBlock(), createElementBlock("h3", noRecordMarker, toDisplayString(unref(translateToolbarText)("auto-save-source")) + " " + toDisplayString(selectedRef.value.source), 1)) : createCommentVNode("", true), createElementVNode("code", null, [createElementVNode("pre", null, toDisplayString(selectedRef.value.content), 1)])], 64)) : (openBlock(), createElementBlock(Fragment, {
                    key: 1
                }, [createTextVNode(" 未选择任何记录 ")], 64))])),
                default: withCtx((() => [createElementVNode("div", null, [createElementVNode("div", dialogTimelineProps, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(saveRecords), (rec => (openBlock(), createElementBlock("div", {
                    key: rec.time,
                    class: "cs-dialog-timeline-item",
                    onClick: ev => selectedRef.value = rec
                }, [createElementVNode("span", dialogTimelineTimeProps, toDisplayString(new Date(rec.time).toLocaleString()), 1), rec.source ? (openBlock(), createElementBlock("span", dialogTimelineSourceProps, toDisplayString(rec.source), 1)) : createCommentVNode("", true)], 8, timelineItemEvents)))), 128))]), createElementVNode("div", dialogSubmitAreaProps_as, [createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-selected",
                    onClick: _cache[0] || (_cache[0] = () => {
                        selectedRef.value && propsAlias.confirm(selectedRef.value.content), closeDialog()
                    })
                }, toDisplayString(unref(translateToolbarText)("auto-save-load")), 1), createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: closeDialog
                }, toDisplayString(unref(translateToolbarText)("cancel")), 1)])])])),
                _: 1
            }))
        }
    }),
    dialogItemProps_tt = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_rows = {
        class: "cs-dialog-item-label"
    },
    dialogItemProps_cols = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_cols = {
        class: "cs-dialog-item-label"
    },
    dialogAreaProps = {
        class: "cs-dialog-area"
    },
    editTipsMarker = {
        key: 0
    },
    dialogSubmitAreaProps_tt = {
        class: "cs-dialog-submit-area"
    },
    tableEditorProps = {
        class: "cs-dialog-table-editor"
    },
    tableCellAttrs = ["data-x", "data-y"],
    ToolTable = defineComponent({
        __name: "ToolTable",
        props: {
            confirm: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const propsAlias = props;

            function closeDialog() {
                render(null, propsAlias.container)
            }
            const rowsRef = ref(1),
                colsRef = ref(1),
                anchorCellRef = ref([NaN, NaN]),
                hoverCellRef = ref([NaN, NaN]),
                cellValueRef = ref(""),
                draggingRef = ref(false),
                gridRef = ref([
                    [""]
                ]);

            function normalizeGrid() {
                for (rowsRef.value = Math.max(1, rowsRef.value), colsRef.value = Math.max(1, colsRef.value), rowsRef.value = Math.min(100, rowsRef.value), colsRef.value = Math.min(100, colsRef.value); gridRef.value.length < rowsRef.value;) gridRef.value.push([]);
                for (; gridRef.value.length > rowsRef.value;) gridRef.value.pop();
                for (let row of gridRef.value) {
                    for (; row.length < colsRef.value;) row.push("");
                    for (; row.length > colsRef.value;) row.pop()
                }
            }
            // 该格（含拖拽矩形的两个端点归一化后）是否在当前选区内
            function isCellSelected(x, y) {
                let [x1, y1] = anchorCellRef.value, [x2, y2] = hoverCellRef.value;
                return x1 > x2 && ([x1, x2] = [x2, x1]), y1 > y2 && ([y1, y2] = [y2, y1]), x1 <= x && x <= x2 && y1 <= y && y <= y2
            }

            function onCellMouseDown(ev) {
                if (ev.target) {
                    draggingRef.value = false;
                    const x = Number.parseInt(ev.target.dataset.x || "-1"),
                        y = Number.parseInt(ev.target.dataset.y || "-1");
                    anchorCellRef.value = hoverCellRef.value = [x, y], cellValueRef.value = gridRef.value[x][y]
                }
            }

            function onCellMouseEnter(ev) {
                if (!draggingRef.value && !Number.isNaN(anchorCellRef.value[0]) && ev.target) {
                    const x = Number.parseInt(ev.target.dataset.x || "-1"),
                        y = Number.parseInt(ev.target.dataset.y || "-1");
                    hoverCellRef.value = [x, y], cellValueRef.value = gridRef.value[x][y]
                }
            }

            function onCellMouseUp() {
                draggingRef.value = true
            }
            const selectionLabel = (a, b) => Number.isNaN(a[0]) ? "" : a[0] === b[0] && a[1] === b[1] ? `: (${a[0]}, ${a[1]})` : `: (${a[0]}, ${a[1]}) - (${b[0]}, ${b[1]})`;
            return watch(rowsRef, normalizeGrid), watch(colsRef, normalizeGrid), watch(cellValueRef, (() => {
                if (!draggingRef.value) return;
                let [x1, y1] = anchorCellRef.value, [x2, y2] = hoverCellRef.value;
                if (0 <= x1 && x1 < rowsRef.value && 0 <= x2 && x2 < rowsRef.value && 0 <= y1 && y1 < colsRef.value && 0 <= y2 && y2 < colsRef.value) {
                    x1 > x2 && ([x1, x2] = [x2, x1]), y1 > y2 && ([y1, y2] = [y2, y1]);
                    for (let row = x1; row <= x2; row++)
                        for (let col = y1; col <= y2; col++) gridRef.value[row][col] = cellValueRef.value
                }
            })), (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                extra: "",
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("table-insert")), 1)])),
                view: withCtx((() => [createElementVNode("table", tableEditorProps, [createElementVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(Object.entries(gridRef.value), (([rowKey, rowCells]) => (openBlock(), createElementBlock("tr", {
                    key: rowKey
                }, [(openBlock(true), createElementBlock(Fragment, null, renderList(Object.entries(rowCells), (([colKey, cellText]) => (openBlock(), createElementBlock("td", {
                    key: colKey,
                    "data-x": rowKey,
                    "data-y": colKey,
                    class: normalizeClass({
                        selected: isCellSelected(Number.parseInt(rowKey), Number.parseInt(colKey))
                    }),
                    onMousedown: onCellMouseDown,
                    onMouseenter: onCellMouseEnter,
                    onMouseup: onCellMouseUp
                }, toDisplayString(cellText) + " ", 43, tableCellAttrs)))), 128))])))), 128))])])])),
                default: withCtx((() => [createElementVNode("div", dialogItemProps_tt, [createElementVNode("div", dialogItemLabelProps_rows, toDisplayString(unref(translateToolbarText)("table-rows")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = val => rowsRef.value = val),
                    type: "number",
                    class: "cs-dialog-item-content",
                    min: "1",
                    max: "100"
                }, null, 512), [
                    [vModelText, rowsRef.value]
                ])]), createElementVNode("div", dialogItemProps_cols, [createElementVNode("div", dialogItemLabelProps_cols, toDisplayString(unref(translateToolbarText)("table-cols")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = val => colsRef.value = val),
                    type: "number",
                    class: "cs-dialog-item-content",
                    min: "1",
                    max: "100"
                }, null, 512), [
                    [vModelText, colsRef.value]
                ])]), createElementVNode("div", dialogAreaProps, [createElementVNode("h3", null, toDisplayString(unref(translateToolbarText)("table-edit")) + toDisplayString(selectionLabel(anchorCellRef.value, hoverCellRef.value)), 1), Number.isNaN(anchorCellRef.value[0]) ? (openBlock(), createElementBlock("p", editTipsMarker, toDisplayString(unref(translateToolbarText)("table-edit-tips")), 1)) : withDirectives((openBlock(), createElementBlock("textarea", {
                    key: 1,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = val => cellValueRef.value = val)
                }, null, 512)), [
                    [vModelText, cellValueRef.value]
                ])]), createElementVNode("div", dialogSubmitAreaProps_tt, [createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: _cache[3] || (_cache[3] = () => {
                        props.confirm(rowsRef.value, colsRef.value, gridRef.value), closeDialog()
                    })
                }, toDisplayString(unref(translateToolbarText)("confirm")), 1), createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: closeDialog
                }, toDisplayString(unref(translateToolbarText)("cancel")), 1)])])),
                _: 1
            }))
        }
    }),
    dialogItemProps_tl = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_url = {
        class: "cs-dialog-item-label"
    },
    dialogItemProps_lalt = {
        class: "cs-dialog-item"
    },
    dialogItemLabelProps_lalt = {
        class: "cs-dialog-item-label"
    },
    dialogSubmitAreaProps_tl = {
        class: "cs-dialog-submit-area"
    },
    ToolLink = defineComponent({
        __name: "ToolLink",
        props: {
            confirm: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const propsAlias = props;

            function closeDialog() {
                render(null, propsAlias.container)
            }
            const urlRef = ref(""),
                altRef = ref("");
            return (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("link-insert")), 1)])),
                default: withCtx((() => [createElementVNode("div", null, [createElementVNode("div", dialogItemProps_tl, [createElementVNode("div", dialogItemLabelProps_url, toDisplayString(unref(translateToolbarText)("link-url")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = val => urlRef.value = val),
                    type: "text",
                    class: "cs-dialog-item-content"
                }, null, 512), [
                    [vModelText, urlRef.value]
                ])]), createElementVNode("div", dialogItemProps_lalt, [createElementVNode("div", dialogItemLabelProps_lalt, toDisplayString(unref(translateToolbarText)("link-alt")), 1), withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = val => altRef.value = val),
                    type: "text",
                    class: "cs-dialog-item-content"
                }, null, 512), [
                    [vModelText, altRef.value]
                ])]), createElementVNode("div", dialogSubmitAreaProps_tl, [createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: _cache[2] || (_cache[2] = () => {
                        propsAlias.confirm(urlRef.value, altRef.value), closeDialog()
                    })
                }, toDisplayString(unref(translateToolbarText)("confirm")), 1), createElementVNode("button", {
                    class: "cs-dialog-button cs-dialog-button-info",
                    onClick: closeDialog
                }, toDisplayString(unref(translateToolbarText)("cancel")), 1)])])])),
                _: 1
            }))
        }
    }),
    ToolHelp = defineComponent({
        __name: "ToolHelp",
        props: {
            confirm: {
                type: Function
            },
            container: {}
        },
        setup(props) {
            const propsAlias = props;

            function closeDialog() {
                render(null, propsAlias.container)
            }
            return (_ctx, _cache) => (openBlock(), createBlock(MDialog, {
                onClose: closeDialog
            }, {
                header: withCtx((() => [createTextVNode(toDisplayString(unref(translateToolbarText)("help")), 1)])),
                default: withCtx((() => [_cache[0] || (_cache[0] = createElementVNode("div", null, [createTextVNode(" 帮助手册："), createElementVNode("a", {
                    href: "https://www.luogu.com.cn/article/70w8j2pj"
                }, "https://www.luogu.com.cn/article/70w8j2pj"), createTextVNode("。 ")], -1))])),
                _: 1
            }))
        }
    });

/* ---------------------------------------------------------------- */
/* 自动保存草稿读取：localStorage["casket-auto-save"]，值为 JSON 数组
 * [{time, content, source}, ...]；解析失败直接删键重来。 */
/* ---------------------------------------------------------------- */

function readAutoSaveList() {
    try {
        const list = JSON.parse(localStorage.getItem("casket-auto-save") || "[]");
        if (list instanceof Array) return list
    } catch {
        localStorage.removeItem("casket-auto-save")
    }
    return []
}

export { MDialog, ToolCode, ToolImage, ToolTable, ToolLink, ToolHelp, AutoSaveDialog, readAutoSaveList };
