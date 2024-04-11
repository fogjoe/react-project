import { useLayoutContext } from '@/contexts/layout-settings'
import { Button, ButtonProps, Space } from 'antd'
import React from 'react'
import { IconText } from '../IconText'
import { ChevronLeftIcon, ChevronRightIcon, ShirtIcon } from 'lucide-react'
import { show } from '@ebay/nice-modal-react'
import { ModalSettings } from '../modals/ModalSettings'
import { GithubFilled } from '@ant-design/icons'

function SmallButton({ children, ...props }: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button size="small" type="text" {...props}>
      {children}
    </Button>
  )
}

export function FooterBar() {
  const { panelRef, isSideMenuCollapsed } = useLayoutContext()

  return (
    <div className="flex h-full items-center pl-3 pr-6">
      {isSideMenuCollapsed ? (
        <SmallButton
          onClick={() => {
            panelRef.current?.expand()
          }}
        >
          <IconText icon={<ChevronRightIcon size={18} />} />
        </SmallButton>
      ) : (
        <SmallButton
          onClick={() => {
            panelRef.current?.collapse()
          }}
        >
          <IconText icon={<ChevronLeftIcon size={18} />} />
        </SmallButton>
      )}

      <Space className='ml-auto flex items-center' size={0}>
        <SmallButton onClick={() => {
          show(ModalSettings)
        }}>
        <IconText icon={<ShirtIcon size={14} />} />
        </SmallButton>

        <SmallButton href='https://github.com/fogjoe/react-project' target='_blank'>
          <IconText icon={<GithubFilled size={14} />} />
        </SmallButton>
      </Space>
    </div>
  )
}
