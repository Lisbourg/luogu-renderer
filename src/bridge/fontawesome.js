/* ============================================================================
 * Font Awesome 接口映射
 * ----------------------------------------------------------------------------
 * 实现来自 vendor/fontawesome.js（第三方库运行产物）：官方 Vue 绑定组件与
 * 图标数据。
 * ========================================================================== */
import { gc } from '../../vendor/fontawesome.js?90566';    /* FontAwesomeIcon 组件 */
import { e6 } from '../../vendor/fontawesome.js?10687';    /* fas check 图标 */
import { jP } from '../../vendor/fontawesome.js?34638';    /* fas copy 图标 */

export const FontAwesomeIcon = gc;
export const iconCheck = e6;
export const iconCopy = jP;
