/* ============================================================================
 * 代码块组件 <lfe-code>
 * ----------------------------------------------------------------------------
 * 渲染管线的 rehype 阶段把 pre>code 转成 <lfe-code> 自定义元素（见
 * markdown/plugins/code-block.js），本组件负责真正的展示：
 *   - Prism 高亮（挂载后对 <code> 执行 highlightElement）
 *   - 可选行号（.line-numbers / hide-numbers，与站点 CSS 配套）
 *   - 高亮行提示（data-line 属性，配合站点 CSS 的行高亮）
 *   - 复制按钮（成功时短暂切换为对勾图标）
 * ========================================================================== */
import {
  defineComponent, ref, computed, watch, nextTick,
  createElementBlock, openBlock, createElementVNode, createBlock,
  createCommentVNode, normalizeClass, toDisplayString, unref,
} from '../bridge/vue.js';
import { FontAwesomeIcon, iconCheck, iconCopy } from '../bridge/fontawesome.js';
import { prism } from '../bridge/prism.js';
import '../bridge/prism-languages.js';
import { host } from './host.js';

/* 语言别名 → Prism 语言名（覆盖洛谷常用的评测语言） */
const LANGUAGE_ALIAS = {};
[
  { name: 'C', ext: ['c', 'h'] },
  { name: 'C++', ext: ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'h++', 'hh', 'hxx'] },
  { name: 'Go', ext: ['go'] },
  { name: 'Haskell', ext: ['hs'] },
  { name: 'Java', ext: ['java'] },
  { name: 'JavaScript', ext: ['js'] },
  { name: 'Pascal', ext: ['p', 'pas'] },
  { name: 'PHP', ext: ['php', 'php3', 'php4', 'php5', 'php7', 'phtml'] },
  { name: 'Python', ext: ['BUILD', 'bzl', 'py', 'pyw'] },
  { name: 'Rust', ext: ['rs'] },
].forEach((item) => {
  for (const ext of item.ext) {
    if (prism.languages[ext]) { item.target = ext; break; }
  }
  for (const ext of item.ext) LANGUAGE_ALIAS[ext] = item.target || ext;
});

const codeContainerProps = { class: 'code-container' };
const dataLineKeys = ['data-line'];

export const LCode = defineComponent({
  __name: 'LCode',
  props: {
    code: { default: '' },
    lang: { default: 'cpp' },
    highlightLines: { default: '' },
    lineNumbers: { type: Boolean, default: true },
  },
  setup(props) {
    prism.manual = true; // 高亮时机由本组件控制，不用 Prism 的自动扫描

    const codeRef = ref(null);
    const copiedVisible = ref(false);
    const copiedTimer = ref(null);
    const langName = computed(() => LANGUAGE_ALIAS[props.lang] || props.lang);

    function copyCode() {
      host.copyText(props.code).then(() => {
        if (copiedTimer.value) clearTimeout(copiedTimer.value);
        copiedVisible.value = true;
        copiedTimer.value = setTimeout(() => { copiedVisible.value = false; }, 1000);
        host.notifySuccess('Contents copied!');
      }).catch(() => {
        host.notifyError('Copy failed :(');
      });
    }

    watch(
      () => [props.code, props.lang, props.highlightLines, props.lineNumbers],
      () => {
        nextTick().then(() => {
          if (codeRef.value) prism.highlightElement(codeRef.value);
        });
      },
      { immediate: true },
    );

    return (_ctx, _cache) => (
      openBlock(),
      createElementBlock('div', codeContainerProps, [
        createElementVNode('pre', {
          'data-line': props.highlightLines,
          class: normalizeClass(['pre line-numbers', { 'hide-numbers': !props.lineNumbers }]),
        }, [
          createElementVNode('code', {
            ref_key: 'codeRef',
            ref: codeRef,
            class: normalizeClass(`language-${langName.value}`),
          }, toDisplayString(props.code), 3),
        ], 10, dataLineKeys),
        createElementVNode('button', { type: 'button', class: 'copy-button', onClick: copyCode }, [
          copiedVisible.value
            ? (openBlock(), createBlock(unref(FontAwesomeIcon), { key: 0, class: 'copy-icon', icon: unref(iconCheck) }, null, 8, ['icon']))
            : (openBlock(), createBlock(unref(FontAwesomeIcon), { key: 1, class: 'copy-icon', icon: unref(iconCopy) }, null, 8, ['icon'])),
        ]),
      ])
    );
  },
});

LCode.__scopeId = 'data-v-0d88ab25';
