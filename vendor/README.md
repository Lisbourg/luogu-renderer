# vendor/ — 第三方库运行产物（构建输入）

这里的文件**不是能在 npm 上找到的包**，而是洛谷站点随渲染器/编辑器一起分发的
第三方依赖的**精确运行产物**，形态为 webpack 模块工厂（`(e,t,n)=>{…n(…)…}`，
模块间以数字键互相 require、以短键导出）。构建器（`build.js`）负责装配它们；
`src/bridge/` 把短键映射成语义名供库源码使用。

## 为什么不走 npm install

1. **形态不同**：npm 包是标准 ESM/CJS；这里每个文件是互相咬合的 webpack 工厂，
   内部以数字键互相引用，拆开单装任何一块都无法独立工作。
2. **版本与构建绑定**：渲染输出要做到与站内逐字节一致，依赖的不是"某个库"
   而是"这个库在这套构建里的产物"。例：Vue 3.5.35 的 runtime-core 短键导出
   （`pM`=defineComponent、`KR`=ref…）；CodeMirror 6 是十几个
   `@codemirror/*`+`@lezer/*` 包的组合产物；Prism 是定制构建（核心 + 37 门
   语言的副作用注册模块，逐个向全局 Prism 挂语言）——最后这个在 npm 上
   不存在对应物。
3. **升级路径**：整体替换对应文件（保持文件头 `@module-key/@provides` 标注
   与数字键不变），不要手工编辑文件内容。

## 清单

| 文件 | 内容 | 备注 |
| --- | --- | --- |
| `vue.js` | Vue 3.5.35 runtime-core / runtime-dom / reactivity / shared / jsx 运行时 | 6 个模块 |
| `codemirror.js` | CodeMirror 6（view/state/language/search）+ Lezer 基础设施 + @lezer/markdown 与 @codemirror/lang-markdown 全部实现 | 13 个模块 |
| `remark.js` | unified / remark / rehype / mdast / micromark / hast 生态全部模块 | 58 个模块 |
| `katex.js` | KaTeX 数学排版引擎（经 rehype-katex 集成） | 单模块内嵌 |
| `fontawesome.js` | Font Awesome 6.7.0 的 Vue 绑定组件与 check/copy 图标数据 | 3 个模块 |
| `misc.js` | Prism 核心 + 37 门语言注册模块、lodash.throttle / sortedIndex、core-js 片段、structured-clone 等其余依赖 | 42 个模块 |

各库的上游项目与官方仓库都是公开的；这里保留的是与站内行为一致的运行产物。
