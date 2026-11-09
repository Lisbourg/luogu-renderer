/* 嵌套深度护栏
 * 引用/列表/容器指令嵌套超过 10 层时，把整棵子树替换成一句提示文本，
 * 防止恶意输入打爆渲染器（提示文案为原始行为，勿改）。 */
import { visit } from '../../bridge/remark.js';

const REPLACEMENT = {
  type: 'paragraph',
  children: [{ type: 'text', value: 'Too many levels of nesting!' }],
};

function isContainerLike(node) {
  return ['blockquote', 'list', 'containerDirective'].includes(node.type);
}

export function nestingGuard() {
  return (tree) => {
    /* 第一遍：给容器型节点统计深度，超过 10 层整树替换 */
    visit(tree, (node, _index, parent) => {
      const data = node.data || (node.data = {});
      const parentDepth = (parent && parent.data && parent.data.depth) || 0;
      data.depth = parentDepth + (isContainerLike(node) ? 1 : 0);
      if (isContainerLike(node) && data.depth > 10) {
        node.children = [structuredClone(REPLACEMENT)];
      }
    });
    /* 第二遍：清理临时 depth 标记 */
    visit(tree, (node) => {
      if (node.data) delete node.data.depth;
    });
  };
}
