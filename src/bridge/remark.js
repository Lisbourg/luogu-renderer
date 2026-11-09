/* ============================================================================
 * unified / remark 生态接口映射
 * ----------------------------------------------------------------------------
 * 实现来自 vendor/remark.js 与 vendor/katex.js（第三方库运行产物）。
 * Markdown 处理链：remark-parse → 各 remark 插件 → remark-rehype →
 * 各 rehype 插件 → hast-util-to-jsx-runtime（转 Vue VNode）。
 * ========================================================================== */
import { l as unifiedFn } from '../../vendor/remark.js?21699';           /* unified 管线入口 */
import { A as remarkParseFn } from '../../vendor/remark.js?44566';       /* remark-parse */
import { A as remarkGfmFn } from '../../vendor/remark.js?5548';          /* remark-gfm */
import { A as remarkRehypeFn } from '../../vendor/remark.js?26338';      /* remark-rehype */
import { A as remarkDirectiveFn } from '../../vendor/remark.js?26443';   /* remark-directive */
import { YR as visitFn } from '../../vendor/remark.js?74269';            /* unist-util-visit */
import { _Z as SKIP_VALUE } from '../../vendor/remark.js?85642';         /* unist-util-visit-parents */
import { c as mathFromMarkdown, B as mathToMarkdown } from '../../vendor/remark.js?16010';   /* mdast-util-math */
import { D as mathSyntaxExtension } from '../../vendor/remark.js?70130'; /* micromark-extension-math */
import { h as buildHastElement } from '../../vendor/remark.js?2309';     /* hast 元素构造 */
import { A as rehypeKatexFn } from '../../vendor/katex.js?25359';        /* rehype-katex（内含 KaTeX） */
import { j as sanitizeSchemaBase } from '../../vendor/remark.js?82431';  /* hast-util-sanitize 默认 schema */
import { A as rehypeSanitizeFn } from '../../vendor/remark.js?98747';    /* rehype-sanitize */
import { A as rehypeStringifyFn } from '../../vendor/remark.js?26026';   /* rehype-stringify */
import parseUrlLib from '../../vendor/remark.js?61071';                  /* parse-url（视频协议解析） */
import { A as hastToJsxRuntimeFn } from '../../vendor/remark.js?9887';   /* hast → jsx runtime */

export const unified = unifiedFn;
export const remarkParse = remarkParseFn;
export const remarkGfm = remarkGfmFn;
export const remarkRehype = remarkRehypeFn;
export const remarkDirective = remarkDirectiveFn;
export const visit = visitFn;
export const SKIP = SKIP_VALUE;
export const remarkMath = { fromMarkdown: mathFromMarkdown, toMarkdown: mathToMarkdown };
export const mathSyntax = mathSyntaxExtension;
export const buildElement = buildHastElement;
export const rehypeKatex = rehypeKatexFn;
export const defaultSanitizeSchema = sanitizeSchemaBase;
export const rehypeSanitize = rehypeSanitizeFn;
export const rehypeStringify = rehypeStringifyFn;
export const parseUrl = parseUrlLib;
export const hastToJsxRuntime = hastToJsxRuntimeFn;