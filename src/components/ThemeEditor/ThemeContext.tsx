import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setTwoToneColor } from '@ant-design/icons'
import zhCN from 'antd/locale/zh_CN'
import { ThemeSetting } from '.'
import { ConfigProvider, theme } from 'antd'
import { presetThemes } from './theme-data'
import { restoreThemeSetting } from './ThemeEditor.helper'

const { darkAlgorithm, defaultAlgorithm, compactAlgorithm } = theme

interface ThemeContextData {
  themeSetting: ThemeSetting
  setThemeSetting: React.Dispatch<React.SetStateAction<ThemeSetting>>
  autoSaveId: string | undefined
  isDarkMode: boolean
}

const ThemeContext = createContext({} as ThemeContextData)

interface ThemeProviderProps {
  initialValue: ThemeSetting
  /**
   * 存储配置的 Key，即用户在设置里面选择的主题
   * 如果用户提供了，那么会将主题配置自动保存在本地，然后通过这个 Key 获取到相应的配置
   */
  autoSaveId?: ThemeContextData['autoSaveId']
}

export function ThemeProvider(props: React.PropsWithChildren<ThemeProviderProps>) {
  const { token } = theme.useToken()

  const { children, initialValue, autoSaveId } = props

  const [themeSetting, setThemeSetting] = useState<ThemeSetting>(initialValue)

  const { themeMode, colorPrimary, borderRadius, spaceType } = themeSetting

  const isDarkMode = themeMode === 'darkDefault'

  const algorithm = useMemo(() => {
    const algorithms = [isDarkMode ? darkAlgorithm : defaultAlgorithm]

    if (spaceType === 'compact') {
      algorithms.push(compactAlgorithm)
    }

    return algorithms
  }, [isDarkMode, spaceType])

  const themePresetTokens = useMemo(() => {
    const isDefaultTheme = themeMode === 'lightDefault' || themeMode === 'darkDefault'
    const token = presetThemes[themeMode].token
    return { ...token, ...(isDefaultTheme ? { colorPrimary, borderRadius } : {}) }
  }, [themeMode, colorPrimary, borderRadius])

  useEffect(() => {
    document.documentElement.setAttribute('theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    if (themePresetTokens.colorPrimary) {
      // 主色变更后，也要更新双色图标的主色。
      setTwoToneColor(themePresetTokens.colorPrimary)
    }
  }, [themePresetTokens.colorPrimary])

  return (
    <ThemeContext.Provider value={{ themeSetting, setThemeSetting, autoSaveId, isDarkMode }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm,
          token: { ...themePresetTokens },
          components: {
            Modal: { colorBgMask: isDarkMode ? token.colorBgMask : 'rgb(255 255 255 / 0.72)' },
            Tooltip:
              themeMode !== 'darkDefault'
                ? {
                    colorTextLightSolid: token.colorText,
                    colorBgSpotlight: token.colorBgContainer
                  }
                : undefined
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export function ThemeProviderClient(props: React.PropsWithChildren<Pick<ThemeProviderProps, 'autoSaveId'>>) {
  const { children, autoSaveId } = props

  const [themeSetting, setThemeSetting] = useState<ThemeSetting>()

  useEffect(() => {
    setThemeSetting(restoreThemeSetting(autoSaveId))
  }, [autoSaveId])

  // 等待获取到主题配置后再渲染，防止主题切换闪烁。
  // 下面初始值为必填选项，如果为空直接返回
  if (!themeSetting) {
    return null
  }

  return (
    <ThemeProvider autoSaveId={autoSaveId} initialValue={themeSetting}>
      {children}
    </ThemeProvider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
