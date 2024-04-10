'use client'

import { SideNav } from '@/components/SideNav'
import { theme } from 'antd'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'

export function HomeContent() {
  const { token } = theme.useToken()

  return (
    <div className="flex h-full" style={{ backgroundColor: token.colorBgContainer }}>
      <SideNav />

      <div className="relative w-full overflow-hidden"></div>
    </div>
  )
}

export function HomePage() {
  return (
    <NiceModalProvider>
      <HomeContent />
    </NiceModalProvider>
  )
}
