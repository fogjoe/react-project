export const getPageTitle =(title?: string) => {
  const mainTitle = 'Apifox UI'

  return title ? `${title} - ${mainTitle}` : mainTitle
}

/** 移动数组元素 */
export function moveArrayItem<T>(arr: T[], fromIndex: number, toIndex: number) {
  // 先删除原位置上的元素
  const element = arr.splice(fromIndex, 1)[0]


  // 然后在指定位置插入该元素
  arr.splice(toIndex, 0, element)
}