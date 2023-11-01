import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayjs_plugin_relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(dayjs_plugin_relativeTime);
dayjs.locale("zh-cn");

export function getShowTime(ctime: string) {
  const ctimeDay = dayjs.unix(parseInt(ctime));
  return ctimeDay.fromNow();
}
