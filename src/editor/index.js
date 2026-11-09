/* ============================================================================
 * 编辑器出口
 * ----------------------------------------------------------------------------
 * createCasketApp(textBind)：用文本绑定对象（getText/setText）组装一个
 * Vue 应用，根组件渲染 CasketStar。插件包与站内编辑器一致：
 *   - remark/rehype 用完整渲染管线（与 luoguRender 相同的插件清单）；
 *   - CodeMirror 侧为 markdown 语言 + 禁用原生 HTML 补全；
 *   - 预览中的代码块交给 <lfe-code> 组件（含 Prism 高亮）。
 * 挂载方拿到 app 后自行 mount/unmount；上传、@用户补全等站点能力通过
 * plugins/props 二次开发时注入。
 * ========================================================================== */
import { h, defineComponent, createApp, markRaw } from '../bridge/vue.js';
import { CasketStar } from './casket-star.js';
import { casketDefaultPluginsFactory } from './plugins.js';
import { englishTable, chineseTable } from './i18n.js';
import { getRemarkPlugins, getRehypePlugins } from '../markdown/index.js';
import { buildMarkdownConfig, markdownBaseLanguage } from '../bridge/codemirror.js';
import { LCode } from '../ui/code-block.js';

/**
 * 组装 casket 编辑器应用。
 * @param {{ getText: () => string, setText: (v: string) => void }} textBind
 *   编辑器文本的读写入口（由挂载方决定存哪里）。
 * @param {{ locale?: string }} [options]
 *   工具栏/弹窗文案语言：'zh-CN'（默认，与真站中文用户一致）或 'en'。
 */
export function createCasketApp(textBind, options = {}) {
  const locale = options.locale === 'en' ? 'en' : 'zh-CN';
  const plugins = casketDefaultPluginsFactory();
  plugins.remark = getRemarkPlugins();
  plugins.rehype = getRehypePlugins();
  plugins.remarkRehypeOptions = {};
  plugins.codemirror = [buildMarkdownConfig({
    base: markdownBaseLanguage,
    extensions: [{ remove: ['HTMLBlock', 'HTMLTag'] }],
    completeHTMLTags: false,
  })];
  plugins.components = { 'lfe-code': markRaw(LCode) };

  const Root = defineComponent({
    setup() {
      /* 工具栏语言选表：同真站包装层 —— zh-CN 传中文表，其余回退英文底表 */
      return () => h(CasketStar, {
        modelValue: textBind.getText(),
        'onUpdate:modelValue': (v) => textBind.setText(v),
        lang: [locale === 'zh-CN' ? chineseTable : englishTable],
        plugins,
      });
    },
  });
  return createApp(Root);
}

import { CasketStar as _CasketStar } from './casket-star.js';
import { setLanguageTables as _setLanguageTables, translateToolbarText as _translateToolbarText } from './i18n.js';
import { readAutoSaveList as _readAutoSaveList } from './dialogs.js';

export { _CasketStar as CasketStar, _setLanguageTables as setLanguageTables, _translateToolbarText as translateToolbarText, _readAutoSaveList as readAutoSaveList };
