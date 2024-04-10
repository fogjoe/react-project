import { Space, theme } from 'antd'
import { ThemeSetting } from '.'
import { presetRadius } from './theme-data'

interface ThemeRadiusPickerProps {
  value?: ThemeSetting['borderRadius']
  onChange?: (value: ThemeRadiusPickerProps['value']) => void
}

export function ThemeRadiusPicker(props: ThemeRadiusPickerProps) {
  const { token } = theme.useToken()

  const { value, onChange } = props

  return (
    <Space wrap size={token.paddingLG}>
      {presetRadius.map(radius => {
        const matched = radius === value

        return (
          <span
            key={radius}
            className={`relative inline-block size-12 overflow-hidden ${matched ? 'cursor-default' : 'cursor-pointer'}`}
            style={{
              backgroundColor: matched ? token.colorPrimary : token.colorBgLayout,
              borderRadius: token.borderRadius
            }}
            onClick={() => onChange?.(radius)}
          >
            <span
              className="absolute left-1/2 top-1/2 inline-block size-full scale-125"
              style={{
                borderRadius: radius,
                border: `2px solid ${matched ? token.colorPrimaryBgHover : token.colorBorder}`
              }}
            />
          </span>
        )
      })}
    </Space>
  )
}
