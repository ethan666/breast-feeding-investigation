import dicts from "@/config/dicts";

export function getDictTitleByValue(value, dictType) {
  const obj = dicts[dictType];
  if (obj === undefined) {
    return "";
  }
  const dictItem = obj.find(item => item.value === Number(value));
  if (dictItem) {
    return dictItem.title;
  }
  return "";
}
