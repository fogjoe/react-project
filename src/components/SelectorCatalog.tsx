import { UseCatalogParams, useCatalog } from '@/hooks/useCatalog'
import { theme, type CascaderProps, Cascader, Divider } from 'antd'
import { ApiMenuBase } from './ApiMenu/ApiMenu.types'
import { useGlobalContext } from '@/contexts/global'
import { useMemo } from 'react'
import { findFolders } from '@/helpers'
import { group } from 'console'
import { ROOT_CATALOG } from '@/configs/static'
import { show } from '@ebay/nice-modal-react'
import { ModalNewCatalog } from './modals/ModalNewCatalog'

interface SelectorCatalogProps extends UseCatalogParams, Pick<CascaderProps, 'placeholder'> {
  value?: ApiMenuBase['parentId']
  onChange?: (value: SelectorCatalogProps['value']) => void
  hideCreateNew?: boolean
}

export function SelectorCatalog(props: SelectorCatalogProps) {
  const { token } = theme.useToken()

  const { value, onChange, type, exclude, hideCreateNew, ...rest } = props

  const { menuRawList } = useGlobalContext()
  const { catalogOptions } = useCatalog({ type, exclude })

  const internalValue = useMemo(() => {
    if (menuRawList && value) {
      const group = findFolders(menuRawList, [], value).map(({ id }) => id)
      return group.length > 0 ? group : [ROOT_CATALOG]
    }
  }, [value, menuRawList])

  return (
    <Cascader
      {...rest}
      showSearch
      allowClear={false}
      dropdownRender={
        hideCreateNew
          ? undefined
          : menus => {
              return (
                <>
                  {menus}

                  <Divider style={{ margin: 0 }} />

                  <div
                    className="inline-flex cursor-pointer p-2"
                    style={{ color: token.colorPrimary }}
                    onClick={() => {
                      if (type) {
                        show(ModalNewCatalog, {
                          formData: {
                            parentId: ROOT_CATALOG,
                            type
                          }
                        })
                      }
                    }}
                  >
                    新建目录
                  </div>
                </>
              )
            }
      }
      expandTrigger='hover'
      options={catalogOptions}
      value={internalValue}
      onChange={(value) => { 
        const lastOne = value.at(-1)

        if (typeof lastOne === 'string') {
          onChange?.(lastOne)
        }
      }}
    />
  )
}
