/* 禁用 markdown 里的原生 HTML 语法
 * 洛谷不允许 markdown 源里写 <script> 等原生 HTML —— 关掉 micromark 的
 * htmlText / htmlFlow 两个语法开关（配合 sanitize 白名单做双保险）。 */
export function disableRawHtml() {
  const data = this.data();
  (data.micromarkExtensions || (data.micromarkExtensions = [])).push({
    disable: { null: ['htmlText', 'htmlFlow'] },
  });
}
