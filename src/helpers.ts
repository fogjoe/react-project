import { ApiMenuData } from './components/ApiMenu'
import { CatalogType, MenuItemType } from './enums'

export function getCatalogType(type: MenuItemType): CatalogType {
  switch (type) {
    case MenuItemType.ApiDetail:
    case MenuItemType.ApiDetailFolder:
    case MenuItemType.Doc:
      return CatalogType.Http

    case MenuItemType.ApiSchema:
    case MenuItemType.ApiSchemaFolder:
      return CatalogType.Schema

    default:
      return CatalogType.Request
  }
}

/** 递归查找目标菜单的父级文件夹 */
export function findFolders(menuRawList: ApiMenuData[], folderMenus: ApiMenuData[], parentId: string): ApiMenuData[] {
  const res = menuRawList.find(item => item.id === parentId)

  if (res) {
    folderMenus.unshift(res)

    if (res.parentId) {
      return findFolders(menuRawList, folderMenus, res.parentId)
    }
  }
  return folderMenus
}
