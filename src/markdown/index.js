/* ============================================================================
 * Markdown 渲染管线
 * ----------------------------------------------------------------------------
 * unified 生态：remark-parse → remark 插件 → remark-rehype → rehype 插件
 * → hast-util-to-jsx-runtime（产出 Vue VNode）。
 *
 * 公开能力：
 *   getRemarkPlugins() / getRehypePlugins()   两段插件清单（可被上层复用）
 *   markdownToVNode(components, markdown)      → Promise<VNode 树>
 *   markdownToHtmlString(markdown)             → Promise<HTML 字符串>
 *   markdownToPlainText(markdown)              → 纯文本摘要
 * ========================================================================== */
import {
  unified, remarkParse, remarkGfm, remarkRehype, remarkDirective,
  remarkMath, rehypeKatex, rehypeSanitize, rehypeStringify, hastToJsxRuntime,
} from '../bridge/remark.js';
import { Fragment, jsx, jsxDEV } from '../bridge/vue.js';
import { nestingGuard } from './plugins/nesting-guard.js';
import { disableRawHtml } from './plugins/disable-raw-html.js';
import { math } from './plugins/math.js';
import { userMention } from './plugins/user-mention.js';
import { luoguDirectives } from './plugins/directives.js';
import { lfecode } from './plugins/code-block.js';
import { bilibiliSrcFix, videoEmbed, luoguUserLinks } from './plugins/video-embed.js';
import { cuteTableMerge } from './plugins/cute-table-merge.js';
import { sanitizeSchema } from './sanitize-schema.js';

/* remark 侧插件清单（顺序即应用顺序，勿随意调整） */
export function getRemarkPlugins() {
  return [
    disableRawHtml,
    math,
    remarkGfm,
    userMention,
    remarkDirective,
    nestingGuard,
    luoguDirectives,
  ];
}

/* rehype 侧插件清单（[插件, 选项] 形态表示带选项） */
export function getRehypePlugins() {
  return [
    bilibiliSrcFix,
    [rehypeSanitize, sanitizeSchema],
    [rehypeKatex, { macros: {}, output: 'html' }],
    videoEmbed,
    luoguUserLinks,
    cuteTableMerge,
    lfecode,
  ];
}

/* 组装完整处理器 */
function buildProcessor() {
  return unified()
    .use(remarkParse)
    .use(getRemarkPlugins())
    .use(remarkRehype, {})
    .use(getRehypePlugins());
}

/* 主入口：markdown → Vue VNode 树。
 * components 允许调用方注入自定义组件（如 { "lfe-code": LCodeBlock }）。 */
export async function markdownToVNode(components, markdown) {
  return buildProcessor()
    .use(hastToJsxRuntime, {
      Fragment,
      jsx,
      jsxs: jsx,
      jsxDEV,
      elementAttributeNameCase: 'html',
      components,
    })
    .process(markdown);
}

/* markdown → HTML 字符串（rehype-stringify） */
export async function markdownToHtmlString(markdown) {
  return buildProcessor()
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
    .then((result) => String(result));
}

/* ---------------------------------------------------------------- */
/* 纯文本摘要（搜索/预览/SEO 用）：递归剥掉所有包装结构，只留文字；
 * 空白折叠为单空格，多余换行压成一行。 */
/* ---------------------------------------------------------------- */

function collectPlainText(node, out) {
  switch (node.type) {
    case 'text':
    case 'inlineCode':
    case 'code':
      out.push(node.value);
      return;
    case 'image':
      if (node.alt) out.push(node.alt);
      return;
    case 'break':
    case 'thematicBreak':
      out.push('\n');
      return;
    case 'paragraph':
    case 'heading':
    case 'listItem':
    case 'tableCell':
    case 'tableRow':
    case 'blockquote':
      for (const child of node.children) collectPlainText(child, out);
      out.push('\n');
      return;
    case 'list':
      for (const child of node.children) collectPlainText(child, out);
      return;
    default:
      if ('children' in node && Array.isArray(node.children)) {
        for (const child of node.children) collectPlainText(child, out);
      }
  }
}

let plainTextParserCache = null;

export function markdownToPlainText(markdown) {
  if (!markdown) return '';
  let tree;
  try {
    /* 复用解析器实例：remark-parse + remark-gfm 就够了 */
    if (!plainTextParserCache) {
      plainTextParserCache = unified().use(remarkParse).use(remarkGfm);
    }
    tree = plainTextParserCache.parse(markdown);
  } catch (parseError) {
    return markdown.trim();
  }
  const out = [];
  collectPlainText(tree, out);
  return out.join('').replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim();
}
