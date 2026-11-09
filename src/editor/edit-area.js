/* CodeMirror 6 编辑区：快捷键（Mod-s 保存 + 各按钮的 keymap）、
 * 行包裹与主题微调，编辑器扩展由 plugins.codemirror 提供。 */
import {
  defineComponent, computed, useModel, unref, mergeDefaults, createBlock, openBlock,
} from '../bridge/vue.js';
import { EditorView, keymap, Prec, CodemirrorComponent } from '../bridge/codemirror.js';
import { casketDefaultPluginsFactory } from './plugins.js';

const MEditor = defineComponent({
        __name: "MEditor",
        props: mergeDefaults({
            plugins: {
                default: casketDefaultPluginsFactory
            },
            disabled: {
                type: Boolean
            },
            getCodemirror: {},
            getCasketstar: {},
            dialog: {},
            saveNow: {}
        }, {
            modelValue: {
                required: true
            },
            modelModifiers: {}
        }),
        emits: ["update:modelValue"],
        setup(props) {
            // 关闭 CodeMirror 的 EditContext 引擎（与洛谷线上一致）
            EditorView.EDIT_CONTEXT = false;
            const propsAlias = props,
                modelValueRef = useModel(props, "modelValue");

            // 快捷键表：Mod-s = 保存；每个带 keymap 的工具栏按钮注册其快捷键
            function buildKeymaps() {
                const keymaps = [{
                    key: "Mod-s",
                    run: () => propsAlias.saveNow()
                }];
                for (let group of propsAlias.plugins.toolbarL || [])
                    for (let btn of group) btn.keymap && keymaps.push({
                        key: btn.keymap,
                        run: () => {
                            const cm = propsAlias.getCodemirror(),
                                star = propsAlias.getCasketstar();
                            return cm && star && btn.func(cm, star, propsAlias.dialog), true
                        }
                    });
                for (let group of propsAlias.plugins.toolbarR || [])
                    for (let btn of group) btn.keymap && keymaps.push({
                        key: btn.keymap,
                        run: () => {
                            const cm = propsAlias.getCodemirror(),
                                star = propsAlias.getCasketstar();
                            return cm && star && btn.func(cm, star, propsAlias.dialog), true
                        }
                    });
                return keymaps
            }
            const extensionsComputed = computed((() => [EditorView.lineWrapping, EditorView.theme({
                "&.cm-focused": {
                    outline: "none"
                },
                "&.cm-editor": {
                    height: "100%"
                },
                ".cm-scroller": {
                    "z-index": "2",
                    "overflow-anchor": "none"
                },
                ".cm-panels": {
                    "z-index": "300"
                }
            }), Prec.highest(keymap.of(buildKeymaps())), ...propsAlias.plugins.codemirror || []]));
            return (_ctx, _cache) => (openBlock(), createBlock(unref(CodemirrorComponent), {
                modelValue: modelValueRef.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = val => modelValueRef.value = val),
                extensions: extensionsComputed.value,
                disabled: propsAlias.disabled
            }, null, 8, ["modelValue", "extensions", "disabled"]))
        }
    });

export { MEditor };
