import "typed-query-selector";
import { injectFetch } from "./lib/fetch";

window.__GLOBAL_RPOPS_MAPS__ = new Map();

(() => {
  console.log(
    "%c掘金榜单属性添加工具",
    "color: white; background: #00a381; padding: 3px 8px; border-radius: 4px;"
  );
})();

injectFetch();
