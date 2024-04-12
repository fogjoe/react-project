import { CatalogType, MenuItemType } from '@/enums'
import { TreeProps } from 'antd'
import { ApiMenuData, CatalogDataNode } from './ApiMenu.types'
import { useGlobalContext } from '@/contexts/global'
import { useMemo } from 'react'
import { getCatalogType, hasAccentColor, isMenuFolder } from '@/helpers'
import { API_MENU_CONFIG } from '@/configs/static'
import { FileIcon } from '../icons/FileIcon'
import { FolderClosedIcon, FolderOpenIcon } from 'lucide-react'
import { HttpMethodText } from '../icons/HttpMethodText'

const topMenus: CatalogType[] = [CatalogType.Overview, CatalogType.Http, CatalogType.Schema, CatalogType.Request, CatalogType.Recycle]

type GroupedMenu = Record<CatalogType, CatalogDataNode[]>

export interface MenuState {
  groupedMenus?: GroupedMenu
  menuTree: TreeProps['treeData']
}

export function useMenuData(): MenuState {
  const { menuRawList, menuSearchWord, apiDetailDisplay } = useGlobalContext()

  /**
   * 简单的菜单数据，可以被序列化存储
   * 此处将从服务端获取到的菜单数据，按照符合菜单树组件的结构组装。
   */
  const menus: CatalogDataNode[] | undefined = useMemo(() => {
    const menuList = menuSearchWord ? menuRawList?.filter(({ name }) => name.includes(menuSearchWord)) : menuRawList

    return menuList?.map<CatalogDataNode>(item => {
      const isLeaf = !isMenuFolder(item.type)

      return {
        key: item.id,
        title: item.name,
        isLeaf,
        customData: { catalog: item }
      }
    })
  }, [menuRawList, menuSearchWord])

  /**
   * 包含交互组件（即 React 组件）的菜单数据，需要传入到菜单树组件中使用
   * 注意：render prop 字段需要使用函数形式，否则会导致 deepClone 失败
   */
  const menusWithRender: CatalogDataNode[] | undefined = useMemo(() => {
    menus?.map(item => {
      const catalog = item.customData.catalog
      const isHttp = catalog.type === MenuItemType.ApiDetail || catalog.type === MenuItemType.HttpRequest

      return {
        ...item,
        icon: ({ expanded }: { expanded: boolean }) => {
          if (item.isLeaf) {
            if (isHttp) {
              return (
                <span className="mr-1 inline-block w-[29px] whitespace-nowrap text-left text-xs/none font-semibold">
                  <HttpMethodText />
                </span>
              )
            }

            const { accentColor } = API_MENU_CONFIG[getCatalogType(catalog.type)]

            return (
              <span className={`inline-block size-full items-center justify-center ${item.customData.catalog.type === MenuItemType.ApiSchema ? 'text-blue-500' : ''}`}>
                <FileIcon size={15} style={{ color: hasAccentColor(catalog.type) ? accentColor : undefined }} type={catalog.type} />
              </span>
            )
          }

          return <span className="flex h-full items-center">{expanded ? <FolderOpenIcon size={14} /> : <FolderClosedIcon size={14} />}</span>
        },
        className: item.isLeaf ? 'leaf-node' : undefined
      }
    })
  }, [menus, apiDetailDisplay])

  const groupedMenus: GroupedMenu | undefined = undefined

  const menuTree: TreeProps['treeData'] = []

  return { groupedMenus, menuTree }
}
