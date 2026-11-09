/* 工具栏文案 i18n：两份词表（英文底表 + 简体中文表）+ 翻译函数。
 * 真站由编辑器外层包装按 vue-i18n 的 locale 选表（zh-CN → 中文表）传给
 * CasketStar 的 lang prop；CasketStar 挂载时把 lang 合并进英文底表。
 * translateToolbarText(key) 查当前生效的表，查不到原样返回 key。 */

/* ================================================================== */
export const englishTable = {
        "increase-level": "increase headline",
        "decrease-level": "decrease headline",
        horizontal: "horizontal",
        bold: "bold",
        italic: "italic",
        strikethrough: "strikethrough",
        math: "Equation",
        quote: "quote",
        "unordered-list": "unordered list",
        "ordered-list": "ordered list",
        "task-list": "task list",
        "only-editor": "editor only",
        "only-viewer": "viewer only",
        "full-screen": "fullscreen",
        help: "help",
        "release-to-update": "release to upload",
        character: " character",
        "character-count": "character count: ",
        "sync-disable": "disable sync",
        "sync-enable": "enable sync",
        "back-to-top": "back to top",
        confirm: "confirm",
        cancel: "cancel",
        code: "code",
        "code-insert": "insert code",
        "code-select": "select language",
        link: "link",
        "link-insert": "insert link",
        "link-url": "url",
        "link-alt": "alt",
        image: "image",
        "image-insert": "insert image",
        "image-url": "url",
        "image-alt": "alt",
        "image-upload": "upload image",
        "image-uploading": "Uploading images…",
        table: "table",
        "table-insert": "insert table",
        "table-rows": "rows",
        "table-cols": "cols",
        "table-edit": "edit",
        "table-edit-tips": "Choose the cell to edit the content",
        "auto-save": "auto save",
        "auto-save-time": "saved time",
        "auto-save-load": "load content",
        "auto-save-last": "last saved time",
        "auto-save-source": "saved page"
};

export const chineseTable = {
        "increase-level": "提升一级",
        "decrease-level": "降低一级",
        horizontal: "水平线",
        bold: "粗体",
        italic: "斜体",
        strikethrough: "删除线",
        math: "数学公式",
        quote: "引用",
        "unordered-list": "无序列表",
        "ordered-list": "有序列表",
        "task-list": "任务列表",
        "only-editor": "仅编辑",
        "only-viewer": "仅预览",
        "full-screen": "全屏",
        help: "帮助",
        "release-to-update": "放下图片上传",
        character: " 字符",
        "character-count": "字数统计：",
        "sync-disable": "禁用滚动同步",
        "sync-enable": "启用滚动同步",
        "back-to-top": "回到顶部",
        confirm: "确认",
        cancel: "取消",
        code: "代码",
        "code-insert": "插入代码",
        "code-select": "选择语言",
        link: "链接",
        "link-insert": "插入链接",
        "link-url": "链接地址",
        "link-alt": "链接介绍",
        image: "图片",
        "image-insert": "插入图片",
        "image-url": "图片地址",
        "image-alt": "图片介绍",
        "image-upload": "上传图片",
        "image-uploading": "正在上传图片…",
        table: "表格",
        "table-insert": "插入表格",
        "table-rows": "行数",
        "table-cols": "列数",
        "table-edit": "编辑表格",
        "table-edit-tips": "选择单元格以编辑内容",
        "auto-save": "自动保存",
        "auto-save-time": "保存时间",
        "auto-save-load": "载入",
        "auto-save-last": "上次保存时间",
        "auto-save-source": "保存页面"
    };

let translate = () => '';

/* lang：一张语言表，或多张语言表的数组；每张表都覆盖英文底表 */
export function setLanguageTables(lang) {
  const table = Array.isArray(lang)
    ? Object.assign({}, englishTable, ...lang)
    : Object.assign({}, englishTable, lang);
  translate = (key) => table[key] || key;
}

export function translateToolbarText(key) {
  return translate(key);
}
