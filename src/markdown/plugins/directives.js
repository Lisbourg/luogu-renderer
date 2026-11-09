/* 洛谷容器/叶子指令
 * :::info / :::warning / :::success / :::error  → <details> 折叠块
 * :::align {center}                              → 标题/段落加 text-align
 * :::epigraph                                    → 题记容器 div.epigraph
 * ::anti-ai                                      → AI 摘要占位 <p class="invisible">
 * ::cute-table[标签]{three=1}                    → 紧随其后的表格包成 cute-table
 * 折叠块默认标题文案为原始行为，勿改。 */
import { visit, SKIP, buildElement } from '../../bridge/remark.js';

const directiveLabelZh = { info: '提示', warning: '警告', error: '错误', success: '成功' };

function isDirectiveNode(node) {
  return node.type === 'leafDirective' || node.type === 'containerDirective';
}

/* :::align {center} —— 给所有标题/段落加 text-align 内联样式 */
function applyAlignDirective(node) {
  let align;
  for (const key of ['left', 'center', 'right']) {
    if (key in node.attributes) { align = key; break; }
  }
  if (align === undefined) return;
  for (const child of node.children) {
    if (child.type === 'heading' || child.type === 'paragraph') {
      const data = child.data || (child.data = {});
      const hProps = data.hProperties || (data.hProperties = {});
      hProps.style = hProps.style
        ? `${hProps.style}; text-align: ${align};`
        : `text-align: ${align};`;
    }
  }
}

/* :::epigraph —— 题记容器：div.epigraph（首段是"出处"时再加 has-source，
 * 并把出处段挪到最后渲染） */
function applyEpigraphDirective(node) {
  let selector = '.epigraph';
  const firstChild = node && node.children[0];
  if (firstChild !== undefined && firstChild.data && firstChild.data.directiveLabel) {
    selector += '.has-source';
    const labelNode = node.children.shift();
    node.children.push(labelNode);
  }
  const data = node.data || (node.data = {});
  data.hName = 'div';
  data.hProperties = buildElement('div' + selector, {}).properties;
}

/* :::info / :::warning / :::success / :::error —— <details> 折叠块：
 * 首段是自定义标题则变成 <summary>，否则补默认中文标题；属性里有
 * "open" 时默认展开。 */
function applyAdmonitionDirective(node) {
  if (!(node.name in directiveLabelZh)) return;
  const first = node.children && node.children[0];
  if (first != null && first.data && 'directiveLabel' in first.data && first.data.directiveLabel) {
    first.data.hName = 'summary';
  } else {
    node.children.unshift({
      type: 'paragraph',
      data: { hName: 'summary' },
      children: [{ type: 'text', value: directiveLabelZh[node.name] }],
    });
  }
  const isOpen = 'open' in node.attributes;
  const data = node.data || (node.data = {});
  data.hName = 'details';
  data.hProperties = buildElement(`details.${node.name}`, { open: isOpen }).properties;
}

/* ::anti-ai —— AI 摘要占位：<p class="invisible">（页面脚本再填充内容） */
function applyAntiAiDirective(node) {
  const data = node.data || (node.data = {});
  data.hName = 'p';
  data.hProperties = { className: ['invisible'] };
}

/* ::cute-table[标签]{three=1,3} —— 解析配置，紧随其后的 markdown 表格
 * 将被 wrapCuteTable 包裹成 cute-table 容器 */
function parseCuteTableConfig(node) {
  const config = { label: node, align: 'center' };
  if ('left' in node.attributes) config.align = 'left';
  if ('right' in node.attributes) config.align = 'right';
  if ('marku' in node.attributes) config.escapeu = node.attributes.marku;
  if ('markl' in node.attributes) config.escapeu = node.attributes.markl;
  if ('three' in node.attributes) {
    return { ...config, kind: 'three', verticals: node.attributes.three.split(',').map((p) => parseInt(p.trim())).filter((n) => !isNaN(n)) };
  }
  if ('tuack' in node.attributes) {
    return { ...config, kind: 'tuack', verticals: node.attributes.tuack.split(',').map((p) => parseInt(p.trim())).filter((n) => !isNaN(n)) };
  }
  return config;
}

/* 把普通 <table> 包进 div.cute-table，并把配置挂到 properties.cute */
function wrapCuteTable(tableNode, config) {
  if (config === null) return tableNode;
  const kindClass = 'cute-table' + ('kind' in config ? `-${config.kind}` : '');
  (tableNode.data || (tableNode.data = {})).hProperties = { cute: config };
  return {
    type: 'containerDirective',
    name: 'cute-table',
    data: { hName: 'div', hProperties: { className: ['cute-table', kindClass] } },
    children: [
      tableNode,
      { type: 'paragraph', data: { hName: 'caption' }, children: config.label.children },
    ],
  };
}

export function luoguDirectives() {
  return (tree) => {
    let pendingCuteTable = null;
    visit(tree, (node, index, parent) => {
      if (isDirectiveNode(node)) {
        if (node.type === 'containerDirective') {
          if (node.name === 'align') {
            applyAlignDirective(node);
            if (parent && typeof index === 'number') parent.children.splice(index, 1, ...node.children);
          } else if (node.name === 'epigraph') {
            applyEpigraphDirective(node);
          } else if (['info', 'warning', 'success', 'error'].includes(node.name)) {
            applyAdmonitionDirective(node);
          }
        } else if (node.type === 'leafDirective') {
          if (node.name === 'anti-ai') {
            applyAntiAiDirective(node);
          } else if (node.name === 'cute-table') {
            pendingCuteTable = parseCuteTableConfig(node);
            parent.children.splice(index, 1);
            return [SKIP, index];
          }
        }
      } else if (node.type === 'table') {
        parent.children[index] = wrapCuteTable(node, pendingCuteTable);
        pendingCuteTable = null;
      }
    });
  };
}
