#!/usr/bin/env node
/* ============================================================================
 * build.js — LuoguRenderer 构建脚本
 * ----------------------------------------------------------------------------
 * 输入：
 *   src/**   库源码（ESM，见下方「源码书写规约」）
 *   vendor/  第三方库运行产物（构建输入，不需要阅读；每个文件头有
 *            @module-key/@provides 标注其内部模块键）
 * 输出：
 *   dist/luogu-renderer.js   单文件 IIFE，浏览器 <script> 直接引入
 *
 * 源码书写规约（构建器支持的 ESM 子集，构建时会校验）：
 *   1. import 只能出现在模块顶层；
 *   2. import 路径：
 *        - 相对路径（./ ../）引用 src 内模块；
 *        - 指向 vendor/<lib>.js 引入第三方库主模块；
 *        - 指向 vendor/<lib>.js?<模块键> 引入该库文件内的其他模块；
 *   3. 导出使用 export default / export const / export function / export { }；
 *      导出绑定在模块初始化后不再重新赋值（不依赖 ES 的 live binding）；
 *   4. 不使用动态 import()、import.meta、顶层 await，模块间不出现循环依赖。
 *
 * 用法：node build.js
 * ========================================================================== */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const astring = require('astring');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const VENDOR = path.join(ROOT, 'vendor');
const DIST = path.join(ROOT, 'dist');

/* ---------------------------------------------------------------- */
/* 源码收集与模块键分配                                              */
/* ---------------------------------------------------------------- */

function listFiles(dir, base = '') {
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...listFiles(full, base + name + '/'));
    else if (name.endsWith('.js')) out.push({ rel: base + name, full });
  }
  return out;
}

const srcFiles = listFiles(SRC);
const keyOf = new Map();          // src 相对路径 -> 模块键
const metaOf = new Map();         // 模块键 -> { rel, full }
let nextKey = 500000;
/* 入口文件最后执行依赖解析需要稳定键，先按文件名字典序分配（与遍历顺序一致） */
for (const f of srcFiles) {
  keyOf.set(f.rel, String(nextKey));
  metaOf.set(String(nextKey), f);
  nextKey++;
}

/* ---------------------------------------------------------------- */
/* vendor 文件头解析：@module-key / @provides                        */
/* ---------------------------------------------------------------- */

const vendorKeys = new Map();     // 'vue.js' -> 主键；'vue.js?12416' -> 键
for (const name of fs.readdirSync(VENDOR).sort()) {
  if (!name.endsWith('.js')) continue;
  const head = fs.readFileSync(path.join(VENDOR, name), 'utf8').slice(0, 2000);
  const mk = head.match(/@module-key:\s*(\d+)/);
  const pv = head.match(/@provides:\s*([0-9,\s]+)/);
  if (!mk || !pv) throw new Error(`vendor/${name} 缺少 @module-key/@provides 标注`);
  const provides = pv[1].split(',').map(s => s.trim()).filter(Boolean);
  vendorKeys.set(name, mk[1]);
  for (const k of provides) vendorKeys.set(`${name}?${k}`, k);
}

/* import 路径 → 模块键；并返回 { key, isVendor } */
function resolveImport(spec, fromFile) {
  const vm = spec.match(/^((?:\.\.\/)+vendor\/(.+\.js))(\?(\d+))?$/);
  if (vm) {
    const vk = vendorKeys.get(vm[2] && vm[4] ? `${vm[2]}?${vm[4]}` : vm[2]);
    if (!vk) throw new Error(`${fromFile.rel}: vendor 模块 '${spec}' 不存在`);
    return { key: vk, isVendor: true };
  }
  if (spec.startsWith('.')) {
    const abs = path.resolve(path.dirname(fromFile.full), spec).slice(ROOT.length + 1);
    let rel = abs.split(path.sep).join('/');
    if (rel.startsWith('src/')) rel = rel.slice(4);
    if (keyOf.has(rel)) return { key: keyOf.get(rel), isVendor: false };
    throw new Error(`${fromFile.rel}: 无法解析 import '${spec}'`);
  }
  throw new Error(`${fromFile.rel}: 不支持的 import 路径 '${spec}'（只支持相对路径与 vendor/）`);
}

/* ---------------------------------------------------------------- */
/* ESM → 工厂 转换                                                   */
/* ---------------------------------------------------------------- */

/* 把一个 src 模块翻译成 function (module, exports, __req) { ... } 文本 */
function compileModule(file) {
  const code = fs.readFileSync(file.full, 'utf8');
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });

  const edits = [];              // {start, end, text}
  const tail = [];               // 追加到模块体末尾的导出赋值
  const importKeys = new Set();  // 本模块依赖的模块键（仅记录，执行顺序由运行时惰性 require 决定）

  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      const { key, isVendor } = resolveImport(node.source.value, file);
      importKeys.add(key);
      let text = '';
      const spec = node.specifiers;
      if (spec.length === 0) {
        text = `__req(${JSON.stringify(key)});`;
      } else if (spec.length === 1 && spec[0].type === 'ImportDefaultSpecifier') {
        const local = spec[0].local.name;
        /* vendor 模块 exports 即库本体；src 模块取 .default */
        text = isVendor
          ? `const ${local} = __req(${JSON.stringify(key)});`
          : `const ${local} = __req(${JSON.stringify(key)}).default;`;
      } else if (spec.length === 1 && spec[0].type === 'ImportNamespaceSpecifier') {
        text = `const ${spec[0].local.name} = __req(${JSON.stringify(key)});`;
      } else {
        const parts = [];
        for (const s of spec) {
          if (s.type !== 'ImportSpecifier') throw new Error(`${file.rel}: 混合形态 import 暂不支持`);
          const imported = s.imported.name || s.imported.value;
          const local = s.local.name;
          parts.push(`const ${local} = __req(${JSON.stringify(key)})[${JSON.stringify(imported)}];`);
        }
        text = parts.join(' ');
      }
      edits.push({ start: node.start, end: node.end, text });
      continue;
    }
    if (node.type === 'ExportDefaultDeclaration') {
      const decl = node.declaration;
      if ((decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') && decl.id) {
        /* export default function foo(){} → 声明保留 + 导出绑定 */
        edits.push({ start: node.start, end: decl.start, text: '' });
        tail.push(`exports.default = ${decl.id.name};`);
      } else if (decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') {
        const tmp = `__default_${node.start}`;
        edits.push({ start: node.start, end: decl.start, text: `const ${tmp} = ` });
        edits.push({ start: decl.end, end: node.end, text: ';' });
        tail.push(`exports.default = ${tmp};`);
      } else {
        /* export default <表达式> */
        edits.push({ start: node.start, end: decl.start, text: 'exports.default = ' });
        edits.push({ start: decl.end, end: node.end, text: ';' });
      }
      continue;
    }
    if (node.type === 'ExportNamedDeclaration' && !node.source) {
      const decl = node.declaration;
      if (decl && (decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') && decl.id) {
        edits.push({ start: node.start, end: decl.start, text: '' });
        tail.push(`exports.${decl.id.name} = ${decl.id.name};`);
      } else if (decl && decl.type === 'VariableDeclaration') {
        edits.push({ start: node.start, end: decl.start, text: '' });
        for (const d of decl.declarations) {
          if (d.id.type !== 'Identifier') throw new Error(`${file.rel}: 不支持解构导出`);
          tail.push(`exports.${d.id.name} = ${d.id.name};`);
        }
      } else if (node.specifiers && node.specifiers.length) {
        edits.push({ start: node.start, end: node.end, text: '' });
        for (const s of node.specifiers) {
          const exported = s.exported.name || s.exported.value;
          tail.push(`exports.${exported} = ${s.local.name};`);
        }
      } else {
        throw new Error(`${file.rel}: 不支持的导出形态（${node.type}）`);
      }
      continue;
    }
    if (node.type === 'ExportAllDeclaration') {
      throw new Error(`${file.rel}: 不支持 export * from`);
    }
  }

  /* 应用改写（从后往前，保持偏移有效） */
  edits.sort((a, b) => b.start - a.start);
  let body = code;
  for (const e of edits) body = body.slice(0, e.start) + e.text + body.slice(e.end);
  if (tail.length) body += '\n' + tail.join('\n') + '\n';

  /* 去掉可能残留的 "use strict"（工厂外层已统一 strict）——保留也无害，原样不动 */
  const header = `function (module, exports, __req) {\n`;
  return header + body + '}\n';
}

/* 循环依赖检查：src 依赖图必须无环（vendor 之间允许，原库即如此） */
function checkCycles() {
  const deps = new Map();
  for (const f of srcFiles) {
    const code = fs.readFileSync(f.full, 'utf8');
    const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
    const list = [];
    for (const node of ast.body) {
      if (node.type === 'ImportDeclaration') {
        const r = resolveImport(node.source.value, f);
        if (!r.isVendor) list.push(r.key);
      }
    }
    deps.set(keyOf.get(f.rel), list);
  }
  const state = new Map();
  const visit = (k, stack) => {
    if (state.get(k) === 2) return;
    if (state.get(k) === 1) throw new Error('检测到 src 循环依赖: ' + [...stack, k].join(' -> '));
    state.set(k, 1);
    for (const d of deps.get(k) || []) visit(d, [...stack, k]);
    state.set(k, 2);
  };
  for (const k of deps.keys()) visit(k, []);
}

/* ---------------------------------------------------------------- */
/* 打包                                                              */
/* ---------------------------------------------------------------- */

function build() {
  checkCycles();

  const parts = [];
  parts.push(`/* LuoguRenderer — 复现洛谷（www.luogu.com.cn）的 Markdown 渲染器与编辑器。构建产物。 */\n`);
  parts.push(`(function () {\n"use strict";\n`);
  parts.push(`
/* ---- 模块运行时 ------------------------------------------------ */
var __modules = {}, __cache = {};
function __req(key) {
  var hit = __cache[key];
  if (hit) return hit.exports;
  var factory = __modules[key];
  if (!factory) throw new Error("module not found: " + key);
  var mod = __cache[key] = { exports: {} };
  factory(mod, mod.exports, __req);
  return mod.exports;
}
__req.d = function (exports, defs) {
  for (var k in defs) Object.defineProperty(exports, k, { get: defs[k], enumerable: true, configurable: true });
};
__req.r = function (exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
};
__req.n = function (m) {
  var getter = m && m.__esModule ? function () { return m.default; } : function () { return m; };
  __req.d(getter, { a: getter });
  return getter;
};
__req.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
__req.j = "";
__req.g = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);
/* ---------------------------------------------------------------- */
`);

  /* vendor 注册段（第三方库，原样拼入） */
  parts.push(`var __vendor_modules = {};\n`);
  for (const name of fs.readdirSync(VENDOR).sort()) {
    if (!name.endsWith('.js')) continue;
    parts.push(`/* vendor/${name} */\n`);
    parts.push(fs.readFileSync(path.join(VENDOR, name), 'utf8'));
    parts.push('\n');
  }
  parts.push(`for (var __vk in __vendor_modules) __modules[__vk] = __vendor_modules[__vk];\n\n`);

  /* 应用模块段（源码编译产物） */
  parts.push(`/* ---- 应用源码（src/ 编译产物，模块键见各段注释） ---- */\n`);
  for (const f of srcFiles) {
    const key = keyOf.get(f.rel);
    parts.push(`/* src/${f.rel} */\n__modules[${JSON.stringify(key)}] = ${compileModule(f)};\n`);
  }

  /* 入口启动 */
  const entryKey = keyOf.get('index.js');
  if (!entryKey) throw new Error('缺少入口 src/index.js');
  parts.push(`
/* ---- 启动：暴露公开接口 ---------------------------------------- */
var api = __req(${JSON.stringify(entryKey)});
window.luoguRender = api.luoguRender;
window.luoguRenderInto = api.luoguRenderInto;
window.luoguRenderVNode = api.luoguRenderVNode;
window.luoguEditor = api.luoguEditor;
})();
`);

  fs.mkdirSync(DIST, { recursive: true });
  const out = path.join(DIST, 'luogu-renderer.js');
  fs.writeFileSync(out, parts.join(''));
  console.log(`dist/luogu-renderer.js  ${(fs.statSync(out).size / 1024 / 1024).toFixed(2)}MB  modules: ${srcFiles.length} src + ${vendorKeys.size} vendor keys`);
  console.log('模块键表（src）：');
  for (const f of srcFiles) console.log(`  ${keyOf.get(f.rel)}  src/${f.rel}`);
}

build();
