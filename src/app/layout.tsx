import type { Metadata, Viewport } from 'next'
import { App } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { getPageTitle } from '@/utils'

import '@/styles/global.css'

export const metadata: Metadata = {
  icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  title: getPageTitle(),
  authors: [{ name: '李卫泽 FogJoe', url: 'https://github.com/fogjoe' }],
  description: '使用 Next.js + Antd 仿制 Apifox',
  // the breif summary of this web
  manifest: '/manifest.webmanifest'
}

// the viewport obeject is only supported in Server Components
export const viewport: Viewport = {
  colorScheme: 'light'
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html className="h-full" lang="zh-Hans-CN">
      <body className="m-0 h-full">
        <AntdRegistry>
          <App>
            <main className="h-full text-red-500">{props.children}</main>
          </App>
        </AntdRegistry>
      </body>
    </html>
  )
}
