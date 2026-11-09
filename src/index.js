/* ============================================================================
 * LuoguRenderer 公开接口
 * ----------------------------------------------------------------------------
 * 渲染：与洛谷站内 .lfe-marked 容器一致的 markdown 渲染能力。
 *   luoguRender(md)              → Promise<HTML 字符串>
 *   luoguRenderInto(el, md)      → Promise（渲染进指定元素）
 *   luoguRenderVNode(md)         → Promise<VNode>
 * 编辑器：完整 casket 编辑器（工具栏 / CodeMirror 编辑区 / 预览 / 自动保存）。
 *   luoguEditor.mount(el, initialText?) 等，见 editor/index.js。
 *
 * 本模块加载后不产生任何 DOM 副作用；只有调用接口才动作。
 * ========================================================================== */
import { h, render } from './bridge/vue.js';
import { markdownToVNode } from './markdown/index.js';
import { LCode } from './ui/code-block.js';
import { createCasketApp } from './editor/index.js';
import { ref } from './bridge/vue.js';

/* 渲染注入的自定义组件（lfe-code：代码块，与站内行为一致） */
const RENDER_COMPONENTS = { 'lfe-code': LCode };

export function luoguRenderVNode(md) {
  return markdownToVNode(RENDER_COMPONENTS, String(md)).then((r) => r.result);
}

export function luoguRenderInto(el, md) {
  return luoguRenderVNode(md).then((vn) => {
    render(vn, el);
  });
}

/* 离屏渲染宿主：渲染到看不见的容器里取 innerHTML，用完即卸载。
 * （与 src/ui/host.js 的"宿主能力接口"无关，只是复用"宿主"一词的 DOM 容器） */
let offscreenHost = null;
function ensureHost() {
  if (offscreenHost) return offscreenHost;
  offscreenHost = document.createElement('div');
  offscreenHost.setAttribute('lang', 'zh-CN');
  offscreenHost.className = 'lfe-body';
  offscreenHost.style.cssText = 'position:fixed;left:-99999px;top:0;width:1000px;visibility:hidden;pointer-events:none;';
  const slot = document.createElement('div');
  offscreenHost.appendChild(slot);
  document.body.appendChild(offscreenHost);
  return offscreenHost;
}

export function luoguRender(md) {
  return luoguRenderVNode(md).then((vn) => {
    const root = ensureHost();
    const slot = root.firstChild;
    render(h('div', { class: 'lfe-marked' }, [vn]), slot);
    /* 等两帧：让 Prism 高亮等挂载后的异步处理完成，再取 innerHTML */
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = slot.firstChild;
          const html = el ? el.innerHTML : '';
          render(null, slot);
          resolve(html);
        });
      });
    });
  });
}

/* ---------------------------------------------------------------- */
/* 编辑器接口：mount/unmount/getText/setText/onChange/isMounted       */
/* ---------------------------------------------------------------- */

let editorState = null;
let editorApp = null;
const changeListeners = [];

export const luoguEditor = {
  /** 挂载编辑器到 el；initialText 为初始 markdown。返回 Vue app 实例。 */
  mount(el, initialText) {
    if (!el) throw new Error('luoguEditor.mount(el[, initialText]): el 不能为空');
    if (editorApp) return editorApp;
    editorState = ref(initialText || '');
    editorApp = createCasketApp({
      getText: () => editorState.value,
      setText: (v) => {
        editorState.value = v;
        for (const fn of changeListeners) fn(v);
      },
    });
    editorApp.mount(el);
    return editorApp;
  },
  unmount() {
    if (editorApp) {
      editorApp.unmount();
      editorApp = null;
      editorState = null;
    }
  },
  getText() { return editorState ? editorState.value : ''; },
  setText(t) { if (editorState) editorState.value = t; },
  onChange(f) { changeListeners.push(f); },
  isMounted() { return !!editorApp; },
};
