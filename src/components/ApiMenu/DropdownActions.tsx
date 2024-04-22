import { DropDownProps, Dropdown, MenuProps, theme } from 'antd'
import { ApiMenuData } from '.'
import React from 'react'
import { useGlobalContext } from '@/contexts/global'
import { useHelpers } from '@/hooks/useHelpers'
import { API_MENU_CONFIG } from '@/configs/static'
import { getCatalogType, getCreateType } from '@/helpers'
import { CopyIcon, FilePlusIcon, FolderInputIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { show } from '@ebay/nice-modal-react'
import { ModalRename } from '../modals/ModalRename'
import { nanoid } from 'nanoid'
import { ModalMoveMenu } from '../modals/ModalMoveMenu'
import { FileIcon } from '../icons/FileIcon'
import { ModalNewCatalog } from '../modals/ModalNewCatalog'
import { MenuItemType } from '@/enums'

interface DropdownActionsProps extends DropDownProps {
  catalog: ApiMenuData
  isFolder?: boolean
}

/**
 *
 * 菜单的操作
 */
export function DropdownActions(props: React.PropsWithChildren<DropdownActionsProps>) {
  const { token } = theme.useToken()

  const { children, catalog, isFolder = false, ...dropdownProps } = props

  const { modal, addMenuItem, removeMenuItem } = useGlobalContext()
  const { createTableItem } = useHelpers()

  const { tipTitle } = API_MENU_CONFIG[getCatalogType(catalog.type)]
  const createType = getCreateType(catalog.type)

  const commanActionMenuItems: MenuProps['items'] = [
    {
      key: 'rename',
      label: '重命名',
      icon: <PencilIcon size={14} />,
      onClick: event => {
        event.domEvent.stopPropagation()

        show(ModalRename, {
          formData: { id: catalog.id, name: catalog.name }
        })
      }
    },
    {
      key: 'copy',
      label: '复制',
      icon: <CopyIcon size={14} />,
      onClick: event => {
        event.domEvent.stopPropagation()

        addMenuItem({ ...catalog, id: nanoid(6) })
      }
    },
    {
      key: 'move',
      label: '移动到',
      icon: <FolderInputIcon size={14} />,
      onClick: event => {
        event.domEvent.stopPropagation()

        show(ModalMoveMenu, {
          menuItemType: catalog.type,
          formData: { id: catalog.id }
        })
      }
    }
  ]

  const folderActionMenu: MenuProps['items'] = [
    {
      key: 'create',
      label: tipTitle,
      icon: <FileIcon size={14} style={{ color: token.colorPrimary }} type={createType} />,
      onClick: (event) => {
        event.domEvent.stopPropagation()
        createTableItem(createType)
      }
    },

    { type: 'divider' },

    ...commanActionMenuItems,

    { type: 'divider' },

    {
      key: 'new',
      label: '添加子目录',
      icon: <FilePlusIcon size={14} />,
      onClick: (event) => {
        event.domEvent.stopPropagation()

        show(ModalNewCatalog, {
          formData: { parentId: catalog.id, type: catalog.type }
        })
      }
    },

    { type: 'divider' },

    {
      key: 'delete',
      label: '删除',
      icon: <TrashIcon size={14} />,
      onClick: (event) => {
        event.domEvent.stopPropagation()

        modal.confirm({
          title: <span className='font-normal'>删除目录“{catalog.name}”?</span>,
          content: `${catalog.type === MenuItemType.ApiDetailFolder
            ? '该目录及该目录下的接口和用例都'
            : catalog.type === MenuItemType.ApiSchemaFolder
              ? '该目录及该目录下的数据模型都'
              : ''
            }将移至回收站，30 天后自动彻底清除。`,
          okText: '删除',
          okButtonProps: { danger: true },
          maskClosable: true,
          onOk: () => {
            removeMenuItem({ id: catalog.id })
          }
        })
      }
    }
  ]

  const fileActionMenu: MenuProps['items'] = [
    ...commanActionMenuItems,

    { type: 'divider' },

    {
      key: 'delete',
      label: '删除',
      onClick: (event) => {
        event.domEvent.stopPropagation()

        const { title } = API_MENU_CONFIG[getCatalogType(catalog.type)]

        modal.confirm({
          title: <span className='font-normal'>
            删除{title}“{catalog.name}”?
          </span>,
          content: `${catalog.type === MenuItemType.ApiDetail
            ? '该接口和该接口下的用例都'
            : catalog.type === MenuItemType.Doc
              ? '文档'
              : catalog.type === MenuItemType.ApiSchema
                ? '该数据模型'
                : ''
            }将移至回收站，30 天后自动彻底清除。`,
          okText: '删除',
          okButtonProps: { danger: true },
          maskClosable: true,
          onOk: () => {
            removeMenuItem({ id: catalog.id })
          }
        })
      }
    }
  ]

  return <Dropdown menu={{ items: isFolder ? folderActionMenu : fileActionMenu }} {...dropdownProps}>{children}</Dropdown>
}
