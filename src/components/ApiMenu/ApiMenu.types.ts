import { MenuItemType } from '@/enums'
import { ApiDetails, ApiDoc, ApiFolder, ApiSchema } from '@/types'
import type { TreeProps } from 'antd'

export type CatalogId = string

export interface ApiMenuBase {
  id: CatalogId
  parentId?: ApiMenuBase['id']
  name: string
  type: MenuItemType
}

interface ApiMenuInterface extends ApiMenuBase {
  type: MenuItemType.ApiDetail
  data?: ApiDetails
}

interface ApiMenuInterfaceFolder extends ApiMenuBase {
  type: MenuItemType.ApiDetailFolder
  data?: ApiFolder
}

interface ApiMenuDoc extends ApiMenuBase {
  type: MenuItemType.Doc
  data?: ApiDoc
}

interface ApiMenuSchema extends ApiMenuBase {
  type: MenuItemType.ApiSchema | MenuItemType.ApiSchemaFolder
  data?: ApiSchema
}

interface ApiMenuRequest extends ApiMenuBase {
  type: MenuItemType.HttpRequest | MenuItemType.RequestFolder
  data?: ApiDetails
}

export type ApiMenuData =
  | ApiMenuInterface
  | ApiMenuSchema
  | ApiMenuDoc
  | ApiMenuRequest
  | ApiMenuInterfaceFolder



// treeData 是一个数组类型，但是我们只需要取到某一项的值类型
export type TreeDataNode = NonNullable<TreeProps['treeData']>[0]
export type CatalogDataNode = Omit<TreeDataNode, 'key'> & {
  key: string
  customData: {
    catalog: ApiMenuData
  }
  children: CatalogDataNode[]
}
