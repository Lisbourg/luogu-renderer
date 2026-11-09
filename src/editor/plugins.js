/* 编辑器默认插件包：remark / rehype / codemirror 三侧的默认扩展，
 * 以及工具栏布局（左四组右两组）。 */
import { remarkGfm } from '../bridge/remark.js';
import { buildMarkdownConfig, markdownBaseLanguage } from '../bridge/codemirror.js';
import { disableRawHtml } from '../markdown/plugins/disable-raw-html.js';
import {
  toolbarGroupLevel, toolbarGroupStyle, toolbarGroupInsert,
  toolbarGroupBlock, toolbarGroupMode, toolbarGroupMisc,
} from './toolbar-buttons.js';

function casketDefaultPluginsFactory() {
    return {
        remark: [remarkGfm, disableRawHtml],
        rehype: [],
        remarkRehypeOptions: {},
        codemirror: [buildMarkdownConfig({
            base: markdownBaseLanguage,
            extensions: [{
                remove: ["HTMLBlock", "HTMLTag"]
            }],
            completeHTMLTags: false
        })],
        toolbarL: [toolbarGroupLevel, toolbarGroupStyle, toolbarGroupInsert, toolbarGroupBlock],
        toolbarR: [toolbarGroupMode, toolbarGroupMisc]
    }
};

export { casketDefaultPluginsFactory };
