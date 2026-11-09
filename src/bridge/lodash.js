/* ============================================================================
 * lodash 接口映射
 * ----------------------------------------------------------------------------
 * 实现来自 vendor/misc.js（第三方库运行产物）。
 * ========================================================================== */
import { A as throttleFn } from '../../vendor/misc.js?65603';        /* lodash.throttle */
import { A as sortedIndexFn } from '../../vendor/misc.js?34769';     /* lodash.sortedIndex */

export const throttle = throttleFn;
export const sortedIndex = sortedIndexFn;
