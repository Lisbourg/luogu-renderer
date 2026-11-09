/* HTML 白名单（洛谷扩展版）
 * 在 hast-util-sanitize 默认 schema 上放开：
 *   - div/span/p/details 的 class（epigraph/cute-table/math/invisible…）
 *   - details 的 open 属性、所有元素的 style
 *   - href 允许 luogu: 协议；src 允许 bilibili:/video:/luogu: 协议 */
import { defaultSanitizeSchema } from '../../bridge/remark.js';

const base = defaultSanitizeSchema;

export const sanitizeSchema = {
  ...base,
  attributes: {
    ...base.attributes,
    div: [
      ...(base.attributes.div || []),
      ['className', 'math', 'math-display', 'epigraph', 'has-source', 'cute-table', 'cute-table-tuack', 'cute-table-three'],
    ],
    span: [
      ...(base.attributes.span || []),
      ['className', 'math', 'math-inline'],
    ],
    p: [
      ...(base.attributes.p || []),
      ['className', 'invisible'],
    ],
    details: [
      ...(base.attributes.details || []),
      ['className', 'info', 'warning', 'success', 'error'],
      'open',
    ],
    '*': [...(base.attributes['*'] || []), 'style'],
  },
  protocols: {
    ...base.protocols,
    href: [...base.protocols.href, 'luogu'],
    src: [...base.protocols.src, 'bilibili', 'video', 'luogu'],
  },
};
