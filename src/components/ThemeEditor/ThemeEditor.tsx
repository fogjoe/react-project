import { Form, Radio, theme } from 'antd'
import { ThemeSetting } from '.'
import { defaultThemeSetting } from './theme-data'
import { ThemePicker } from './ThemePicker'
import { ThemeColorPicker } from './ThemeColorPicker'
import { ThemeRadiusPicker } from './ThemeRadiusPicker'
import { useEffect } from 'react'
import { storeThemeSetting } from './ThemeEditor.helper'

interface ThemeEditorProps {
  value?: ThemeSetting
  onChange?: (value: ThemeEditorProps['value']) => void
  autoSaveId?: string
}

export function ThemeEditor(props: ThemeEditorProps) {
  const { token } = theme.useToken()
  const { borderRadius } = token

  const { value, onChange, autoSaveId } = props

  const [form] = Form.useForm<ThemeSetting>()

  useEffect(() => {
    const newThemeSetting = { ...defaultThemeSetting, ...value, borderRadius }

    form.setFieldsValue(newThemeSetting)

    if (autoSaveId) {
      storeThemeSetting(autoSaveId, newThemeSetting)
    }
  }, [form, value, borderRadius, autoSaveId])

  return (
    <Form
      form={form}
      initialValues={value}
      labelCol={{ span: 3 }}
      wrapperCol={{ offset: 1, span: 20 }}
      onValuesChange={(_, newThemeSetting) => {
        onChange?.(newThemeSetting)
      }}
    >
      <Form.Item label="主题" name="themeMode">
        <ThemePicker />
      </Form.Item>
      <Form.Item label="主色" name="colorPrimary">
        <ThemeColorPicker />
      </Form.Item>
      <Form.Item label="圆角" name="borderRadius">
        <ThemeRadiusPicker />
      </Form.Item>
      <Form.Item label="页面空间" name="spaceType">
        <Radio.Group>
          <Radio value="default">适中</Radio>
          <Radio value="compact">紧凑</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  )
}
