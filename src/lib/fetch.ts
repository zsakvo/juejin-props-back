/**
 * 注入自定义的 fetch 方法
 * 拦截原本的 fetch 逻辑，在获取到排行榜单数据后，遍历必要的属性存储到全局 Map 池内。
 * 渲染的时候取出并删除相关属性即可。
 */

import { updateDoms } from "./dom";

export function injectFetch() {
  const oriFetch = window.fetch;
  window.fetch = async function (url: string, req: any) {
    const res = await oriFetch(url, req);
    const cr = res.clone();
    cr.json().then((res: any) => {
      if (url.includes("/recommend_api/v1/")) {
        const { data } = res;
        if (data instanceof Array) {
          data.forEach((item) => {
            const articleInfo =
              item["article_info"] || item["item_info"]["article_info"];
            if (articleInfo) {
              const { article_id, ctime } = articleInfo;
              window.__GLOBAL_RPOPS_MAPS__.set(article_id, { ctime });
            }
          });
        }
        updateDoms();
      }
    });
    return res;
  };
}
