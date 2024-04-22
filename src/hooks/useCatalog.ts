import { ApiMenuData } from '@/components/ApiMenu'
import { ROOT_CATALOG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { MenuItemType } from '@/enums'
import { isMenuFolder } from '@/helpers'
import { CascaderProps } from 'antd'
import arrayToTree from 'array-to-tree'
import { useMemo } from 'react'

interface CatalogOption {
  value: string
  label: string
  disabled?: boolean
  children?: CatalogOption[]
}

type CascaderOptions = CascaderProps<CatalogOption>['options']

export interface UseCatalogParams {
  type?: MenuItemType
  exclude?: ApiMenuData['id'][]
}

export function useCatalog({ type, exclude }: UseCatalogParams): { catalogOptions: CascaderOptions } {
  const { menuRawList } = useGlobalContext()

  const catalogOptions = useMemo<CascaderOptions>(() => {
    const menuList = menuRawList
      ?.filter(item => item.type === type && isMenuFolder(item.type))
      .map(item => ({
        value: item.id,
        label: item.name,
        disabled: exclude?.includes(item.id),
        parentId: item.parentId
      }))

    return [
      {
        value: ROOT_CATALOG,
        label: '根目录'
      },
      ...(Array.isArray(menuList) ? arrayToTree(menuList, { customID: 'value', parentProperty: 'parentId' }) : [])
    ]
  }, [menuRawList, type, exclude])

  return { catalogOptions }
}
