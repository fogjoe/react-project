'use client'

import { SideNav } from '@/components/SideNav'
import { Button, ConfigProvider, Dropdown, Flex, Tooltip, theme } from 'antd'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { PanelGroup, Panel } from 'react-resizable-panels'
import { LayoutProvider, useLayoutContext } from '@/contexts/layout-settings'
import { InputSearch } from '@/components/InputSearch'
import { GlobalContextProvider } from '@/contexts/global'
import { IconText } from '@/components/IconText'
import { FilterIcon, PlusIcon } from 'lucide-react'
import { MenuItemType } from '@/enums'
import { API_MENU_CONFIG } from '@/configs/static'
import { getCatalogType } from '@/helper'
import { useHelpers } from '@/hooks/useHelpers'
import { FileIcon } from '@/components/icons/FileIcon'

export function HomeContent() {
  const { token } = theme.useToken()

  const { panelRef, isSideMenuCollapsed, setIsSideMenuCollapsed } = useLayoutContext()

  const { createTableItem } = useHelpers()

  return (
    <div className="flex h-full" style={{ backgroundColor: token.colorBgContainer }}>
      <SideNav />

      <div className="relative w-full overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel
            ref={panelRef}
            collapsible
            className="flex h-full flex-col overflow-hidden py-2"
            defaultSize={15}
            minSize={15}
            style={{ backgroundColor: token.colorFillAlter }}
            onCollapse={() => {
              setIsSideMenuCollapsed(true)
            }}
            onExpand={() => {
              setIsSideMenuCollapsed(false)
            }}
          >
            <Flex gap={token.paddingXXS} style={{ padding: token.paddingXS }}>
              <InputSearch />

              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      paddingInline: token.paddingXS,
                      defaultBg: token.colorFillTertiary,
                      defaultBorderColor: token.colorFillTertiary
                    }
                  }
                }}
              >
                <Tooltip title="显示筛选条件">
                  <Button>
                    <IconText icon={<FilterIcon size={16} />} />
                  </Button>
                </Tooltip>

                <Dropdown
                  menu={{
                    items: [
                      ...[MenuItemType.ApiDetail, MenuItemType.HttpRequest, MenuItemType.Doc, MenuItemType.ApiSchema].map(menuItem => {
                        const { newLabel } = API_MENU_CONFIG[getCatalogType(menuItem)]

                        return {
                          key: menuItem,
                          label: menuItem === MenuItemType.Doc ? '新建 MarkDown' : newLabel,
                          icon: <FileIcon size={16} style={{ color: token.colorPrimary }} type={menuItem} />,
                          onClick: () => {
                            createTableItem(menuItem)
                          }
                        }
                      })
                    ]
                  }}
                >
                  <Button type="primary">
                    <IconText icon={<PlusIcon size={16} />} />
                  </Button>
                </Dropdown>
              </ConfigProvider>
            </Flex>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <LayoutProvider>
      <GlobalContextProvider>
        <NiceModalProvider>
          <HomeContent />
        </NiceModalProvider>
      </GlobalContextProvider>
    </LayoutProvider>
  )
}
