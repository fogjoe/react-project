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

/** 判断是否为菜单文件夹类型。 */
export function isMenuFolder(type: MenuItemType): boolean {
  return type === MenuItemType.ApiDetailFolder || type === MenuItemType.ApiSchemaFolder || type === MenuItemType.RequestFolder
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

export function hasAccentColor(type: any): boolean {
  return type === MenuItemType.ApiDetail || type === MenuItemType.ApiSchema || type === MenuItemType.HttpRequest
}
