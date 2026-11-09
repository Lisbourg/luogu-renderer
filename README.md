# LuoguRenderer

复现了洛谷（www.luogu.com.cn）的 Markdown 渲染器与编辑器，作为一个可独立嵌入、可二次开发的前端库。

- **渲染器**：完整管线（remark → rehype → Vue VNode），支持 GFM、数学公式（KaTeX）、洛谷容器指令（`:::info` / `:::align` / `:::epigraph` / `:::cute-table`）、B 站视频嵌入、HTML 白名单消毒、代码块组件等。
- **编辑器**：工具栏 + CodeMirror 6 编辑区 + 实时预览 + 双向滚动同步 + 自动保存（localStorage）+ 拖拽/粘贴上传钩子。

加载本库不产生任何 DOM 副作用；所有能力通过接口调用。

## 使用

```html
<link rel="stylesheet" href="luogu-render.css">
<div id="app" class="lfe-body"></div>
<script src="dist/luogu-renderer.js"></script>
<script>
  // 渲染 markdown
  window.luoguRender('# 标题\n\n正文').then((html) => { /* html 字符串 */ });

  // 或挂一个编辑器（是否挂、挂哪、初始内容，由页面决定）
  window.luoguEditor.mount(document.getElementById('app'), '# 初始内容');
</script>
```

## 接口

```js
// 渲染
window.luoguRender(md)             // → Promise<HTML 字符串>（与站内 .lfe-marked 一致）
window.luoguRenderInto(el, md)     // → Promise（渲染进 el）
window.luoguRenderVNode(md)        // → Promise<VNode>

// 编辑器
window.luoguEditor.mount(el, initialText?, options?)  // 挂载编辑器，返回 Vue app
//   options.locale：文案语言，'zh-CN'（默认，同真站中文用户）或 'en'
window.luoguEditor.unmount()                // 卸载（可重新 mount）
window.luoguEditor.getText() / setText(t)   // 读写 markdown 文本
window.luoguEditor.onChange(fn) / isMounted()
```

依赖行为：渲染取 `innerHTML` 前等待两帧，代码块的 Prism 高亮在挂载后异步执行；
运行环境需要浏览器标准 API（`structuredClone`、`requestAnimationFrame`）。
样式与字体配套 `luogu-render.css` 与 KaTeX 字体文件。

## 为什么第三方不走 npm install

一般项目确实应该 `npm install` 依赖。本工程的第三方依赖（`vendor/`）是站点
分发的**运行产物**：webpack 模块工厂形态、模块间以数字键互相 require、以短键
导出，且版本与构建和渲染输出的逐字节一致性绑定（Vue 3.5.35、CodeMirror 6
多包组合、定制构建的 Prism 语言集等）。这些产物在 npm 上没有对应物，也不是
手工编辑的对象——升级时整体替换文件即可。详见 `vendor/README.md`。

## 构建

```bash
npm install     # 开发依赖只有 acorn / astring（源码解析）
npm run build   # 产物：dist/luogu-renderer.js（单文件 IIFE）
```

构建器把 `src/**`（ESM）与 `vendor/**`（第三方库运行产物）按模块依赖打包。
源码书写规约见 `build.js` 头注释：顶层 `import`、常规 `export`、无动态
`import()`、模块间无循环依赖（构建时校验）。

## 目录

```
├── build.js                 构建脚本（打包器 + 运行时）
├── src/
│   ├── index.js             入口：装配上面列出的全部公开接口
│   ├── markdown/            渲染管线
│   │   ├── index.js         管线组装与三个公开渲染函数
│   │   ├── sanitize-schema.js   HTML 白名单
│   │   └── plugins/         渲染插件（指令/公式/提及/视频/代码块/合并表格…）
│   ├── editor/              编辑器组件族
│   │   ├── index.js         组装编辑器应用（插件包与站内一致）
│   │   ├── casket-star.js   总组件：布局/滚动同步/自动保存/上传钩子
│   │   ├── edit-area.js     CodeMirror 编辑区
│   │   ├── viewer.js        预览区（节流渲染）
│   │   ├── toolbar.js       工具栏
│   │   ├── toolbar-buttons.js  20 个按钮的定义与编辑动作
│   │   ├── dialogs.js       插入弹窗（代码/图片/表格/链接/帮助/自动保存）
│   │   ├── i18n.js          工具栏/弹窗文案双词表（中文默认生效）
│   │   ├── toolbar-icons.js 图标表
│   │   └── fontawesome.js   Font Awesome 运行产物（第三方，不手工维护）
│   ├── ui/                  渲染层组件
│   │   ├── code-block.js    <lfe-code> 代码块（Prism 高亮 + 复制）
│   │   └── host.js          宿主能力接口（剪贴板/提示，嵌入方可替换）
│   └── bridge/              第三方库接口映射（vendor 短名 → 语义名）
└── vendor/                  第三方库运行产物（Vue / CodeMirror / remark 生态 /
                             KaTeX / Font Awesome / Prism / lodash…，不手工维护）
```

## 二次开发

- **改渲染行为**：`src/markdown/plugins/` 增删插件，然后在 `src/markdown/index.js`
  的 `getRemarkPlugins()` / `getRehypePlugins()` 登记。
- **改编辑器**：按钮在 `src/editor/toolbar-buttons.js`；默认插件包在
  `src/editor/plugins.js`；宿主定制（上传、@用户补全、通知样式）通过
  `CasketStar` 的 props（`upload` / `plugins` / `lang`）注入，参考
  `src/editor/index.js` 的组装方式。
- **替换宿主能力**：改写 `src/ui/host.js` 里的 `copyText` / `notifySuccess` / `notifyError`。
- **vendor/ 与 `src/editor/fontawesome.js` 是第三方运行产物**：不需要阅读，
  不要手改；升级第三方库时整体替换对应文件即可。
- 组件内的 `__name`、`cs-*` 类名、`data-v-*` scope 标记参与 Vue 渲染与样式
  匹配，改动前先确认影响。
