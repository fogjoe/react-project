import { Form, Radio } from 'antd'
import { ThemeSetting } from '.'
import { ThemePicker } from './ThemePicker'
import { ThemeColorPicker } from './ThemeColorPicker'
import { ThemeRadiusPicker } from './ThemeRadiusPicker'

interface ThemeEditorProps {
  value?: ThemeSetting
  onChange?: (value: ThemeEditorProps['value']) => void
  autoSaveId?: string
}

export function ThemeEditor() {
  return (
    <Form>
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
