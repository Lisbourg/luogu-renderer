/* 视频嵌入与站内链接
 * 1. bilibiliSrcFix：![xxx](bilibili:av170001) → alt="video" + src=bilibili://
 *    （打标 + 规范化协议，真正的 iframe 由 videoEmbed 生成）
 * 2. videoEmbed：alt="video" + bilibili:// 协议 → B 站官方播放器 <iframe>；
 *                alt="video" + https 直链（.mp4/.mov）→ 原生 <video controls>。
 * 3. luoguUserLinks：luogu://user/<uid> 站内链接 → /user/<uid>
 *    （只处理前面是 @ 的场景之外的一般站内链接；@提及在 remark 阶段已处理） */
import { visit, parseUrl } from '../../bridge/remark.js';

export function bilibiliSrcFix() {
  return (tree) => visit(tree, 'element', (element) => {
    if (element.tagName !== 'img' || !element.properties) return;
    const src = element.properties.src;
    if (typeof src === 'string' && src.startsWith('bilibili:') && parseUrl(src).protocol === 'bilibili') {
      element.properties.alt = 'video';
      element.properties.src = src.replace('bilibili:', 'bilibili://');
    }
  });
}

export function videoEmbed() {
  return (tree) => visit(tree, 'element', (element) => {
    if (element.tagName !== 'img' || !element.properties) return;
    if (element.properties.alt !== 'video') return;
    const src = element.properties.src;
    if (typeof src !== 'string') return;
    const parsed = parseUrl(src);

    if (parsed.protocol === 'bilibili') {
      const query = parsed.query;
      const playerParams = { danmaku: '0', autoplay: '0', playlist: '0', muted: '0' };
      const host = parsed.host; // av170001 / BV1xx / bv1xx
      const avMatch = host.match(/^(av)?(\d+)$/);
      if (avMatch) {
        playerParams.aid = avMatch[2];
      } else if (host.substring(0, 2).toLowerCase() !== 'bv') {
        playerParams.bvid = 'BV' + host;
      } else {
        playerParams.bvid = host;
      }
      const pageNo = Number(query.page || '');
      if (pageNo) playerParams.page = String(pageNo);
      const t = Number(query.t || '');
      if (t) playerParams.t = String(t);

      element.tagName = 'div';
      element.properties.style = 'position: relative; padding-bottom: 62.5%';
      element.children = [{
        type: 'element',
        tagName: 'iframe',
        properties: {
          src: 'https://player.bilibili.com/player.html?' + serializeParams(playerParams),
          scrolling: 'no',
          border: 0,
          frameborder: 'no',
          framespacing: 0,
          allowfullscreen: true,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
        },
        children: [],
      }];
    } else if (parsed.protocol === 'https') {
      if (!parsed.pathname.endsWith('.mp4') && !parsed.pathname.endsWith('.mov')) return;
      element.tagName = 'video';
      element.properties.src = src;
      element.properties.controls = true;
      element.properties.style = 'width: 100%; height: 100%;';
    }
  });
}

/* 播放器参数序列化：跳过 undefined 值，键值各做一次 URL 编码 */
function serializeParams(params) {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map((entry) => entry.map((part) => encodeURIComponent(String(part))).join('=').replace(/=$/, ''))
    .join('&');
}

export function luoguUserLinks() {
  return (tree) => visit(tree, { tagName: 'a' }, (anchor, index, parent) => {
    if (index === 0 || anchor.children.length === 0 || !anchor.properties) return;
    const prevNode = parent.children[index - 1];
    if (!prevNode || !prevNode.value || !prevNode.value.endsWith('@')) return;
    const href = anchor.properties.href;
    if (typeof href !== 'string' || !href.toLowerCase().startsWith('luogu://user/')) return;
    const uid = href.slice(13);
    if (!Number.isNaN(+uid)) anchor.properties.href = `/user/${uid}`;
  });
}
