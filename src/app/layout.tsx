import type { Metadata, Viewport } from 'next'
import { App } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { getPageTitle } from '@/utils'
import { ThemeProviderClient } from '@/components/ThemeEditor'

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
          <App className='h-full'>
            <ThemeProviderClient autoSaveId="theme:persistence">
              <main className="h-full">{props.children}</main>
            </ThemeProviderClient>
          </App>
        </AntdRegistry>
      </body>
    </html>
  )
}
