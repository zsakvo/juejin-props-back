import { getShowTime } from "./time";

export function updateDoms() {
  const doms = document.querySelectorAll("[enter-method=item_display_feed]");
  for (let dom of doms) {
    if (dom.getAttribute("data-draft-citme") == "true") continue;
    if (dom.querySelector("li.date")) continue;
    const id = dom.getAttribute("data-entry-id")!;
    const props = window.__GLOBAL_RPOPS_MAPS__.get(id);
    // 广告是没有 id 的，直接跳过
    if (!props) continue;
    const { ctime } = props;
    const container = dom.querySelector(".action-list")!;
    container.appendChild(createTimeDom(ctime));
    // 标记更新，避免重复添加
    dom.setAttribute("data-draft-citme", String(true));
    // 移除属性缓存
    window.__GLOBAL_RPOPS_MAPS__.delete(id);
  }
}

function createTimeDom(ctime: string) {
  const ctimeString = getShowTime(ctime);
  const div = document.createElement("div");
  div.innerHTML = `<li data-v-3f4438ce="" class="item date">
  ${ctimeString}</li>`;
  return div.firstChild as HTMLElement;
}
