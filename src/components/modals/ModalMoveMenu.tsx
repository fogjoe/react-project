import { MenuItemType } from '@/enums'
import { Form, Input, Modal, ModalProps } from 'antd'
import { ApiMenuData } from '../ApiMenu'
import { create, useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import { useGlobalContext } from '@/contexts/global'
import { SelectorCatalog } from '../SelectorCatalog'

interface ModalMoveMenuProps extends Omit<ModalProps, 'open' | 'onOk'> {
  menuItemType?: MenuItemType
  formData?: Pick<ApiMenuData, 'id' | 'parentId'>
}

type FormData = Pick<ApiMenuData, 'id' | 'parentId'>

export const ModalMoveMenu = create(({ menuItemType, formData, ...props }: ModalMoveMenuProps) => {
  const modal = useModal()

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [form, formData])

  const { updateMenuItem } = useGlobalContext()

  const handleHide = () => {
    form.resetFields()
    modal.hide()
  }

  return (
    <Modal
      title="移动到..."
      {...props}
      open={modal.visible}
      onCancel={(...params) => {
        props.onCancel?.(...params)
        handleHide()
      }}
      onOk={() => {
        form.validateFields().then(values => {
          updateMenuItem(values)
          handleHide()
        })
      }}
    >
      <Form<FormData> form={form} layout="vertical">
        <Form.Item hidden noStyle name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="目标目录" name="parentId" rules={[{ required: true }]}>
          <SelectorCatalog
            placeholder="移动到..."
            type={
              menuItemType === MenuItemType.ApiDetail
                ? MenuItemType.ApiDetailFolder
                : menuItemType === MenuItemType.ApiSchema
                  ? MenuItemType.ApiSchemaFolder
                  : menuItemType}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
