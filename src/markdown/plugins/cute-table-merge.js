/* cute-table 单元格合并
 * 约定：某格内容 == escapeu（默认 "^"）→ 向上合并；
 *       某格内容 == escapel（默认 "<"）→ 向左合并。
 * 合并格打 delete 标记，最后统一从 <tr> 里剔除；竖线列加粗由
 * colgroup 的 cute-table-bold-col 类实现（tuack/three 风格）。 */
import { visit } from '../../bridge/remark.js';

const tableStructureTags = ['table', 'thead', 'tfoot', 'tbody', 'tr'];

/* 该单元格是不是一个"合并占位格"：仅含一个文本子节点且内容等于标记 */
function isMergeMarkerCell(cell, marker) {
  return cell.type === 'element'
    && (cell.tagName === 'th' || cell.tagName === 'td')
    && cell.children.length === 1
    && cell.children[0].type === 'text'
    && cell.children[0].value.trim() === marker;
}

export function cuteTableMerge() {
  return (tree) => {
    /* 1) 表格类标签下剔除裸换行文本节点（保证后续下标计算稳定） */
    visit(tree, 'element', (element) => {
      if (!tableStructureTags.includes(element.tagName) || !Array.isArray(element.children)) return;
      element.children = element.children.filter((child) => !(child.type === 'text' && child.value === '\n'));
    });
    /* 2) 扫描 <table>：生成 colgroup + 计算行/列合并 */
    visit(tree, 'element', (element) => {
      if (element.tagName !== 'table') return;
      const cute = (element.properties && element.properties.cute) || {};
      const colCount = element.children[0].children[0].children.length;
      const rowMarker = cute.escapeu || '^';
      const colMarker = cute.escapel || '<';

      element.children.unshift({
        type: 'element',
        tagName: 'colgroup',
        properties: {},
        children: Array.from(Array(colCount), (_unused, colIdx) => {
          const colClasses = [];
          if (cute && ('kind' in cute) && (cute.kind === 'tuack' || cute.kind === 'three') && cute.verticals.includes(colIdx)) {
            colClasses.push('cute-table-bold-col');
          }
          return { type: 'element', tagName: 'col', properties: { className: colClasses }, children: [] };
        }),
      });

      for (const section of element.children) {
        if (section.type !== 'element' || !['thead', 'tbody'].includes(section.tagName)) continue;
        const rowCount = section.children.length;
        const cellCount = section.children[0].children.length;
        for (let row = 0; row < rowCount; ++row) {
          for (let col = 0; col < cellCount; ++col) {
            const cell = section.children[row].children[col];
            if (cell.type !== 'element' || cell.delete) continue; // delete：已被合并吃掉的格子
            let spanRows = 0;
            let spanCols = 0;
            for (; row + spanRows + 1 < rowCount && isMergeMarkerCell(section.children[row + spanRows + 1].children[col], rowMarker);) spanRows++;
            for (; col + spanCols + 1 < cellCount && isMergeMarkerCell(section.children[row].children[col + spanCols + 1], colMarker);) spanCols++;
            for (let dr = 0; dr <= spanRows; ++dr) {
              for (let dc = 0; dc <= spanCols; ++dc) {
                if (dr === 0 && dc === 0) continue;
                const merged = section.children[row + dr].children[col + dc];
                merged.delete = true;
                merged.children = [];
              }
            }
            if (spanRows !== 0) cell.properties.rowSpan = spanRows + 1;
            if (spanCols !== 0) cell.properties.colSpan = spanCols + 1;
          }
        }
      }
    });
    /* 3) 从每一行里剔除被合并的格子 */
    visit(tree, 'element', (element) => {
      if (element.tagName === 'tr') element.children = element.children.filter((child) => !child.delete);
    });
  };
}
