import { CatalogType } from '@/enums'
import { TreeProps } from 'antd'
import { CatalogDataNode } from './ApiMenu.types'

const topMenus: CatalogType[] = [CatalogType.Overview, CatalogType.Http, CatalogType.Schema, CatalogType.Request, CatalogType.Recycle]

type GroupedMenu = Record<CatalogType, CatalogDataNode[]>

export interface MenuState {
  groupedMenus?: GroupedMenu
  menuTree: TreeProps['treeData']
}


export function useMenuData(): MenuState {
  /**
   * 简单的菜单数据，可以被序列化存储
   * 此处将从服务端获取到的菜单数据，按照符合菜单树组件的结构组装。
   */

  const groupedMenus: GroupedMenu | undefined = undefined

  const menuTree: TreeProps['treeData'] = []

  return {groupedMenus, menuTree}
}