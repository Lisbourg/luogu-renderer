/* 洛谷 @用户 链接还原
 * markdown 源 `@123` 会被 GFM 解析成 [text](/user/123) 自动链接；本插件把
 * 「前一个兄弟节点以 @ 结尾且链接指向 /user/数字」的链接还原为纯文本的
 * 用户名（渲染层再挂上用户卡片）。 */
import { visit } from '../../bridge/remark.js';

/* 提取 "[xxx](…)" 中的 xxx：要求开头是 "["，支持 \[ 转义与嵌套 [ ]，
 * 且 "](" 成对出现才算提及；把 \x 转义还原为字面字符。非提及返回 null。 */
function extractBracketContent(text) {
  if (text[0] !== '[') return null;
  let escaped = false;
  let depth = 0;
  for (let i = 1; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
    } else if (ch === '\\') {
      escaped = true;
    } else if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      if (depth <= 0) {
        return text.slice(i + 1).trimStart().startsWith('(')
          ? text.slice(1, i).replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, '$1')
          : null;
      }
      depth--;
    }
  }
  return null;
}

export function userMention() {
  return (tree, file) => {
    const source = String((file && file.value) || '');
    if (!source) return;
    visit(tree, 'link', (linkNode, index, parent) => {
      if (!linkNode.url.includes('/user/')) return;
      if (Number.isNaN(+linkNode.url.split('/').pop())) return; // 结尾不是数字 → 普通链接
      if (!parent || typeof index !== 'number' || index === 0) return;
      const prevNode = parent.children[index - 1];
      if (!prevNode || prevNode.type !== 'text' || !prevNode.value.endsWith('@')) return;
      const start = linkNode.position && linkNode.position.start.offset;
      const end = linkNode.position && linkNode.position.end.offset;
      if (typeof start !== 'number' || typeof end !== 'number') return;
      /* 从原文里抠出 [@...](...) 的方括号内部文本（处理转义与嵌套括号） */
      const uidText = extractBracketContent(source.slice(start, end));
      if (uidText !== null) linkNode.children = [{ type: 'text', value: uidText }];
    });
  };
}
