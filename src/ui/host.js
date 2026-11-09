/* ============================================================================
 * 宿主能力接口
 * ----------------------------------------------------------------------------
 * 代码块组件的「复制」动作需要两个宿主能力：写剪贴板与弹出提示。
 * 嵌入方（如洛谷站内）可通过替换本模块的函数接入自己的通知/剪贴板实现；
 * 默认实现面向普通浏览器环境。
 * ========================================================================== */

export const host = {
  /** 把文本写入剪贴板，resolve 表示成功 */
  copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error('clipboard unavailable'));
  },
  /** 操作成功提示 */
  notifySuccess(message) {
    console.log(`[luogu-renderer] ${message}`);
  },
  /** 操作失败提示 */
  notifyError(message) {
    console.warn(`[luogu-renderer] ${message}`);
  },
};
