/* ============================================================================
 * Vue 3 接口映射
 * ----------------------------------------------------------------------------
 * 实现来自 vendor/vue.js（第三方库运行产物）。本文件只做一件事：把库导出的
 * 内部短名映射成全库统一使用的语义名。所有组件文件从这里取 Vue 能力。
 * ========================================================================== */
import vueCore from '../../vendor/vue.js';        /* runtime-core 主模块 */
import { KR, R1, i9, IG } from '../../vendor/vue.js?12416';   /* @vue/reactivity */
import { C4, Tr, v_ } from '../../vendor/vue.js?51784';   /* @vue/shared */
import { XX, Ef, Jo, u1 } from '../../vendor/vue.js?72746';   /* runtime-dom 装配层 */
import { Y, P9 } from '../../vendor/vue.js?45713';        /* jsx 运行时 */

/* 组件定义与渲染 */
export const defineComponent = vueCore.pM;
export const h = vueCore.h;
export const Fragment = vueCore.FK;
export const Teleport = vueCore.Im;

/* 编译器输出所用的渲染辅助（模板编译产物逐个对应） */
export const openBlock = vueCore.uX;
export const createElementBlock = vueCore.CE;
export const createBlock = vueCore.Wv;
export const createVNode = vueCore.bF;
export const createElementVNode = vueCore.Lk;
export const createCommentVNode = vueCore.Q3;
export const createTextVNode = vueCore.eW;
export const renderList = vueCore.pI;
export const renderSlot = vueCore.RG;
export const withCtx = vueCore.k6;
export const withDirectives = vueCore.bo;
export const mergeDefaults = vueCore.zz;
export const mergeProps = vueCore.v6;
export const useAttrs = vueCore.OA;
export const useModel = vueCore.fn;
export const computed = vueCore.EW;
export const watch = vueCore.wB;
export const nextTick = vueCore.dY;
export const onMounted = vueCore.sV;
export const onUnmounted = vueCore.xo;

/* 响应式与工具 */
export const ref = KR;
export const unref = R1;
export const isRef = i9;
export const markRaw = IG;
export const normalizeClass = C4;
export const normalizeStyle = Tr;
export const toDisplayString = v_;

/* jsx 运行时（hast → Vue VNode 用） */
export const jsx = Y;
export const jsxDEV = P9;

/* 渲染器入口与内建指令 */
export const render = XX;
export const createApp = Ef;
export const vModelText = Jo;
export const vModelSelect = u1;
