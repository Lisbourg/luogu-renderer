/* markdown 预览区：unified 管线（remark → rehype → jsx shim → Vue VNode）
 * 按插件配置预构建并冻结，modelValue 变化时节流渲染；渲染完成后通过
 * update 事件把结果树与预览 DOM 抛给上层（滚动同步用）。 */
import {
  defineComponent, ref, h, watch, nextTick, mergeDefaults, useModel,
  createBlock, openBlock, Fragment,
} from '../bridge/vue.js';
import { unified, remarkParse, remarkRehype, hastToJsxRuntime } from '../bridge/remark.js';
import { throttle } from '../bridge/lodash.js';
import { casketDefaultPluginsFactory } from './plugins.js';

/* JSX 兼容 shim：h(type, props, children)，children 取 props.children，
   key 从第三参取 —— 供 hast-util-to-jsx-runtime 走 Vue 渲染。 */
function jsxShim(type, props, key) {
    const {
        children: children
    } = props;
    return delete props.children, arguments.length > 2 && (props.key = key), h(type, props, children)
}
const MViewer = defineComponent({
        __name: "MViewer",
        props: mergeDefaults({
            plugins: {
                default: casketDefaultPluginsFactory
            },
            interval: {
                default: 0
            }
        }, {
            modelValue: {
                required: true
            },
            modelModifiers: {}
        }),
        emits: mergeDefaults(["update"], ["update:modelValue"]),
        setup(props, {
            emit: emitFn
        }) {
            const vnodeRef = ref(),
                renderViewer = () => h("div", {
                    class: "lfe-marked"
                }, vnodeRef.value ? [vnodeRef.value] : []),
                propsAlias = props,
                modelValueRef = useModel(props, "modelValue"),
                realElRef = ref(null),
                lastEmitElRef = ref(null),
                emitUpdate = emitFn,
                // 收集 VNode 的 unified 插件：process 的 result 存进 lastEmitElRef
                collectVNodePlugin = function () {
                    return tree => {
                        lastEmitElRef.value = tree
                    }
                },
                // 预构建并冻结渲染管线（remark-parse → remark → remark-rehype → rehype → jsx）
                frozenProcessor = function () {
                    const proc = unified();
                    return proc.use(remarkParse), propsAlias.plugins.remark && proc.use(propsAlias.plugins.remark), proc.use(remarkRehype, propsAlias.plugins.remarkRehypeOptions ?? {}), propsAlias.plugins.rehype && proc.use(propsAlias.plugins.rehype), proc.use(collectVNodePlugin), proc.use(hastToJsxRuntime, {
                        Fragment: Fragment,
                        jsx: jsxShim,
                        jsxs: jsxShim,
                        jsxDEV: jsxShim,
                        elementAttributeNameCase: "html",
                        components: propsAlias.plugins.components
                    }), proc.freeze(), proc
                }(),
                throttledRender = throttle((() => {
                    try {
                        vnodeRef.value = frozenProcessor.processSync(modelValueRef.value).result, nextTick().then((() => {
                            emitUpdate("update", lastEmitElRef.value, realElRef.value)
                        }))
                    } catch (err) {
                        console.log("[@lfe/casket-star]", "An error occurred during MViewer rendering: ", err)
                    }
                }), propsAlias.interval);
            return watch(modelValueRef, (() => {
                throttledRender()
            }), {
                immediate: true
            }), (_ctx, _cache) => (openBlock(), createBlock(renderViewer, {
                ref_key: "real",
                ref: realElRef,
                class: "lfe-marked"
            }, null, 512))
        }
    });

export { MViewer };
