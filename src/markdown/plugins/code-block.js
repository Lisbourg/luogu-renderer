/* pre>code → <lfe-code>
 * 抽出代码块的 meta 信息（行号标记 lines=1,2、语言 language-xxx、是否显示
 * 行号 line-numbers），转交给 Vue 组件 <lfe-code> 渲染（高亮/行号由它做）。 */
import { visit } from '../../bridge/remark.js';

export function lfecode() {
  return (tree) => {
    visit(tree, 'element', (element, index, parent) => {
      if (element.tagName !== 'pre') return;
      if (element.children.length !== 1) return;
      const codeElement = element.children[0];
      if (codeElement.type !== 'element' || codeElement.tagName !== 'code') return;

      const classNames = (codeElement.properties && codeElement.properties.className) || [];
      const metaTokens = (codeElement.data && codeElement.data.meta && codeElement.data.meta.split(' ')) || [];
      const highlightLines = (metaTokens.find((t) => t.startsWith('lines=')) || '').replace('lines=', '') || undefined;
      const lang = (classNames.find((c) => c.startsWith('language-')) || '').replace('language-', '') || undefined;
      const codeText = codeElement.children[0] && codeElement.children[0].type === 'text' ? codeElement.children[0].value : '';
      const lineNumbers = metaTokens.some((t) => t === 'line-numbers');

      const lfeCodeElement = {
        type: 'element',
        tagName: 'lfe-code',
        position: element.position,
        properties: { highlightLines, lang, code: codeText, lineNumbers },
        children: [],
      };
      if (parent) parent.children[index] = lfeCodeElement;
    });
  };
}
