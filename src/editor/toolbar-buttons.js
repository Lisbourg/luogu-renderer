/* ============================================================================
 * 工具栏按钮
 * ----------------------------------------------------------------------------
 * 每个按钮 = { name, icon, keymap?, active?, func }。func(cm, casketstar,
 * dialogContainer)：cm 为 CodeMirror 实例、casketstar 为运行状态、
 * dialogContainer 为弹窗挂载点。所有编辑动作都走 CM 的 changeByRange，
 * 多光标/选区同时生效。
 * ========================================================================== */
import { createVNode, h, render } from '../bridge/vue.js';
import { EditorSelection } from '../bridge/codemirror.js';
import { toolbarIconMap } from './toolbar-icons.js';
import { ToolLink, ToolImage, ToolCode, ToolTable, ToolHelp, AutoSaveDialog } from './dialogs.js';

/* ================================================================== */
/* 工具栏按钮定义（name/icon/keymap/func 四元组；active 仅模式键有）      */
/*   func(cm, casketstar, dialogContainer)：cm=CodeMirror 实例，          */
/*   casketstar=CasketStar 组件实例，dialogContainer=弹窗挂载 div。       */
/*   所有编辑动作都走 CM 的 changeByRange —— 多光标/选区同时生效。        */
/* ================================================================== */
const tbIncreaseLevel = {
        name: "increase-level",
        icon: toolbarIconMap.headingup,
        keymap: "Mod-Shift-ArrowUp",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            text = line.text;
                        let spaces = 0,
                            hashes = 0,
                            afterHash = 0;
                        const len = text.length;
                        for (; spaces < len && " " === text[spaces];) spaces++;          // 跳过行首空格
                        for (hashes = spaces; hashes < len && "#" === text[hashes];) hashes++; // 数已有 #
                        for (afterHash = hashes; afterHash < len && " " === text[afterHash];) afterHash++;
                        const oldLevel = hashes - spaces,
                            // 无标题→默认三级；一级→升到二级；其余降一级（# 变少）
                            newLevel = 0 === oldLevel ? 3 : 1 === oldLevel ? 1 : oldLevel - 1,
                            prefix = 0 === newLevel ? "" : "#".repeat(newLevel) + " ";
                        changes.push({
                            from: line.from,
                            to: line.from + afterHash,
                            insert: prefix
                        }), range === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length - afterHash + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbDecreaseLevel = {
        name: "decrease-level",
        icon: toolbarIconMap.headingdown,
        keymap: "Mod-Shift-ArrowDown",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            text = line.text;
                        let spaces = 0,
                            hashes = 0,
                            afterHash = 0;
                        const len = text.length;
                        for (; spaces < len && " " === text[spaces];) spaces++;
                        for (hashes = spaces; hashes < len && "#" === text[hashes];) hashes++;
                        for (afterHash = hashes; afterHash < len && " " === text[afterHash];) afterHash++;
                        const oldLevel = hashes - spaces,
                            // 无标题→三级；六级→去掉标题；其余降一级
                            newLevel = 0 === oldLevel ? 3 : 6 === oldLevel ? 0 : oldLevel + 1,
                            prefix = 0 === newLevel ? "" : "#".repeat(newLevel) + " ";
                        changes.push({
                            from: line.from,
                            to: line.from + afterHash,
                            insert: prefix
                        }), range === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length - afterHash + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbHorizontal = {
        name: "horizontal",
        icon: toolbarIconMap.line,
        keymap: "Mod-Shift-h",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => ({
                    changes: [{
                        from: range.from,
                        to: range.to
                    }, {
                        from: range.from,
                        insert: "---\n\n"
                    }],
                    range: EditorSelection.range(range.from + 5, range.from + 5)
                }))));
            cm.update([transaction]), cm.focus()
        }
    },
    tbBold = {
        name: "bold",
        icon: toolbarIconMap.bold,
        keymap: "Mod-b",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const {
                        from: from,
                        to: to
                    } = range, before = state.sliceDoc(from - 2, from), after = state.sliceDoc(to, to + 2);
                    // 已经包着 ** 则去掉（切换语义）
                    return "**" === before && "**" === after ? {
                        changes: [{
                            from: from - 2,
                            to: from
                        }, {
                            from: to,
                            to: to + 2
                        }],
                        range: EditorSelection.range(from - 2, to - 2)
                    } : {
                        changes: [{
                            from: from,
                            insert: "**"
                        }, {
                            from: to,
                            insert: "**"
                        }],
                        range: EditorSelection.range(from + 2, to + 2)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbItalic = {
        name: "italic",
        icon: toolbarIconMap.italic,
        keymap: "Mod-i",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const {
                        from: from,
                        to: to
                    } = range, before = state.sliceDoc(from - 1, from), after = state.sliceDoc(to, to + 1);
                    return "*" === before && "*" === after ? {
                        changes: [{
                            from: from - 1,
                            to: from
                        }, {
                            from: to,
                            to: to + 1
                        }],
                        range: EditorSelection.range(from - 1, to - 1)
                    } : {
                        changes: [{
                            from: from,
                            insert: "*"
                        }, {
                            from: to,
                            insert: "*"
                        }],
                        range: EditorSelection.range(from + 1, to + 1)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbStrikethrough = {
        name: "strikethrough",
        icon: toolbarIconMap.strikethrough,
        keymap: "Mod-Shift-d",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => ({
                    changes: [{
                        from: range.from,
                        insert: "~~"
                    }, {
                        from: range.to,
                        insert: "~~"
                    }],
                    range: EditorSelection.range(range.from + 2, range.to + 2)
                }))));
            cm.update([transaction]), cm.focus()
        }
    },
    tbLink = {
        name: "link",
        icon: toolbarIconMap.link,
        keymap: "Mod-Shift-l",
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(ToolLink, {
                confirm: function (url, alt) {
                    const state = cm.state,
                        transaction = state.update(state.changeByRange((range => {
                            const md = `[${alt}](${url})`;
                            return {
                                changes: [{
                                    from: range.from,
                                    to: range.to
                                }, {
                                    from: range.from,
                                    insert: md
                                }],
                                range: EditorSelection.range(range.from + md.length, range.from + md.length)
                            }
                        })));
                    cm.update([transaction]), cm.focus()
                },
                container: dialogContainer
            });
            render(dialogVNode, dialogContainer)
        }
    },
    tbImage = {
        name: "image",
        icon: toolbarIconMap.image,
        keymap: "Mod-Shift-i",
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(ToolImage, {
                confirm: function (url, alt) {
                    const state = cm.state,
                        transaction = state.update(state.changeByRange((range => {
                            const md = `![${alt}](${url})`;
                            return {
                                changes: [{
                                    from: range.from,
                                    to: range.to
                                }, {
                                    from: range.from,
                                    insert: md
                                }],
                                range: EditorSelection.range(range.from + md.length, range.from + md.length)
                            }
                        })));
                    cm.update([transaction]), cm.focus()
                },
                upload: casketstar.data.upload,
                container: dialogContainer
            });
            render(dialogVNode, dialogContainer)
        }
    },
    tbCode = {
        name: "code",
        icon: toolbarIconMap.code,
        keymap: "Mod-Shift-1",
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(ToolCode, {
                confirm: function (lang, code) {
                    const state = cm.state,
                        transaction = state.update(state.changeByRange((range => {
                            const md = `\`\`\`${lang}\n${code}\n\`\`\`\n`;
                            return {
                                changes: [{
                                    from: range.from,
                                    to: range.to
                                }, {
                                    from: range.from,
                                    insert: md
                                }],
                                range: EditorSelection.range(range.from + md.length, range.from + md.length)
                            }
                        })));
                    cm.update([transaction]), cm.focus()
                },
                container: dialogContainer
            });
            render(dialogVNode, dialogContainer)
        }
    },
    tbTable = {
        name: "table",
        icon: toolbarIconMap.table,
        keymap: "Mod-Shift-2",
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(ToolTable, {
                /* ToolTable 确认时回传 (行数, 列数, 网格)，grid[row][col] */
                confirm: function (rows, cols, grid) {
                    // 每列宽度 = max(3, 本列最长单元格)，封顶 10
                    const colWidths = [];
                    for (let c = 0; c < cols; c++) {
                        let width = 3;
                        for (let r = 0; r < rows; r++) width = Math.max(width, grid[r][c].length);
                        width > 10 && (width = 10), colWidths.push(width)
                    }
                    const state = cm.state,
                        transaction = state.update(state.changeByRange((range => {
                            let md = "";
                            for (let r = 0; r < rows; r++) {
                                for (let c = 0; c < colWidths.length; c++) {
                                    const pad = colWidths[c] - grid[r][c].length;
                                    md += "|" + grid[r][c] + " ".repeat(pad > 0 ? pad : 0)
                                }
                                if (md += "|\n", 0 === r) {
                                    for (let c = 0; c < colWidths.length; c++) {
                                        const dash = colWidths[c] - 3;
                                        md += "|:-" + "-".repeat(dash > 0 ? dash : 0) + ":"
                                    }
                                    md += "|\n"
                                }
                            }
                            return md += "\n", {
                                changes: [{
                                    from: range.from,
                                    to: range.to
                                }, {
                                    from: range.from,
                                    insert: md
                                }],
                                range: EditorSelection.range(range.from + md.length, range.from + md.length)
                            }
                        })));
                    cm.update([transaction]), cm.focus()
                },
                container: dialogContainer
            });
            render(dialogVNode, dialogContainer)
        }
    },
    tbQuote = {
        name: "quote",
        icon: toolbarIconMap.quote,
        keymap: "Mod-Shift-q",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            prefix = "> ";
                        changes.push({
                            from: line.from,
                            insert: prefix
                        }), lineNo === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbUnorderedList = {
        name: "unordered-list",
        icon: toolbarIconMap.listul,
        keymap: "Mod-Shift-7",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            prefix = "- ";
                        changes.push({
                            from: line.from,
                            insert: prefix
                        }), lineNo === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbOrderedList = {
        name: "ordered-list",
        icon: toolbarIconMap.listol,
        keymap: "Mod-Shift-8",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            prefix = "1. ";
                        changes.push({
                            from: line.from,
                            insert: prefix
                        }), lineNo === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbTaskList = {
        name: "task-list",
        icon: toolbarIconMap.listtask,
        keymap: "Mod-Shift-9",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => {
                    const firstLine = state.doc.lineAt(range.from).number,
                        lastLine = state.doc.lineAt(range.to).number,
                        changes = [];
                    let startPos = 0,
                        cursorEnd = state.doc.line(firstLine).from;
                    for (let lineNo = firstLine; lineNo <= lastLine; lineNo++) {
                        const line = state.doc.line(lineNo),
                            prefix = "- [ ] ";
                        changes.push({
                            from: line.from,
                            insert: prefix
                        }), lineNo === firstLine && (startPos = line.from), cursorEnd = cursorEnd + line.length + prefix.length + 1
                    }
                    return cursorEnd--, {
                        changes: changes,
                        range: EditorSelection.range(startPos, cursorEnd)
                    }
                })));
            cm.update([transaction]), cm.focus()
        }
    },
    tbOnlyEditor = {
        name: "only-editor",
        icon: toolbarIconMap.editor,
        active: (cm, casketstar) => !casketstar.showViewer,
        func: (cm, casketstar) => {
            casketstar.showViewer ? (casketstar.showEditor = true, casketstar.showViewer = false) : casketstar.showViewer = true
        }
    },
    tbOnlyViewer = {
        name: "only-viewer",
        icon: toolbarIconMap.viewer,
        active: (cm, casketstar) => !casketstar.showEditor,
        func: (cm, casketstar) => {
            casketstar.showEditor ? (casketstar.showViewer = true, casketstar.showEditor = false) : casketstar.showEditor = true
        }
    },
    tbFullScreen = {
        name: "full-screen",
        icon: toolbarIconMap.expand,
        active: (cm, casketstar) => casketstar.fullScreen,
        func: (cm, casketstar) => {
            casketstar.fullScreen = !casketstar.fullScreen
        }
    },
    tbHelp = {
        name: "help",
        icon: toolbarIconMap.help,
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(ToolHelp, {
                container: dialogContainer,
                confirm: () => {}
            });
            render(dialogVNode, dialogContainer)
        }
    },
    tbMath = {
        name: "math",
        icon: toolbarIconMap.math,
        keymap: "Mod-m",
        func: cm => {
            const state = cm.state,
                transaction = state.update(state.changeByRange((range => ({
                    changes: [{
                        from: range.from,
                        insert: "$"
                    }, {
                        from: range.to,
                        insert: "$"
                    }],
                    range: EditorSelection.range(range.from + 1, range.to + 1)
                }))));
            cm.update([transaction]), cm.focus()
        }
    },
    tbAutoSave = {
        name: "auto-save",
        icon: toolbarIconMap.autosave,
        func: (cm, casketstar, dialogContainer) => {
            const dialogVNode = createVNode(AutoSaveDialog, {
                confirm: function (content) {
                    const state = cm.state,
                        transaction = state.update({
                            changes: [{
                                from: 0,
                                to: state.doc.length,
                                insert: content
                            }]
                        });
                    cm.update([transaction]), cm.focus()
                },
                container: dialogContainer
            });
            render(dialogVNode, dialogContainer)
        }
    },
    // 工具栏布局：左侧四组（标题/样式/插入/块），右侧两组（模式/杂项）
    toolbarGroupLevel = [tbIncreaseLevel, tbDecreaseLevel, tbHorizontal],
    toolbarGroupStyle = [tbBold, tbItalic, tbStrikethrough, tbMath],
    toolbarGroupInsert = [tbLink, tbImage, tbCode, tbTable],
    toolbarGroupBlock = [tbQuote, tbUnorderedList, tbOrderedList, tbTaskList],
    toolbarGroupMode = [tbOnlyEditor, tbOnlyViewer, tbFullScreen],
    toolbarGroupMisc = [tbHelp, tbAutoSave];

export {
  toolbarGroupLevel, toolbarGroupStyle, toolbarGroupInsert,
  toolbarGroupBlock, toolbarGroupMode, toolbarGroupMisc,
};
