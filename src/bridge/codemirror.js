/* ============================================================================
 * CodeMirror 6 接口映射
 * ----------------------------------------------------------------------------
 * 实现来自 vendor/codemirror.js（第三方库运行产物）。
 * ========================================================================== */
import { Lz, w4 } from '../../vendor/codemirror.js?53959';       /* @codemirror/view */
import { Nb, OF } from '../../vendor/codemirror.js?14830';       /* @codemirror/state */
import { bE } from '../../vendor/codemirror.js?35510';           /* CodeMirror 的 Vue 包装组件 */
import { wD, Sz } from '../../vendor/codemirror.js?96991';       /* @lezer/markdown + lang-markdown 装配 */

export const EditorView = Lz;
export const keymap = w4;
export const Prec = Nb;
export const EditorSelection = OF;
export const CodemirrorComponent = bE;
/* markdown 编辑语言：baseLanguage 为基础解析器；buildMarkdownConfig 组装
 * 编辑器扩展（代码语言嵌入、HTML 补全开关等，选项见 lang-markdown 文档） */
export const markdownBaseLanguage = Sz;
export const buildMarkdownConfig = wD;
