/* 数学公式（remark-math）
 * 注册 $$…$$ 块级与 $…$ 行内公式的 micromark 语法与 mdast 双侧扩展。 */
import { mathSyntax, remarkMath } from '../../bridge/remark.js';

export function math(options) {
  const opts = options || {};
  const data = this.data();
  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
  micromarkExtensions.push(mathSyntax(opts));
  fromMarkdownExtensions.push(remarkMath.fromMarkdown());
  toMarkdownExtensions.push(remarkMath.toMarkdown(opts));
}
