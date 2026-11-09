/* 工具栏：左右两组按钮渲染 + tooltip（当前语言文案）+ active 高亮。 */
import {
  defineComponent, unref, openBlock, createElementBlock, createElementVNode,
  createVNode, createCommentVNode, renderList, Fragment,
  normalizeClass, toDisplayString,
} from '../bridge/vue.js';
import { FontAwesomeIcon } from './fontawesome.js';
import { translateToolbarText } from './i18n.js';

const toolbarRootProps = {
        class: "cs-toolbar"
    },
    toolbarLeftMarker = {
        key: 0
    },
    toolBtnEvents = ["onClick"],
    toolTooltipProps = {
        class: "cs-tooltip"
    },
    toolbarRightMarker = {
        key: 1
    },
    toolBtnEventsR = ["onClick"],
    toolTooltipPropsR = {
        class: "cs-tooltip"
    },
    MToolbar = defineComponent({
        __name: "MToolbar",
        props: {
            toolbarL: {},
            toolbarR: {},
            getCodemirror: {
                type: Function
            },
            getCasketstar: {
                type: Function
            },
            dialog: {},
            disabled: {
                type: Boolean
            }
        },
        setup(props) {
            const propsAlias = props;

            function handleClick(btn) {
                if (propsAlias.disabled) return;
                const cm = propsAlias.getCodemirror(),
                    star = propsAlias.getCasketstar();
                cm && star && btn.func(cm, star, propsAlias.dialog)
            }
            const isActive = btn => {
                if (btn.active) {
                    const cm = propsAlias.getCodemirror(),
                        star = propsAlias.getCasketstar();
                    if (cm && star) return btn.active(cm, star, propsAlias.dialog)
                }
                return false
            };
            return (_ctx, _cache) => (openBlock(), createElementBlock("div", toolbarRootProps, [propsAlias.toolbarL ? (openBlock(), createElementBlock("div", toolbarLeftMarker, [(openBlock(true), createElementBlock(Fragment, null, renderList(propsAlias.toolbarL, ((group, gi) => (openBlock(), createElementBlock("span", {
                key: gi,
                class: "cs-toolbar-group"
            }, [(openBlock(true), createElementBlock(Fragment, null, renderList(group, (btn => (openBlock(), createElementBlock("span", {
                key: btn.name,
                class: normalizeClass(["cs-toolbar-tool", {
                    active: isActive(btn)
                }]),
                onClick: ev => handleClick(btn)
            }, [createVNode(unref(FontAwesomeIcon), {
                icon: btn.icon,
                class: "cs-icon"
            }, null, 8, ["icon"]), createElementVNode("span", toolTooltipProps, toDisplayString(translateToolbarText(btn.name)), 1)], 10, toolBtnEvents)))), 128))])))), 128))])) : createCommentVNode("", true), propsAlias.toolbarR ? (openBlock(), createElementBlock("div", toolbarRightMarker, [(openBlock(true), createElementBlock(Fragment, null, renderList(propsAlias.toolbarR, ((group, gi) => (openBlock(), createElementBlock("span", {
                key: gi,
                class: "cs-toolbar-group"
            }, [(openBlock(true), createElementBlock(Fragment, null, renderList(group, (btn => (openBlock(), createElementBlock("span", {
                key: btn.name,
                class: normalizeClass(["cs-toolbar-tool", {
                    active: isActive(btn)
                }]),
                onClick: ev => handleClick(btn)
            }, [createVNode(unref(FontAwesomeIcon), {
                icon: btn.icon,
                class: "cs-icon"
            }, null, 8, ["icon"]), createElementVNode("span", toolTooltipPropsR, toDisplayString(translateToolbarText(btn.name)), 1)], 10, toolBtnEventsR)))), 128))])))), 128))])) : createCommentVNode("", true)]))
        }
    });

export { MToolbar };
