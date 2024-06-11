import { Form, Input } from 'antd'
import React from 'react'
type InputFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
}
const InputForm = ({
  label,
  name,
  message,
  required = false,
}: InputFormType) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message || 'Please input your password!',
        },
      ]}
    >
      <Input className="w-full" />
    </Form.Item>
  )
}

export default InputForm
