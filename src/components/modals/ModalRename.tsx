import { Form, Input, InputRef, Modal, ModalProps } from 'antd'
import { ApiMenuData } from '../ApiMenu'
import { create, useModal } from '@ebay/nice-modal-react'
import { useEffect, useRef } from 'react'
import { useGlobalContext } from '@/contexts/global'

interface ModalRenameProps extends Omit<ModalProps, 'open' | 'onOk'> {
  formData?: Pick<ApiMenuData, 'id' | 'name'>
}

type FormData = Pick<ApiMenuData, 'id' | 'name'>

export const ModalRename = create(({ formData, ...props }: ModalRenameProps) => {
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

  const inputRef = useRef<InputRef>(null)

  return (
    <Modal
      title="重命名"
      {...props}
      afterOpenChange={(...params) => {
        props.afterOpenChange?.(...params)

        const opened = params.at(0)

        if (opened) {
          inputRef.current?.select()
        }
      }}
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

        <Form.Item label="名称" name="id" rules={[{ required: true }]}>
          <Input ref={inputRef} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
