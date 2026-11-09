/* ============================================================================
 * Font Awesome 6.7.0 SVG 核心（第三方库运行产物）
 * ----------------------------------------------------------------------------
 * 本文件是 @fortawesome/fontawesome-svg-core 与其 Vue 绑定的打包产物，
 * 随编辑器一起分发；内部名保持打包原样，不作为库源码维护。
 * 暴露给编辑器使用的只有文件末尾的 FontAwesomeIcon 组件。
 * ========================================================================== */


import { defineComponent, computed, watch, h } from '../bridge/vue.js';

/* Babel 运行时辅助（对象展开三件套，与原模块逐一对应） */
function _defineProperty(target, key, value) {
    return (key = function (k) {
        var prim = function (k, hint) {
            if ("object" != typeof k || !k) return k;
            var fn = k[Symbol.toPrimitive];
            if (void 0 !== fn) {
                var res = fn.call(k, "string");
                if ("object" != typeof res) return res;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(k)
        }(k);
        return "symbol" == typeof prim ? prim : prim + ""
    }(key)) in target ? Object.defineProperty(target, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    }) : target[key] = value, target
}

function _objectKeysWithSymbols(target, withEnumerableSymbols) {
    var keys = Object.keys(target);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(target);
        withEnumerableSymbols && (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(target, sym).enumerable
        })), keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? _objectKeysWithSymbols(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : _objectKeysWithSymbols(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
    }
    return target
}

const noopFn = () => {};
/* 浏览器环境探测（Font Awesome 核心的标准做法）：
   在不支持的对象上取值会被 try 包住，拿不到就退化为空实现 */
let browserWindowRef = {},
    browserDocumentRef = {},
    mutationObserverRef = null,
    performanceRef = {
        mark: noopFn,
        measure: noopFn
    };
try {
    typeof window < "u" && (browserWindowRef = window), typeof document < "u" && (browserDocumentRef = document), typeof MutationObserver < "u" && (mutationObserverRef = MutationObserver), typeof performance < "u" && (performanceRef = performance)
} catch {}
const {
    userAgent: USER_AGENT = ""
} = browserWindowRef.navigator || {}, WINDOW = browserWindowRef, DOCUMENT = browserDocumentRef, MutationObserverCtor = mutationObserverRef, performanceAPI = performanceRef;
WINDOW.document;
const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && "function" == typeof DOCUMENT.addEventListener && "function" == typeof DOCUMENT.createElement,
    IS_IE = ~USER_AGENT.indexOf("MSIE") || ~USER_AGENT.indexOf("Trident/");

/* ================================================================== */
/* ===================  Font Awesome 6.7.0 SVG 核心  ================== */
/*  以下区域是 @fortawesome/fontawesome-svg-core@6.7.0 的打包产物，      */
/*  属第三方库：内部名保持发布时原样，不做改写（维护以官方仓库为准）。    */
/*  仅把模块级环境锚点改成了上面的语义名（WINDOW/DOCUMENT/IS_DOM…）。     */
/*  洛谷工具栏图标全部由它渲染（见下方 FontAwesomeIcon 组件）。          */
/* ================================================================== */

var j = {
    classic: {
            fa: "solid",
            fas: "solid",
            "fa-solid": "solid",
            far: "regular",
            "fa-regular": "regular",
            fal: "light",
            "fa-light": "light",
            fat: "thin",
            "fa-thin": "thin",
            fab: "brands",
            "fa-brands": "brands"
    },
    duotone: {
            fa: "solid",
            fad: "solid",
            "fa-solid": "solid",
            "fa-duotone": "solid",
            fadr: "regular",
            "fa-regular": "regular",
            fadl: "light",
            "fa-light": "light",
            fadt: "thin",
            "fa-thin": "thin"
    },
    sharp: {
            fa: "solid",
            fass: "solid",
            "fa-solid": "solid",
            fasr: "regular",
            "fa-regular": "regular",
            fasl: "light",
            "fa-light": "light",
            fast: "thin",
            "fa-thin": "thin"
    },
    "sharp-duotone": {
            fa: "solid",
            fasds: "solid",
            "fa-solid": "solid",
            fasdr: "regular",
            "fa-regular": "regular",
            fasdl: "light",
            "fa-light": "light",
            fasdt: "thin",
            "fa-thin": "thin"
    }
}, _ = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"], I = "classic", D = "duotone", T = [I, D, "sharp", "sharp-duotone"], X = new Map([["classic", {
    defaultShortPrefixId: "fas",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin", "brands"],
    futureStyleIds: [],
    defaultFontWeight: 900
}], ["sharp", {
    defaultShortPrefixId: "fass",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
}], ["duotone", {
    defaultShortPrefixId: "fad",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
}], ["sharp-duotone", {
    defaultShortPrefixId: "fasds",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
}]]), B = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], W = ["fak", "fakd"], K = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, V = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], Y = {
    classic: {
            fab: "fa-brands",
            fad: "fa-duotone",
            fal: "fa-light",
            far: "fa-regular",
            fas: "fa-solid",
            fat: "fa-thin"
    },
    duotone: {
            fadr: "fa-regular",
            fadl: "fa-light",
            fadt: "fa-thin"
    },
    sharp: {
            fass: "fa-solid",
            fasr: "fa-regular",
            fasl: "fa-light",
            fast: "fa-thin"
    },
    "sharp-duotone": {
            fasds: "fa-solid",
            fasdr: "fa-regular",
            fasdl: "fa-light",
            fasdt: "fa-thin"
    }
}, U = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", "fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"], q = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], H = q.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), $ = [...Object.keys({
    classic: ["fas", "far", "fal", "fat", "fad"],
    duotone: ["fadr", "fadl", "fadt"],
    sharp: ["fass", "fasr", "fasl", "fast"],
    "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"]
}), "solid", "regular", "light", "thin", "duotone", "brands", "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", K.GROUP, K.SWAP_OPACITY, K.PRIMARY, K.SECONDARY].concat(q.map(e => ("").concat(e, "x"))).concat(H.map(e => ("w-").concat(e)));
const Q = "___FONT_AWESOME___", J = 16, G = "fa", Z = "svg-inline--fa", ee = "data-fa-i2svg", te = "data-fa-pseudo-element", ne = "data-fa-pseudo-element-pending", ae = "data-prefix", oe = "data-icon", re = "fontawesome-i2svg", ie = "async", le = ["HTML", "HEAD", "STYLE", "SCRIPT"], se = (() => {
    try {
            return true;
    } catch {
            return false;
    }
})();
function ce(e) {
    return new Proxy(e, {
            get: (e, t) => (t in e) ? e[t] : e[I]
    });
}
const ue = _objectSpread({}, j);
ue[I] = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {
    "fa-duotone": "duotone"
}), j[I]), {
    fak: "kit",
    "fa-kit": "kit"
}), {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
});
const fe = ce(ue), de = _objectSpread({}, {
    classic: {
            solid: "fas",
            regular: "far",
            light: "fal",
            thin: "fat",
            brands: "fab"
    },
    duotone: {
            solid: "fad",
            regular: "fadr",
            light: "fadl",
            thin: "fadt"
    },
    sharp: {
            solid: "fass",
            regular: "fasr",
            light: "fasl",
            thin: "fast"
    },
    "sharp-duotone": {
            solid: "fasds",
            regular: "fasdr",
            light: "fasdl",
            thin: "fasdt"
    }
});
de[I] = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {
    duotone: "fad"
}), de[I]), {
    kit: "fak"
}), {
    "kit-duotone": "fakd"
});
const me = ce(de), pe = _objectSpread({}, Y);
pe[I] = _objectSpread(_objectSpread({}, pe[I]), {
    fak: "fa-kit"
});
const ge = ce(pe), he = _objectSpread({}, {
    classic: {
            "fa-brands": "fab",
            "fa-duotone": "fad",
            "fa-light": "fal",
            "fa-regular": "far",
            "fa-solid": "fas",
            "fa-thin": "fat"
    },
    duotone: {
            "fa-regular": "fadr",
            "fa-light": "fadl",
            "fa-thin": "fadt"
    },
    sharp: {
            "fa-solid": "fass",
            "fa-regular": "fasr",
            "fa-light": "fasl",
            "fa-thin": "fast"
    },
    "sharp-duotone": {
            "fa-solid": "fasds",
            "fa-regular": "fasdr",
            "fa-light": "fasdl",
            "fa-thin": "fasdt"
    }
});
(he[I] = _objectSpread(_objectSpread({}, he[I]), {
    "fa-kit": "fak"
}), ce(he));
const ve = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, be = "fa-layers-text", ye = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
ce(_objectSpread({}, {
    classic: {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal",
            100: "fat"
    },
    duotone: {
            900: "fad",
            400: "fadr",
            300: "fadl",
            100: "fadt"
    },
    sharp: {
            900: "fass",
            400: "fasr",
            300: "fasl",
            100: "fast"
    },
    "sharp-duotone": {
            900: "fasds",
            400: "fasdr",
            300: "fasdl",
            100: "fasdt"
    }
}));
const ke = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], xe = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, we = ["kit", ...$], Le = WINDOW.FontAwesomeConfig || ({});
DOCUMENT && "function" == typeof DOCUMENT.querySelector && [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach(e => {
    let [t, n] = e;
    const a = (o = (function (e) {
            var t = DOCUMENT.querySelector("script[" + e + "]");
            if (t) return t.getAttribute(e);
    })(t), "" === o || "false" !== o && ("true" === o || o));
    var o;
    null != a && (Le[n] = a);
});
const Ce = {
    styleDefault: "solid",
    familyDefault: I,
    cssPrefix: G,
    replacementClass: Z,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: "async",
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
};
Le.familyPrefix && (Le.cssPrefix = Le.familyPrefix);
const Ae = _objectSpread(_objectSpread({}, Ce), Le);
Ae.autoReplaceSvg || (Ae.observeMutations = false);
const ze = {};
(Object.keys(Ce).forEach(e => {
    Object.defineProperty(ze, e, {
            enumerable: true,
            set: function (t) {
                    (Ae[e] = t, Me.forEach(e => e(ze)));
            },
            get: function () {
                    return Ae[e];
            }
    });
}), Object.defineProperty(ze, "familyPrefix", {
    enumerable: true,
    set: function (e) {
            (Ae.cssPrefix = e, Me.forEach(e => e(ze)));
    },
    get: function () {
            return Ae.cssPrefix;
    }
}), WINDOW.FontAwesomeConfig = ze);
const Me = [], Oe = J, Se = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
}, Re = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Ne() {
    let e = 12, t = "";
    for (; e-- > 0; ) t += Re[62 * Math.random() | 0];
    return t;
}
function Ee(e) {
    const t = [];
    for (let n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
}
function Pe(e) {
    return e.classList ? Ee(e.classList) : (e.getAttribute("class") || "").split(" ").filter(e => e);
}
function Fe(e) {
    return ("").concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function je(e) {
    return Object.keys(e || ({})).reduce((t, n) => t + ("").concat(n, ": ").concat(e[n].trim(), ";"), "");
}
function _e(e) {
    return e.size !== Se.size || e.x !== Se.x || e.y !== Se.y || e.rotate !== Se.rotate || e.flipX || e.flipY;
}
var Ie = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';
function De() {
    const e = G, t = Z, n = ze.cssPrefix, a = ze.replacementClass;
    let o = Ie;
    if (n !== e || a !== t) {
            const r = new RegExp(("\\.").concat(e, "\\-"), "g"), i = new RegExp(("\\--").concat(e, "\\-"), "g"), l = new RegExp(("\\.").concat(t), "g");
            o = o.replace(r, (".").concat(n, "-")).replace(i, ("--").concat(n, "-")).replace(l, (".").concat(a));
    }
    return o;
}
let Te = false;
function Xe() {
    ze.autoAddCss && !Te && ((function (e) {
            if (!e || !IS_DOM) return;
            const t = DOCUMENT.createElement("style");
            (t.setAttribute("type", "text/css"), t.innerHTML = e);
            const n = DOCUMENT.head.childNodes;
            let a = null;
            for (let e = n.length - 1; e > -1; e--) {
                    const t = n[e], o = (t.tagName || "").toUpperCase();
                    ["STYLE", "LINK"].indexOf(o) > -1 && (a = t);
            }
            DOCUMENT.head.insertBefore(t, a);
    })(De()), Te = true);
}
var Be = {
    mixout: () => ({
            dom: {
                    css: De,
                    insertCss: Xe
            }
    }),
    hooks: () => ({
            beforeDOMElementCreation() {
                    Xe();
            },
            beforeI2svg() {
                    Xe();
            }
    })
};
const We = WINDOW || ({});
(We[Q] || (We[Q] = {}), We[Q].styles || (We[Q].styles = {}), We[Q].hooks || (We[Q].hooks = {}), We[Q].shims || (We[Q].shims = []));
var Ke = We[Q];
const Ve = [], Ye = function () {
    (DOCUMENT.removeEventListener("DOMContentLoaded", Ye), Ue = 1, Ve.map(e => e()));
};
let Ue = false;
function qe(e) {
    const {tag: t, attributes: n = {}, children: a = []} = e;
    return "string" == typeof e ? Fe(e) : ("<").concat(t, " ").concat((function (e) {
            return Object.keys(e || ({})).reduce((t, n) => t + ("").concat(n, '="').concat(Fe(e[n]), '" '), "").trim();
    })(n), ">").concat(a.map(qe).join(""), "</").concat(t, ">");
}
function He(e, t, n) {
    if (e && e[t] && e[t][n]) return {
            prefix: t,
            iconName: n,
            icon: e[t][n]
    };
}
IS_DOM && (Ue = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState), Ue || DOCUMENT.addEventListener("DOMContentLoaded", Ye));
var $e = function (e, t, n, a) {
    var o, r, i, l = Object.keys(e), s = l.length, c = t;
    for (void 0 === n ? (o = 1, i = e[l[0]]) : (o = 0, i = n); o < s; o++) i = c(i, e[r = l[o]], r, e);
    return i;
};
function Qe(e) {
    const t = (function (e) {
            const t = [];
            let n = 0;
            const a = e.length;
            for (; n < a; ) {
                    const o = e.charCodeAt(n++);
                    if (o >= 55296 && o <= 56319 && n < a) {
                            const a = e.charCodeAt(n++);
                            56320 == (64512 & a) ? t.push(((1023 & o) << 10) + (1023 & a) + 65536) : (t.push(o), n--);
                    } else t.push(o);
            }
            return t;
    })(e);
    return 1 === t.length ? t[0].toString(16) : null;
}
function Je(e) {
    return Object.keys(e).reduce((t, n) => {
            const a = e[n];
            return (a.icon ? t[a.iconName] = a.icon : t[n] = a, t);
    }, {});
}
function Ge(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const {skipHooks: a = !1} = n, o = Je(t);
    ("function" != typeof Ke.hooks.addPack || a ? Ke.styles[e] = _objectSpread(_objectSpread({}, Ke.styles[e] || ({})), o) : Ke.hooks.addPack(e, Je(t)), "fas" === e && Ge("fa", t));
}
const {styles: Ze, shims: et} = Ke, tt = Object.keys(ge), nt = tt.reduce((e, t) => (e[t] = Object.keys(ge[t]), e), {});
let at = null, ot = {}, rt = {}, it = {}, lt = {}, st = {};
const ct = () => {
    const e = e => $e(Ze, (t, n, a) => (t[a] = $e(n, e, {}), t), {});
    (ot = e((e, t, n) => (t[3] && (e[t[3]] = n), t[2] && t[2].filter(e => "number" == typeof e).forEach(t => {
            e[t.toString(16)] = n;
    }), e)), rt = e((e, t, n) => (e[n] = n, t[2] && t[2].filter(e => "string" == typeof e).forEach(t => {
            e[t] = n;
    }), e)), st = e((e, t, n) => {
            const a = t[2];
            return (e[n] = n, a.forEach(t => {
                    e[t] = n;
            }), e);
    }));
    const t = ("far" in Ze) || ze.autoFetchSvg, n = $e(et, (e, n) => {
            const a = n[0];
            let o = n[1];
            const r = n[2];
            return ("far" === o && !t && (o = "fas"), "string" == typeof a && (e.names[a] = {
                    prefix: o,
                    iconName: r
            }), "number" == typeof a && (e.unicodes[a.toString(16)] = {
                    prefix: o,
                    iconName: r
            }), e);
    }, {
            names: {},
            unicodes: {}
    });
    (it = n.names, lt = n.unicodes, at = ht(ze.styleDefault, {
            family: ze.familyDefault
    }));
};
var ut;
function ft(e, t) {
    return (ot[e] || ({}))[t];
}
function dt(e, t) {
    return (st[e] || ({}))[t];
}
function mt(e) {
    return it[e] || ({
            prefix: null,
            iconName: null
    });
}
function pt() {
    return at;
}
(ut = e => {
    at = ht(e.styleDefault, {
            family: ze.familyDefault
    });
}, Me.push(ut), ct());
const gt = () => ({
    prefix: null,
    iconName: null,
    rest: []
});
function ht(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {family: n = I} = t, a = fe[n][e];
    if (n === D && !e) return "fad";
    const o = me[n][e] || me[n][a], r = (e in Ke.styles) ? e : null;
    return o || r || null;
}
function vt(e) {
    return e.sort().filter((e, t, n) => n.indexOf(e) === t);
}
function bt(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {skipLookups: n = !1} = t;
    let a = null;
    const o = U.concat(V), r = vt(e.filter(e => o.includes(e))), i = vt(e.filter(e => !U.includes(e))), l = r.filter(e => (a = e, !_.includes(e))), [s = null] = l, c = (function (e) {
            let t = I;
            const n = tt.reduce((e, t) => (e[t] = ("").concat(ze.cssPrefix, "-").concat(t), e), {});
            return (T.forEach(a => {
                    (e.includes(n[a]) || e.some(e => nt[a].includes(e))) && (t = a);
            }), t);
    })(r), u = _objectSpread(_objectSpread({}, (function (e) {
            let t = [], n = null;
            return (e.forEach(e => {
                    const a = (function (e, t) {
                            const n = t.split("-"), a = n[0], o = n.slice(1).join("-");
                            return a !== e || "" === o || (function (e) {
                                    return ~we.indexOf(e);
                            })(o) ? null : o;
                    })(ze.cssPrefix, e);
                    a ? n = a : e && t.push(e);
            }), {
                    iconName: n,
                    rest: t
            });
    })(i)), {}, {
            prefix: ht(s, {
                    family: c
            })
    });
    return _objectSpread(_objectSpread(_objectSpread({}, u), (function (e) {
            const {values: t, family: n, canonical: a, givenPrefix: o = "", styles: r = {}, config: i = {}} = e, l = n === D, s = t.includes("fa-duotone") || t.includes("fad"), c = "duotone" === i.familyDefault, u = "fad" === a.prefix || "fa-duotone" === a.prefix;
            if ((!l && (s || c || u) && (a.prefix = "fad"), (t.includes("fa-brands") || t.includes("fab")) && (a.prefix = "fab"), !a.prefix && yt.includes(n) && (Object.keys(r).find(e => kt.includes(e)) || i.autoFetchSvg))) {
                    const e = X.get(n).defaultShortPrefixId;
                    (a.prefix = e, a.iconName = dt(a.prefix, a.iconName) || a.iconName);
            }
            return (("fa" === a.prefix || "fa" === o) && (a.prefix = pt() || "fas"), a);
    })({
            values: e,
            family: c,
            styles: Ze,
            config: ze,
            canonical: u,
            givenPrefix: a
    })), (function (e, t, n) {
            let {prefix: a, iconName: o} = n;
            if (e || !a || !o) return {
                    prefix: a,
                    iconName: o
            };
            const r = "fa" === t ? mt(o) : {}, i = dt(a, o);
            return (o = r.iconName || i || o, a = r.prefix || a, "far" === a && !Ze.far && Ze.fas && !ze.autoFetchSvg && (a = "fas"), {
                    prefix: a,
                    iconName: o
            });
    })(n, a, u));
}
const yt = T.filter(e => e !== I || e !== D), kt = Object.keys(Y).filter(e => e !== I).map(e => Object.keys(Y[e])).flat();
let xt = [], wt = {};
const Lt = {}, Ct = Object.keys(Lt);
function At(e, t) {
    for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) a[o - 2] = arguments[o];
    return ((wt[e] || []).forEach(e => {
            t = e.apply(null, [t, ...a]);
    }), t);
}
function zt(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
    (wt[e] || []).forEach(e => {
            e.apply(null, n);
    });
}
function Mt() {
    const e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
    return Lt[e] ? Lt[e].apply(null, t) : void 0;
}
function Ot(e) {
    "fa" === e.prefix && (e.prefix = "fas");
    let {iconName: t} = e;
    const n = e.prefix || pt();
    if (t) return (t = dt(n, t) || t, He(St.definitions, n, t) || He(Ke.styles, n, t));
}
const St = new (class {
    constructor() {
            this.definitions = {};
    }
    add() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            const a = t.reduce(this._pullDefinitions, {});
            Object.keys(a).forEach(e => {
                    (this.definitions[e] = _objectSpread(_objectSpread({}, this.definitions[e] || ({})), a[e]), Ge(e, a[e]));
                    const t = ge[I][e];
                    (t && Ge(t, a[e]), ct());
            });
    }
    reset() {
            this.definitions = {};
    }
    _pullDefinitions(e, t) {
            const n = t.prefix && t.iconName && t.icon ? {
                    0: t
            } : t;
            return (Object.keys(n).map(t => {
                    const {prefix: a, iconName: o, icon: r} = n[t], i = r[2];
                    (e[a] || (e[a] = {}), i.length > 0 && i.forEach(t => {
                            "string" == typeof t && (e[a][t] = r);
                    }), e[a][o] = r);
            }), e);
    }
})(), Rt = {
    i2svg: function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return IS_DOM ? (zt("beforeI2svg", e), Mt("pseudoElements2svg", e), Mt("i2svg", e)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
    },
    watch: function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const {autoReplaceSvgRoot: t} = e;
            (false === ze.autoReplaceSvg && (ze.autoReplaceSvg = true), ze.observeMutations = true, (function (e) {
                    IS_DOM && (Ue ? setTimeout(e, 0) : Ve.push(e));
            })(() => {
                    (Pt({
                            autoReplaceSvgRoot: t
                    }), zt("watch", e));
            }));
    }
}, Nt = {
    icon: e => {
            if (null === e) return null;
            if ("object" == typeof e && e.prefix && e.iconName) return {
                    prefix: e.prefix,
                    iconName: dt(e.prefix, e.iconName) || e.iconName
            };
            if (Array.isArray(e) && 2 === e.length) {
                    const t = 0 === e[1].indexOf("fa-") ? e[1].slice(3) : e[1], n = ht(e[0]);
                    return {
                            prefix: n,
                            iconName: dt(n, t) || t
                    };
            }
            if ("string" == typeof e && (e.indexOf(("").concat(ze.cssPrefix, "-")) > -1 || e.match(ve))) {
                    const t = bt(e.split(" "), {
                            skipLookups: true
                    });
                    return {
                            prefix: t.prefix || pt(),
                            iconName: dt(t.prefix, t.iconName) || t.iconName
                    };
            }
            if ("string" == typeof e) {
                    const t = pt();
                    return {
                            prefix: t,
                            iconName: dt(t, e) || e
                    };
            }
    }
}, FontAwesomeAPI = {
    noAuto: () => {
            (ze.autoReplaceSvg = false, ze.observeMutations = false, zt("noAuto"));
    },
    config: ze,
    dom: Rt,
    parse: Nt,
    library: St,
    findIconDefinition: Ot,
    toHtml: qe
}, Pt = function () {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {autoReplaceSvgRoot: t = DOCUMENT} = e;
    (Object.keys(Ke.styles).length > 0 || ze.autoFetchSvg) && IS_DOM && ze.autoReplaceSvg && FontAwesomeAPI.dom.i2svg({
            node: t
    });
};
function Ft(e, t) {
    return (Object.defineProperty(e, "abstract", {
            get: t
    }), Object.defineProperty(e, "html", {
            get: function () {
                    return e.abstract.map(e => qe(e));
            }
    }), Object.defineProperty(e, "node", {
            get: function () {
                    if (!IS_DOM) return;
                    const t = DOCUMENT.createElement("div");
                    return (t.innerHTML = e.html, t.children);
            }
    }), e);
}
function jt(e) {
    const {icons: {main: t, mask: n}, prefix: a, iconName: o, transform: r, symbol: i, title: l, maskId: s, titleId: c, extra: u, watchable: f = !1} = e, {width: d, height: m} = n.found ? n : t, p = W.includes(a), g = [ze.replacementClass, o ? ("").concat(ze.cssPrefix, "-").concat(o) : ""].filter(e => -1 === u.classes.indexOf(e)).filter(e => "" !== e || !!e).concat(u.classes).join(" ");
    let h = {
            children: [],
            attributes: _objectSpread(_objectSpread({}, u.attributes), {}, {
                    "data-prefix": a,
                    "data-icon": o,
                    class: g,
                    role: u.attributes.role || "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: ("0 0 ").concat(d, " ").concat(m)
            })
    };
    const v = p && !~u.classes.indexOf("fa-fw") ? {
            width: ("").concat(d / m * 16 * .0625, "em")
    } : {};
    (f && (h.attributes[ee] = ""), l && (h.children.push({
            tag: "title",
            attributes: {
                    id: h.attributes["aria-labelledby"] || ("title-").concat(c || Ne())
            },
            children: [l]
    }), delete h.attributes.title));
    const b = _objectSpread(_objectSpread({}, h), {}, {
            prefix: a,
            iconName: o,
            main: t,
            mask: n,
            maskId: s,
            transform: r,
            symbol: i,
            styles: _objectSpread(_objectSpread({}, v), u.styles)
    }), {children: y, attributes: k} = n.found && t.found ? Mt("generateAbstractMask", b) || ({
            children: [],
            attributes: {}
    }) : Mt("generateAbstractIcon", b) || ({
            children: [],
            attributes: {}
    });
    return (b.children = y, b.attributes = k, i ? (function (e) {
            let {prefix: t, iconName: n, children: a, attributes: o, symbol: r} = e;
            const i = true === r ? ("").concat(t, "-").concat(ze.cssPrefix, "-").concat(n) : r;
            return [{
                    tag: "svg",
                    attributes: {
                            style: "display: none;"
                    },
                    children: [{
                            tag: "symbol",
                            attributes: _objectSpread(_objectSpread({}, o), {}, {
                                    id: i
                            }),
                            children: a
                    }]
            }];
    })(b) : (function (e) {
            let {children: t, main: n, mask: a, attributes: o, styles: r, transform: i} = e;
            if (_e(i) && n.found && !a.found) {
                    const {width: e, height: t} = n, a = {
                            x: e / t / 2,
                            y: .5
                    };
                    o.style = je(_objectSpread(_objectSpread({}, r), {}, {
                            "transform-origin": ("").concat(a.x + i.x / 16, "em ").concat(a.y + i.y / 16, "em")
                    }));
            }
            return [{
                    tag: "svg",
                    attributes: o,
                    children: t
            }];
    })(b));
}
function _t(e) {
    const {content: t, width: n, height: a, transform: o, title: r, extra: i, watchable: l = !1} = e, s = _objectSpread(_objectSpread(_objectSpread({}, i.attributes), r ? {
            title: r
    } : {}), {}, {
            class: i.classes.join(" ")
    });
    l && (s[ee] = "");
    const c = _objectSpread({}, i.styles);
    _e(o) && (c.transform = (function (e) {
            let {transform: t, width: n = J, height: a = J, startCentered: o = !1} = e, r = "";
            return (r += o && IS_IE ? ("translate(").concat(t.x / Oe - n / 2, "em, ").concat(t.y / Oe - a / 2, "em) ") : o ? ("translate(calc(-50% + ").concat(t.x / Oe, "em), calc(-50% + ").concat(t.y / Oe, "em)) ") : ("translate(").concat(t.x / Oe, "em, ").concat(t.y / Oe, "em) "), r += ("scale(").concat(t.size / Oe * (t.flipX ? -1 : 1), ", ").concat(t.size / Oe * (t.flipY ? -1 : 1), ") "), r += ("rotate(").concat(t.rotate, "deg) "), r);
    })({
            transform: o,
            startCentered: true,
            width: n,
            height: a
    }), c["-webkit-transform"] = c.transform);
    const u = je(c);
    u.length > 0 && (s.style = u);
    const f = [];
    return (f.push({
            tag: "span",
            attributes: s,
            children: [t]
    }), r && f.push({
            tag: "span",
            attributes: {
                    class: "sr-only"
            },
            children: [r]
    }), f);
}
const {styles: It} = Ke;
function Dt(e) {
    const t = e[0], n = e[1], [a] = e.slice(4);
    let o = null;
    return (o = Array.isArray(a) ? {
            tag: "g",
            attributes: {
                    class: ("").concat(ze.cssPrefix, "-").concat(xe.GROUP)
            },
            children: [{
                    tag: "path",
                    attributes: {
                            class: ("").concat(ze.cssPrefix, "-").concat(xe.SECONDARY),
                            fill: "currentColor",
                            d: a[0]
                    }
            }, {
                    tag: "path",
                    attributes: {
                            class: ("").concat(ze.cssPrefix, "-").concat(xe.PRIMARY),
                            fill: "currentColor",
                            d: a[1]
                    }
            }]
    } : {
            tag: "path",
            attributes: {
                    fill: "currentColor",
                    d: a
            }
    }, {
            found: true,
            width: t,
            height: n,
            icon: o
    });
}
const Tt = {
    found: false,
    width: 512,
    height: 512
};
function Xt(e, t) {
    let n = t;
    return ("fa" === t && null !== ze.styleDefault && (t = pt()), new Promise((a, o) => {
            if ("fa" === n) {
                    const n = mt(e) || ({});
                    (e = n.iconName || e, t = n.prefix || t);
            }
            if (e && t && It[t] && It[t][e]) return a(Dt(It[t][e]));
            ((function (e, t) {
                    !se && !ze.showMissingIcons && e && console.error(('Icon with name "').concat(e, '" and prefix "').concat(t, '" is missing.'));
            })(e, t), a(_objectSpread(_objectSpread({}, Tt), {}, {
                    icon: ze.showMissingIcons && e && Mt("missingIconAbstract") || ({})
            })));
    }));
}
const Bt = () => {}, Wt = ze.measurePerformance && performanceAPI && performanceAPI.mark && performanceAPI.measure ? performanceAPI : {
    mark: Bt,
    measure: Bt
}, Kt = 'FA "6.7.0"', Vt = e => {
    (Wt.mark(("").concat(Kt, " ").concat(e, " ends")), Wt.measure(("").concat(Kt, " ").concat(e), ("").concat(Kt, " ").concat(e, " begins"), ("").concat(Kt, " ").concat(e, " ends")));
};
var Yt = {
    begin: e => (Wt.mark(("").concat(Kt, " ").concat(e, " begins")), () => Vt(e)),
    end: Vt
};
const Ut = () => {};
function qt(e) {
    return "string" == typeof (e.getAttribute ? e.getAttribute(ee) : null);
}
function Ht(e) {
    return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", e);
}
function $t(e) {
    return DOCUMENT.createElement(e);
}
function Qt(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {ceFn: n = "svg" === e.tag ? Ht : $t} = t;
    if ("string" == typeof e) return DOCUMENT.createTextNode(e);
    const a = n(e.tag);
    return (Object.keys(e.attributes || []).forEach(function (t) {
            a.setAttribute(t, e.attributes[t]);
    }), (e.children || []).forEach(function (e) {
            a.appendChild(Qt(e, {
                    ceFn: n
            }));
    }), a);
}
const Jt = {
    replace: function (e) {
            const t = e[0];
            if (t.parentNode) if ((e[1].forEach(e => {
                    t.parentNode.insertBefore(Qt(e), t);
            }), null === t.getAttribute(ee) && ze.keepOriginalSource)) {
                    let e = DOCUMENT.createComment((function (e) {
                            let t = (" ").concat(e.outerHTML, " ");
                            return (t = ("").concat(t, "Font Awesome fontawesome.com "), t);
                    })(t));
                    t.parentNode.replaceChild(e, t);
            } else t.remove();
    },
    nest: function (e) {
            const t = e[0], n = e[1];
            if (~Pe(t).indexOf(ze.replacementClass)) return Jt.replace(e);
            const a = new RegExp(("").concat(ze.cssPrefix, "-.*"));
            if ((delete n[0].attributes.id, n[0].attributes.class)) {
                    const e = n[0].attributes.class.split(" ").reduce((e, t) => (t === ze.replacementClass || t.match(a) ? e.toSvg.push(t) : e.toNode.push(t), e), {
                            toNode: [],
                            toSvg: []
                    });
                    (n[0].attributes.class = e.toSvg.join(" "), 0 === e.toNode.length ? t.removeAttribute("class") : t.setAttribute("class", e.toNode.join(" ")));
            }
            const o = n.map(e => qe(e)).join("\n");
            (t.setAttribute(ee, ""), t.innerHTML = o);
    }
};
function Gt(e) {
    e();
}
function Zt(e, t) {
    const n = "function" == typeof t ? t : Ut;
    if (0 === e.length) n(); else {
            let t = Gt;
            (ze.mutateApproach === ie && (t = WINDOW.requestAnimationFrame || Gt), t(() => {
                    const t = true === ze.autoReplaceSvg ? Jt.replace : Jt[ze.autoReplaceSvg] || Jt.replace, a = Yt.begin("mutate");
                    (e.map(t), a(), n());
            }));
    }
}
let en = false;
function tn() {
    en = true;
}
function nn() {
    en = false;
}
let an = null;
function on(e) {
    if (!MutationObserverCtor || !ze.observeMutations) return;
    const {treeCallback: t = Ut, nodeCallback: n = Ut, pseudoElementsCallback: a = Ut, observeMutationsRoot: o = DOCUMENT} = e;
    (an = new MutationObserverCtor(e => {
            if (en) return;
            const o = pt();
            Ee(e).forEach(e => {
                    if (("childList" === e.type && e.addedNodes.length > 0 && !qt(e.addedNodes[0]) && (ze.searchPseudoElements && a(e.target), t(e.target)), "attributes" === e.type && e.target.parentNode && ze.searchPseudoElements && a(e.target.parentNode), "attributes" === e.type && qt(e.target) && ~ke.indexOf(e.attributeName))) if ("class" === e.attributeName && (function (e) {
                            const t = e.getAttribute ? e.getAttribute(ae) : null, n = e.getAttribute ? e.getAttribute(oe) : null;
                            return t && n;
                    })(e.target)) {
                            const {prefix: t, iconName: n} = bt(Pe(e.target));
                            (e.target.setAttribute(ae, t || o), n && e.target.setAttribute(oe, n));
                    } else (function (e) {
                            return e && e.classList && e.classList.contains && e.classList.contains(ze.replacementClass);
                    })(e.target) && n(e.target);
            });
    }), IS_DOM && an.observe(o, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
    }));
}
function rn(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            styleParser: true
    };
    const {iconName: n, prefix: a, rest: o} = (function (e) {
            const t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), a = void 0 !== e.innerText ? e.innerText.trim() : "";
            let o = bt(Pe(e));
            return (o.prefix || (o.prefix = pt()), t && n && (o.prefix = t, o.iconName = n), o.iconName && o.prefix || (o.prefix && a.length > 0 && (o.iconName = (function (e, t) {
                    return (rt[e] || ({}))[t];
            })(o.prefix, e.innerText) || ft(o.prefix, Qe(e.innerText))), !o.iconName && ze.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (o.iconName = e.firstChild.data)), o);
    })(e), r = (function (e) {
            const t = Ee(e.attributes).reduce((e, t) => ("class" !== e.name && "style" !== e.name && (e[t.name] = t.value), e), {}), n = e.getAttribute("title"), a = e.getAttribute("data-fa-title-id");
            return (ze.autoA11y && (n ? t["aria-labelledby"] = ("").concat(ze.replacementClass, "-title-").concat(a || Ne()) : (t["aria-hidden"] = "true", t.focusable = "false")), t);
    })(e), i = At("parseNodeAttributes", {}, e);
    let l = t.styleParser ? (function (e) {
            const t = e.getAttribute("style");
            let n = [];
            return (t && (n = t.split(";").reduce((e, t) => {
                    const n = t.split(":"), a = n[0], o = n.slice(1);
                    return (a && o.length > 0 && (e[a] = o.join(":").trim()), e);
            }, {})), n);
    })(e) : [];
    return _objectSpread({
            iconName: n,
            title: e.getAttribute("title"),
            titleId: e.getAttribute("data-fa-title-id"),
            prefix: a,
            transform: Se,
            mask: {
                    iconName: null,
                    prefix: null,
                    rest: []
            },
            maskId: null,
            symbol: false,
            extra: {
                    classes: o,
                    styles: l,
                    attributes: r
            }
    }, i);
}
const {styles: ln} = Ke;
function sn(e) {
    const t = "nest" === ze.autoReplaceSvg ? rn(e, {
            styleParser: false
    }) : rn(e);
    return ~t.extra.classes.indexOf(be) ? Mt("generateLayersText", e, t) : Mt("generateSvgReplacementMutation", e, t);
}
function cn(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    const n = DOCUMENT.documentElement.classList, a = e => n.add(("").concat(re, "-").concat(e)), o = e => n.remove(("").concat(re, "-").concat(e)), r = ze.autoFetchSvg ? [...B, ...U] : _.concat(Object.keys(ln));
    r.includes("fa") || r.push("fa");
    const i = [(".").concat(be, ":not([").concat(ee, "])")].concat(r.map(e => (".").concat(e, ":not([").concat(ee, "])"))).join(", ");
    if (0 === i.length) return Promise.resolve();
    let l = [];
    try {
            l = Ee(e.querySelectorAll(i));
    } catch {}
    if (!(l.length > 0)) return Promise.resolve();
    (a("pending"), o("complete"));
    const s = Yt.begin("onTree"), c = l.reduce((e, t) => {
            try {
                    const n = sn(t);
                    n && e.push(n);
            } catch (e) {
                    se || "MissingIcon" === e.name && console.error(e);
            }
            return e;
    }, []);
    return new Promise((e, n) => {
            Promise.all(c).then(n => {
                    Zt(n, () => {
                            (a("active"), a("complete"), o("pending"), "function" == typeof t && t(), s(), e());
                    });
            }).catch(e => {
                    (s(), n(e));
            });
    });
}
function un(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    sn(e).then(e => {
            e && Zt([e], t);
    });
}
function fn(e) {
    return function (t) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const a = (t || ({})).icon ? t : Ot(t || ({}));
            let {mask: o} = n;
            return (o && (o = (o || ({})).icon ? o : Ot(o || ({}))), e(a, _objectSpread(_objectSpread({}, n), {}, {
                    mask: o
            })));
    };
}
const dn = function (e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {transform: n = Se, symbol: a = false, mask: o = null, maskId: r = null, title: i = null, titleId: l = null, classes: s = [], attributes: c = {}, styles: u = {}} = t;
    if (!e) return;
    const {prefix: f, iconName: d, icon: m} = e;
    return Ft(_objectSpread({
            type: "icon"
    }, e), () => (zt("beforeDOMElementCreation", {
            iconDefinition: e,
            params: t
    }), ze.autoA11y && (i ? c["aria-labelledby"] = ("").concat(ze.replacementClass, "-title-").concat(l || Ne()) : (c["aria-hidden"] = "true", c.focusable = "false")), jt({
            icons: {
                    main: Dt(m),
                    mask: o ? Dt(o.icon) : {
                            found: false,
                            width: null,
                            height: null,
                            icon: {}
                    }
            },
            prefix: f,
            iconName: d,
            transform: _objectSpread(_objectSpread({}, Se), n),
            symbol: a,
            title: i,
            maskId: r,
            titleId: l,
            extra: {
                    attributes: c,
                    styles: u,
                    classes: s
            }
    })));
};
var mn = {
    mixout: () => ({
            icon: fn(dn)
    }),
    hooks: () => ({
            mutationObserverCallbacks: e => (e.treeCallback = cn, e.nodeCallback = un, e)
    }),
    provides(e) {
            (e.i2svg = function (e) {
                    const {node: t = DOCUMENT, callback: n = () => {}} = e;
                    return cn(t, n);
            }, e.generateSvgReplacementMutation = function (e, t) {
                    const {iconName: n, title: a, titleId: o, prefix: r, transform: i, symbol: l, mask: s, maskId: c, extra: u} = t;
                    return new Promise((t, f) => {
                            Promise.all([Xt(n, r), s.iconName ? Xt(s.iconName, s.prefix) : Promise.resolve({
                                    found: false,
                                    width: 512,
                                    height: 512,
                                    icon: {}
                            })]).then(s => {
                                    let [f, d] = s;
                                    t([e, jt({
                                            icons: {
                                                    main: f,
                                                    mask: d
                                            },
                                            prefix: r,
                                            iconName: n,
                                            transform: i,
                                            symbol: l,
                                            maskId: c,
                                            title: a,
                                            titleId: o,
                                            extra: u,
                                            watchable: true
                                    })]);
                            }).catch(f);
                    });
            }, e.generateAbstractIcon = function (e) {
                    let {children: t, attributes: n, main: a, transform: o, styles: r} = e;
                    const i = je(r);
                    let l;
                    return (i.length > 0 && (n.style = i), _e(o) && (l = Mt("generateAbstractTransformGrouping", {
                            main: a,
                            transform: o,
                            containerWidth: a.width,
                            iconWidth: a.width
                    })), t.push(l || a.icon), {
                            children: t,
                            attributes: n
                    });
            });
    }
}, pn = {
    mixout: () => ({
            layer(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const {classes: n = []} = t;
                    return Ft({
                            type: "layer"
                    }, () => {
                            zt("beforeDOMElementCreation", {
                                    assembler: e,
                                    params: t
                            });
                            let a = [];
                            return (e(e => {
                                    Array.isArray(e) ? e.map(e => {
                                            a = a.concat(e.abstract);
                                    }) : a = a.concat(e.abstract);
                            }), [{
                                    tag: "span",
                                    attributes: {
                                            class: [("").concat(ze.cssPrefix, "-layers"), ...n].join(" ")
                                    },
                                    children: a
                            }]);
                    });
            }
    })
}, gn = {
    mixout: () => ({
            counter(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const {title: n = null, classes: a = [], attributes: o = {}, styles: r = {}} = t;
                    return Ft({
                            type: "counter",
                            content: e
                    }, () => (zt("beforeDOMElementCreation", {
                            content: e,
                            params: t
                    }), (function (e) {
                            const {content: t, title: n, extra: a} = e, o = _objectSpread(_objectSpread(_objectSpread({}, a.attributes), n ? {
                                    title: n
                            } : {}), {}, {
                                    class: a.classes.join(" ")
                            }), r = je(a.styles);
                            r.length > 0 && (o.style = r);
                            const i = [];
                            return (i.push({
                                    tag: "span",
                                    attributes: o,
                                    children: [t]
                            }), n && i.push({
                                    tag: "span",
                                    attributes: {
                                            class: "sr-only"
                                    },
                                    children: [n]
                            }), i);
                    })({
                            content: e.toString(),
                            title: n,
                            extra: {
                                    attributes: o,
                                    styles: r,
                                    classes: [("").concat(ze.cssPrefix, "-layers-counter"), ...a]
                            }
                    })));
            }
    })
}, hn = {
    mixout: () => ({
            text(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const {transform: n = Se, title: a = null, classes: o = [], attributes: r = {}, styles: i = {}} = t;
                    return Ft({
                            type: "text",
                            content: e
                    }, () => (zt("beforeDOMElementCreation", {
                            content: e,
                            params: t
                    }), _t({
                            content: e,
                            transform: _objectSpread(_objectSpread({}, Se), n),
                            title: a,
                            extra: {
                                    attributes: r,
                                    styles: i,
                                    classes: [("").concat(ze.cssPrefix, "-layers-text"), ...o]
                            }
                    })));
            }
    }),
    provides(e) {
            e.generateLayersText = function (e, t) {
                    const {title: n, transform: a, extra: o} = t;
                    let r = null, i = null;
                    if (IS_IE) {
                            const t = parseInt(getComputedStyle(e).fontSize, 10), n = e.getBoundingClientRect();
                            (r = n.width / t, i = n.height / t);
                    }
                    return (ze.autoA11y && !n && (o.attributes["aria-hidden"] = "true"), Promise.resolve([e, _t({
                            content: e.innerHTML,
                            width: r,
                            height: i,
                            transform: a,
                            title: n,
                            extra: o,
                            watchable: true
                    })]));
            };
    }
};
const vn = new RegExp('"', "ug"), bn = [1105920, 1112319], yn = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {
    FontAwesome: {
            normal: "fas",
            400: "fas"
    }
}), {
    "Font Awesome 6 Free": {
            900: "fas",
            400: "far"
    },
    "Font Awesome 6 Pro": {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal",
            100: "fat"
    },
    "Font Awesome 6 Brands": {
            400: "fab",
            normal: "fab"
    },
    "Font Awesome 6 Duotone": {
            900: "fad",
            400: "fadr",
            normal: "fadr",
            300: "fadl",
            100: "fadt"
    },
    "Font Awesome 6 Sharp": {
            900: "fass",
            400: "fasr",
            normal: "fasr",
            300: "fasl",
            100: "fast"
    },
    "Font Awesome 6 Sharp Duotone": {
            900: "fasds",
            400: "fasdr",
            normal: "fasdr",
            300: "fasdl",
            100: "fasdt"
    }
}), {
    "Font Awesome 5 Free": {
            900: "fas",
            400: "far"
    },
    "Font Awesome 5 Pro": {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal"
    },
    "Font Awesome 5 Brands": {
            400: "fab",
            normal: "fab"
    },
    "Font Awesome 5 Duotone": {
            900: "fad"
    }
}), {
    "Font Awesome Kit": {
            400: "fak",
            normal: "fak"
    },
    "Font Awesome Kit Duotone": {
            400: "fakd",
            normal: "fakd"
    }
}), kn = Object.keys(yn).reduce((e, t) => (e[t.toLowerCase()] = yn[t], e), {}), xn = Object.keys(kn).reduce((e, t) => {
    const n = kn[t];
    return (e[t] = n[900] || [...Object.entries(n)][0][1], e);
}, {});
function wn(e, t) {
    const n = ("").concat(ne).concat(t.replace(":", "-"));
    return new Promise((a, o) => {
            if (null !== e.getAttribute(n)) return a();
            const r = Ee(e.children).filter(e => e.getAttribute(te) === t)[0], i = WINDOW.getComputedStyle(e, t), l = i.getPropertyValue("font-family"), s = l.match(ye), c = i.getPropertyValue("font-weight"), u = i.getPropertyValue("content");
            if (r && !s) return (e.removeChild(r), a());
            if (s && "none" !== u && "" !== u) {
                    const u = i.getPropertyValue("content");
                    let f = (function (e, t) {
                            const n = e.replace(/^['"]|['"]$/g, "").toLowerCase(), a = parseInt(t), o = isNaN(a) ? "normal" : a;
                            return (kn[n] || ({}))[o] || xn[n];
                    })(l, c);
                    const {value: d, isSecondary: m} = (function (e) {
                            const t = e.replace(vn, ""), n = (function (e, t) {
                                    const n = e.length;
                                    let a, o = e.charCodeAt(0);
                                    return o >= 55296 && o <= 56319 && n > 1 && (a = e.charCodeAt(1), a >= 56320 && a <= 57343) ? 1024 * (o - 55296) + a - 56320 + 65536 : o;
                            })(t), a = n >= bn[0] && n <= bn[1], o = 2 === t.length && t[0] === t[1];
                            return {
                                    value: Qe(o ? t[0] : t),
                                    isSecondary: a || o
                            };
                    })(u), p = s[0].startsWith("FontAwesome");
                    let g = ft(f, d), h = g;
                    if (p) {
                            const e = (function (e) {
                                    const t = lt[e], n = ft("fas", e);
                                    return t || (n ? {
                                            prefix: "fas",
                                            iconName: n
                                    } : null) || ({
                                            prefix: null,
                                            iconName: null
                                    });
                            })(d);
                            e.iconName && e.prefix && (g = e.iconName, f = e.prefix);
                    }
                    if (!g || m || r && r.getAttribute(ae) === f && r.getAttribute(oe) === h) a(); else {
                            (e.setAttribute(n, h), r && e.removeChild(r));
                            const i = {
                                    iconName: null,
                                    title: null,
                                    titleId: null,
                                    prefix: null,
                                    transform: Se,
                                    symbol: false,
                                    mask: {
                                            iconName: null,
                                            prefix: null,
                                            rest: []
                                    },
                                    maskId: null,
                                    extra: {
                                            classes: [],
                                            styles: {},
                                            attributes: {}
                                    }
                            }, {extra: l} = i;
                            (l.attributes[te] = t, Xt(g, f).then(o => {
                                    const r = jt(_objectSpread(_objectSpread({}, i), {}, {
                                            icons: {
                                                    main: o,
                                                    mask: gt()
                                            },
                                            prefix: f,
                                            iconName: h,
                                            extra: l,
                                            watchable: true
                                    })), s = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg");
                                    ("::before" === t ? e.insertBefore(s, e.firstChild) : e.appendChild(s), s.outerHTML = r.map(e => qe(e)).join("\n"), e.removeAttribute(n), a());
                            }).catch(o));
                    }
            } else a();
    });
}
function Ln(e) {
    return Promise.all([wn(e, "::before"), wn(e, "::after")]);
}
function Cn(e) {
    return !(e.parentNode === document.head || ~le.indexOf(e.tagName.toUpperCase()) || e.getAttribute(te) || e.parentNode && "svg" === e.parentNode.tagName);
}
function An(e) {
    if (IS_DOM) return new Promise((t, n) => {
            const a = Ee(e.querySelectorAll("*")).filter(Cn).map(Ln), o = Yt.begin("searchPseudoElements");
            (tn(), Promise.all(a).then(() => {
                    (o(), nn(), t());
            }).catch(() => {
                    (o(), nn(), n());
            }));
    });
}
var zn = {
    hooks: () => ({
            mutationObserverCallbacks: e => (e.pseudoElementsCallback = An, e)
    }),
    provides(e) {
            e.pseudoElements2svg = function (e) {
                    const {node: t = DOCUMENT} = e;
                    ze.searchPseudoElements && An(t);
            };
    }
};
let Mn = false;
var On = {
    mixout: () => ({
            dom: {
                    unwatch() {
                            (tn(), Mn = true);
                    }
            }
    }),
    hooks: () => ({
            bootstrap() {
                    on(At("mutationObserverCallbacks", {}));
            },
            noAuto() {
                    an && an.disconnect();
            },
            watch(e) {
                    const {observeMutationsRoot: t} = e;
                    Mn ? nn() : on(At("mutationObserverCallbacks", {
                            observeMutationsRoot: t
                    }));
            }
    })
};
const Sn = e => e.toLowerCase().split(" ").reduce((e, t) => {
    const n = t.toLowerCase().split("-"), a = n[0];
    let o = n.slice(1).join("-");
    if (a && "h" === o) return (e.flipX = true, e);
    if (a && "v" === o) return (e.flipY = true, e);
    if ((o = parseFloat(o), isNaN(o))) return e;
    switch (a) {
            case "grow":
                    e.size = e.size + o;
                    break;
            case "shrink":
                    e.size = e.size - o;
                    break;
            case "left":
                    e.x = e.x - o;
                    break;
            case "right":
                    e.x = e.x + o;
                    break;
            case "up":
                    e.y = e.y - o;
                    break;
            case "down":
                    e.y = e.y + o;
                    break;
            case "rotate":
                    e.rotate = e.rotate + o;
    }
    return e;
}, {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
});
var Rn = {
    mixout: () => ({
            parse: {
                    transform: e => Sn(e)
            }
    }),
    hooks: () => ({
            parseNodeAttributes(e, t) {
                    const n = t.getAttribute("data-fa-transform");
                    return (n && (e.transform = Sn(n)), e);
            }
    }),
    provides(e) {
            e.generateAbstractTransformGrouping = function (e) {
                    let {main: t, transform: n, containerWidth: a, iconWidth: o} = e;
                    const r = {
                            transform: ("translate(").concat(a / 2, " 256)")
                    }, i = ("translate(").concat(32 * n.x, ", ").concat(32 * n.y, ") "), l = ("scale(").concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), s = ("rotate(").concat(n.rotate, " 0 0)"), c = {
                            outer: r,
                            inner: {
                                    transform: ("").concat(i, " ").concat(l, " ").concat(s)
                            },
                            path: {
                                    transform: ("translate(").concat(o / 2 * -1, " -256)")
                            }
                    };
                    return {
                            tag: "g",
                            attributes: _objectSpread({}, c.outer),
                            children: [{
                                    tag: "g",
                                    attributes: _objectSpread({}, c.inner),
                                    children: [{
                                            tag: t.icon.tag,
                                            children: t.icon.children,
                                            attributes: _objectSpread(_objectSpread({}, t.icon.attributes), c.path)
                                    }]
                            }]
                    };
            };
    }
};
const Nn = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
};
function En(e) {
    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return (e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e);
}
function Pn(e) {
    return "g" === e.tag ? e.children : [e];
}
var Fn = {
    hooks: () => ({
            parseNodeAttributes(e, t) {
                    const n = t.getAttribute("data-fa-mask"), a = n ? bt(n.split(" ").map(e => e.trim())) : gt();
                    return (a.prefix || (a.prefix = pt()), e.mask = a, e.maskId = t.getAttribute("data-fa-mask-id"), e);
            }
    }),
    provides(e) {
            e.generateAbstractMask = function (e) {
                    let {children: t, attributes: n, main: a, mask: o, maskId: r, transform: i} = e;
                    const {width: l, icon: s} = a, {width: c, icon: u} = o, f = (function (e) {
                            let {transform: t, containerWidth: n, iconWidth: a} = e;
                            const o = {
                                    transform: ("translate(").concat(n / 2, " 256)")
                            }, r = ("translate(").concat(32 * t.x, ", ").concat(32 * t.y, ") "), i = ("scale(").concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), l = ("rotate(").concat(t.rotate, " 0 0)");
                            return {
                                    outer: o,
                                    inner: {
                                            transform: ("").concat(r, " ").concat(i, " ").concat(l)
                                    },
                                    path: {
                                            transform: ("translate(").concat(a / 2 * -1, " -256)")
                                    }
                            };
                    })({
                            transform: i,
                            containerWidth: c,
                            iconWidth: l
                    }), d = {
                            tag: "rect",
                            attributes: _objectSpread(_objectSpread({}, Nn), {}, {
                                    fill: "white"
                            })
                    }, m = s.children ? {
                            children: s.children.map(En)
                    } : {}, p = {
                            tag: "g",
                            attributes: _objectSpread({}, f.inner),
                            children: [En(_objectSpread({
                                    tag: s.tag,
                                    attributes: _objectSpread(_objectSpread({}, s.attributes), f.path)
                            }, m))]
                    }, g = {
                            tag: "g",
                            attributes: _objectSpread({}, f.outer),
                            children: [p]
                    }, h = ("mask-").concat(r || Ne()), v = ("clip-").concat(r || Ne()), b = {
                            tag: "mask",
                            attributes: _objectSpread(_objectSpread({}, Nn), {}, {
                                    id: h,
                                    maskUnits: "userSpaceOnUse",
                                    maskContentUnits: "userSpaceOnUse"
                            }),
                            children: [d, g]
                    }, y = {
                            tag: "defs",
                            children: [{
                                    tag: "clipPath",
                                    attributes: {
                                            id: v
                                    },
                                    children: Pn(u)
                            }, b]
                    };
                    return (t.push(y, {
                            tag: "rect",
                            attributes: _objectSpread({
                                    fill: "currentColor",
                                    "clip-path": ("url(#").concat(v, ")"),
                                    mask: ("url(#").concat(h, ")")
                            }, Nn)
                    }), {
                            children: t,
                            attributes: n
                    });
            };
    }
}, jn = {
    provides(e) {
            let t = false;
            (WINDOW.matchMedia && (t = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches), e.missingIconAbstract = function () {
                    const e = [], n = {
                            fill: "currentColor"
                    }, a = {
                            attributeType: "XML",
                            repeatCount: "indefinite",
                            dur: "2s"
                    };
                    e.push({
                            tag: "path",
                            attributes: _objectSpread(_objectSpread({}, n), {}, {
                                    d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
                            })
                    });
                    const o = _objectSpread(_objectSpread({}, a), {}, {
                            attributeName: "opacity"
                    }), r = {
                            tag: "circle",
                            attributes: _objectSpread(_objectSpread({}, n), {}, {
                                    cx: "256",
                                    cy: "364",
                                    r: "28"
                            }),
                            children: []
                    };
                    return (t || r.children.push({
                            tag: "animate",
                            attributes: _objectSpread(_objectSpread({}, a), {}, {
                                    attributeName: "r",
                                    values: "28;14;28;28;14;28;"
                            })
                    }, {
                            tag: "animate",
                            attributes: _objectSpread(_objectSpread({}, o), {}, {
                                    values: "1;0;1;1;0;1;"
                            })
                    }), e.push(r), e.push({
                            tag: "path",
                            attributes: _objectSpread(_objectSpread({}, n), {}, {
                                    opacity: "1",
                                    d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
                            }),
                            children: t ? [] : [{
                                    tag: "animate",
                                    attributes: _objectSpread(_objectSpread({}, o), {}, {
                                            values: "1;0;0;0;0;1;"
                                    })
                            }]
                    }), t || e.push({
                            tag: "path",
                            attributes: _objectSpread(_objectSpread({}, n), {}, {
                                    opacity: "0",
                                    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
                            }),
                            children: [{
                                    tag: "animate",
                                    attributes: _objectSpread(_objectSpread({}, o), {}, {
                                            values: "0;0;1;1;0;0;"
                                    })
                            }]
                    }), {
                            tag: "g",
                            attributes: {
                                    class: "missing"
                            },
                            children: e
                    });
            });
    }
};
!(function (e, t) {
    let {mixoutsTo: n} = t;
    (xt = e, wt = {}, Object.keys(Lt).forEach(e => {
            -1 === Ct.indexOf(e) && delete Lt[e];
    }), xt.forEach(e => {
            const t = e.mixout ? e.mixout() : {};
            if ((Object.keys(t).forEach(e => {
                    ("function" == typeof t[e] && (n[e] = t[e]), "object" == typeof t[e] && Object.keys(t[e]).forEach(a => {
                            (n[e] || (n[e] = {}), n[e][a] = t[e][a]);
                    }));
            }), e.hooks)) {
                    const t = e.hooks();
                    Object.keys(t).forEach(e => {
                            (wt[e] || (wt[e] = []), wt[e].push(t[e]));
                    });
            }
            e.provides && e.provides(Lt);
    }));
})([Be, mn, pn, gn, hn, zn, On, Rn, Fn, jn, {
    hooks: () => ({
            parseNodeAttributes(e, t) {
                    const n = t.getAttribute("data-fa-symbol"), a = null !== n && ("" === n || n);
                    return (e.symbol = a, e);
            }
    })
}], {
    mixoutsTo: FontAwesomeAPI
});
const _n = FontAwesomeAPI.config, In = FontAwesomeAPI.parse, Dn = FontAwesomeAPI.icon, Tn = FontAwesomeAPI.text;
function Xn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            (t && (a = a.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })), n.push.apply(n, a));
    }
    return n;
}
function Bn(e) {
    for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Xn(Object(n), true).forEach(function (t) {
                    Kn(e, t, n[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Xn(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
    }
    return e;
}
function Wn(e) {
    return (Wn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
    } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
}
function Kn(e, t, n) {
    return (((t = (function (e) {
            var t = (function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                            var a = n.call(e, "string");
                            if ("object" != typeof a) return a;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
            })(e);
            return "symbol" == typeof t ? t : t + "";
    })(t)) in e) ? Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
    }) : e[t] = n, e);
}
function Vn(e) {
    return (function (e) {
            if (Array.isArray(e)) return Yn(e);
    })(e) || (function (e) {
            if (typeof Symbol < "u" && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    })(e) || (function (e, t) {
            if (e) {
                    if ("string" == typeof e) return Yn(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    if (("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n)) return Array.from(e);
                    if ("Arguments" === n || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return Yn(e, t);
            }
    })(e) || (function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    })();
}
function Yn(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
}
var Un = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, qn = {
    exports: {}
};
!(function (e) {
    var t, n, a, o, r, i, l, s, c, u, f, d, m, p, g;
    (t = Un, n = function (e, t, a) {
            if (!s(t) || u(t) || f(t) || d(t) || l(t)) return t;
            var o, r = 0, i = 0;
            if (c(t)) for ((o = [], i = t.length); r < i; r++) o.push(n(e, t[r], a)); else for (var m in (o = {}, t)) Object.prototype.hasOwnProperty.call(t, m) && (o[e(m, a)] = n(e, t[m], a));
            return o;
    }, a = function (e) {
            return m(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, function (e, t) {
                    return t ? t.toUpperCase() : "";
            })).substr(0, 1).toLowerCase() + e.substr(1);
    }, o = function (e) {
            var t = a(e);
            return t.substr(0, 1).toUpperCase() + t.substr(1);
    }, r = function (e, t) {
            return (function (e, t) {
                    var n = (t = t || ({})).separator || "_", a = t.split || /(?=[A-Z])/;
                    return e.split(a).join(n);
            })(e, t).toLowerCase();
    }, i = Object.prototype.toString, l = function (e) {
            return "function" == typeof e;
    }, s = function (e) {
            return e === Object(e);
    }, c = function (e) {
            return "[object Array]" == i.call(e);
    }, u = function (e) {
            return "[object Date]" == i.call(e);
    }, f = function (e) {
            return "[object RegExp]" == i.call(e);
    }, d = function (e) {
            return "[object Boolean]" == i.call(e);
    }, m = function (e) {
            return (e -= 0) == e;
    }, p = function (e, t) {
            var n = t && ("process" in t) ? t.process : t;
            return "function" != typeof n ? e : function (t, a) {
                    return n(t, e, a);
            };
    }, g = {
            camelize: a,
            decamelize: r,
            pascalize: o,
            depascalize: r,
            camelizeKeys: function (e, t) {
                    return n(p(a, t), e);
            },
            decamelizeKeys: function (e, t) {
                    return n(p(r, t), e, t);
            },
            pascalizeKeys: function (e, t) {
                    return n(p(o, t), e);
            },
            depascalizeKeys: function () {
                    return this.decamelizeKeys.apply(this, arguments);
            }
    }, e.exports ? e.exports = g : t.humps = g);
})(qn);
var Hn = qn.exports, $n = ["class", "style"];
function Qn(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("string" == typeof e) return e;
    var o = (e.children || []).map(function (e) {
            return Qn(e);
    }), r = Object.keys(e.attributes || ({})).reduce(function (t, n) {
            var a = e.attributes[n];
            switch (n) {
                    case "class":
                            t.class = (function (e) {
                                    return e.split(/\s+/).reduce(function (e, t) {
                                            return (e[t] = true, e);
                                    }, {});
                            })(a);
                            break;
                    case "style":
                            t.style = (function (e) {
                                    return e.split(";").map(function (e) {
                                            return e.trim();
                                    }).filter(function (e) {
                                            return e;
                                    }).reduce(function (e, t) {
                                            var n = t.indexOf(":"), a = Hn.camelize(t.slice(0, n)), o = t.slice(n + 1).trim();
                                            return (e[a] = o, e);
                                    }, {});
                            })(a);
                            break;
                    default:
                            t.attrs[n] = a;
            }
            return t;
    }, {
            attrs: {},
            class: {},
            style: {}
    });
    n.class;
    var i = n.style, l = void 0 === i ? {} : i, s = (function (e, t) {
            if (null == e) return {};
            var n, a, o = (function (e, t) {
                    if (null == e) return {};
                    var n = {};
                    for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
                            if (t.indexOf(a) >= 0) continue;
                            n[a] = e[a];
                    }
                    return n;
            })(e, t);
            if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    for (a = 0; a < r.length; a++) (n = r[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
            }
            return o;
    })(n, $n);
    return h(e.tag, Bn(Bn(Bn({}, t), {}, {
            class: r.class,
            style: Bn(Bn({}, r.style), l)
    }, r.attrs), s), o);
}
var Jn = false;
try {
    Jn = true;
} catch {}
function Gn(e, t) {
    return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? Kn({}, e, t) : {};
}
function Zn(e) {
    return e && "object" === Wn(e) && e.prefix && e.iconName && e.icon ? e : In.icon ? In.icon(e) : null === e ? null : "object" === Wn(e) && e.prefix && e.iconName ? e : Array.isArray(e) && 2 === e.length ? {
            prefix: e[0],
            iconName: e[1]
    } : "string" == typeof e ? {
            prefix: "fas",
            iconName: e
    } : void 0;
}
/* ================================================================== */
/* ================  Font Awesome 官方 Vue 组件（洛谷引入）  ============  */
/*  FontAwesomeIcon：<FontAwesomeIcon :icon="..."/> 把图标定义渲染成 svg。 */
/*  下面两个 Layers 组件洛谷工具栏未使用，保留是为与原包一致（创建后丢弃）。*/
/*  FA 核心区内部助手（原名保留，作用如下）：                              */
/*    Zn=normalizeIconArgs（icon prop → {prefix,iconName,icon}）           */
/*    Gn=objectWithKey      Bn=objectSpread2   Kn=_defineProperty          */
/*    Vn=toArray            Qn=abstract→vnode 转换器                       */
/*    Jn="非IE"标志（为真才允许 console.error）                              */
/*    FontAwesomeAPI = FA 公开 api：.config/.parse/.icon/.text/.library     */
/* ================================================================== */
const FontAwesomeIcon = defineComponent({
    name: "FontAwesomeIcon",
    props: {
        border: { type: Boolean, default: false },
        fixedWidth: { type: Boolean, default: false },
        flip: {
            type: [Boolean, String],
            default: false,
            validator: function (val) {
                return [true, false, "horizontal", "vertical", "both"].indexOf(val) > -1
            }
        },
        icon: { type: [Object, Array, String], required: true },
        mask: { type: [Object, Array, String], default: null },
        maskId: { type: String, default: null },
        listItem: { type: Boolean, default: false },
        pull: {
            type: String,
            default: null,
            validator: function (val) {
                return ["right", "left"].indexOf(val) > -1
            }
        },
        pulse: { type: Boolean, default: false },
        rotation: {
            type: [String, Number],
            default: null,
            validator: function (val) {
                return [90, 180, 270].indexOf(Number.parseInt(val, 10)) > -1
            }
        },
        swapOpacity: { type: Boolean, default: false },
        size: {
            type: String,
            default: null,
            validator: function (val) {
                return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(val) > -1
            }
        },
        spin: { type: Boolean, default: false },
        transform: { type: [String, Object], default: null },
        symbol: { type: [Boolean, String], default: false },
        title: { type: String, default: null },
        titleId: { type: String, default: null },
        inverse: { type: Boolean, default: false },
        bounce: { type: Boolean, default: false },
        shake: { type: Boolean, default: false },
        beat: { type: Boolean, default: false },
        fade: { type: Boolean, default: false },
        beatFade: { type: Boolean, default: false },
        flash: { type: Boolean, default: false },
        spinPulse: { type: Boolean, default: false },
        spinReverse: { type: Boolean, default: false }
    },
    setup(props, ctx) {
        var attrs = ctx.attrs;
        // icon prop → 图标定义
        const iconDefinition = computed((function () {
            return Zn(props.icon)
        })),
            // 由 props 推导 class 列表（fa-spin / fa-fw / fa-2x …）
            classList = computed((function () {
                return Gn("classes", function (p) {
                    var obj, cls = (Kn(Kn(Kn(Kn(Kn(Kn(Kn(Kn(Kn(Kn(obj = {
                        "fa-spin": p.spin,
                        "fa-pulse": p.pulse,
                        "fa-fw": p.fixedWidth,
                        "fa-border": p.border,
                        "fa-li": p.listItem,
                        "fa-inverse": p.inverse,
                        "fa-flip": true === p.flip,
                        "fa-flip-horizontal": "horizontal" === p.flip || "both" === p.flip,
                        "fa-flip-vertical": "vertical" === p.flip || "both" === p.flip
                    }, "fa-".concat(p.size), null !== p.size), "fa-rotate-".concat(p.rotation), null !== p.rotation), "fa-pull-".concat(p.pull), null !== p.pull),
                        "fa-swap-opacity", p.swapOpacity), "fa-bounce", p.bounce), "fa-shake", p.shake), "fa-beat", p.beat), "fa-fade", p.fade), "fa-beat-fade", p.beatFade),
                        "fa-flash", p.flash), Kn(Kn(obj, "fa-spin-pulse", p.spinPulse), "fa-spin-reverse", p.spinReverse));
                    return Object.keys(cls).map(function (k) {
                        return cls[k] ? k : null
                    }).filter(function (k) {
                        return k
                    })
                }(props))
            })),
            transform = computed((function () {
                return Gn("transform", "string" == typeof props.transform ? In.transform(props.transform) : props.transform)   // In = FontAwesomeAPI.parse
            })),
            mask = computed((function () {
                return Gn("mask", Zn(props.mask))
            })),
            // 调 FA 核心 icon() 生成 SVG 抽象节点
            renderedIcon = computed((function () {
                return Dn(iconDefinition.value, Bn(Bn(Bn(Bn({}, classList.value), transform.value), mask.value), {}, {   // Dn = FontAwesomeAPI.icon
                    symbol: props.symbol,
                    title: props.title,
                    titleId: props.titleId,
                    maskId: props.maskId
                }))
            }));
        watch(renderedIcon, (function (val) {
            if (!val) return function () {
                var c;
                !Jn && console && "function" == typeof console.error && (c = console).error.apply(c, arguments)
            }("Could not find one or more icon(s)", iconDefinition.value, mask.value)
        }), {
            immediate: true
        });
        // FA 抽象节点 → Vue VNode
        const vnode = computed((function () {
            return renderedIcon.value ? Qn(renderedIcon.value.abstract[0], {}, attrs) : null
        }));
        return function () {
            return vnode.value
        }
    }
});
defineComponent({                        // FontAwesomeLayers —— 洛谷未使用
    name: "FontAwesomeLayers",
    props: {
        fixedWidth: { type: Boolean, default: false }
    },
    setup(props, ctx) {
        var slots = ctx.slots,
            familyPrefix = _n.familyPrefix;             // _n = FontAwesomeAPI.config
        const layerClass = computed((function () {
            return ["".concat(familyPrefix, "-layers")].concat(Vn(props.fixedWidth ? ["".concat(familyPrefix, "-fw")] : []))
        }));
        return function () {
            return h("div", {
                class: layerClass.value
            }, slots.default ? slots.default() : [])
        }
    }
}), defineComponent({                        // FontAwesomeLayersText —— 洛谷未使用
    name: "FontAwesomeLayersText",
    props: {
        value: { type: [String, Number], default: "" },
        transform: { type: [String, Object], default: null },
        counter: { type: Boolean, default: false },
        position: {
            type: String,
            default: null,
            validator: function (val) {
                return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(val) > -1
            }
        }
    },
    setup(props, ctx) {
        var attrs = ctx.attrs,
            familyPrefix = _n.familyPrefix;
        const classes = computed((function () {
            return Gn("classes", [].concat(Vn(props.counter ? ["".concat(familyPrefix, "-layers-counter")] : []), Vn(props.position ? ["".concat(familyPrefix, "-layers-").concat(props.position)] : [])))
        })),
            transform = computed((function () {
                return Gn("transform", "string" == typeof props.transform ? In.transform(props.transform) : props.transform)
            })),
            abstract = computed((function () {
                var nodes = Tn(props.value.toString(), Bn(Bn({}, transform.value), classes.value)).abstract;   // Tn = FontAwesomeAPI.text
                return props.counter && (nodes[0].attributes.class = nodes[0].attributes.class.replace("fa-layers-text", "")), nodes[0]
            })),
            vnode = computed((function () {
                return Qn(abstract.value, {}, attrs)
            }));
        return function () {
            return vnode.value
        }
    }
});

/* ================================================================== */
/* 问号兜底图标：原站工具栏的 help/format 按钮复用它（图标表见
 * toolbar-icons.js，此处只提供这一枚数据）。                            */
/* ================================================================== */
const fallbackQuestionIcon = {
    prefix: "far",
    iconName: "circle-question",
    icon: [512, 512, [62108, "question-circle"], "f059", "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]
};

export { FontAwesomeIcon, fallbackQuestionIcon };
