import { Input, InputProps, InputNumber, InputNumberProps } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
const { TextArea } = Input

const InputBase = styled(styled(Input)<Record<string, any>>``)`
  ${(props) =>
    props.$typeBtn === 1 &&
    css`
      border-radius: 0px !important;
      border: 0px !important;
      border-bottom: 2px solid #d9d9d9 !important;
      padding: 0px !important;
      &:focus,
      &:focus-within,
      &:hover {
        border: 0px !important;
        box-shadow: unset !important;
        border-bottom: 2px solid #8077ec !important;
      }
    `}
`

const InputPassword = styled(styled(Input.Password)<Record<string, any>>``)`
  ${(props) =>
    props.$typeBtn === 1 &&
    css`
      border-radius: 0px !important;
      border: 0px !important;
      border-bottom: 2px solid #d9d9d9 !important;
      padding: 0px !important;
      &:focus,
      &:focus-within,
      &:hover {
        border: 0px !important;
        box-shadow: unset !important;
        border-bottom: 2px solid #8077ec !important;
      }
    `}
`

const InputNumberBase = styled(styled(InputNumber)<Record<string, any>>``)`
  width: 100% !important;
  ${(props) =>
    props.$typeBtn === 1 &&
    css`
      border-radius: 0px !important;
      border: 0px !important;
      border-bottom: 2px solid #d9d9d9 !important;
      padding: 0px !important;
      &:focus,
      &:focus-within,
      &:hover {
        border: 0px !important;
        box-shadow: unset !important;
        border-bottom: 2px solid #8077ec !important;
      }
    `}
`

const InputArea = styled(styled(TextArea)<Record<string, any>>``)`
  ${(props) =>
    props.$typeBtn === 1 &&
    css`
      border-radius: 0px !important;
      border: 0px !important;
      border-bottom: 2px solid #d9d9d9 !important;
      padding: 0px !important;
      &:focus,
      &:focus-within,
      &:hover {
        border: 0px !important;
        box-shadow: unset !important;
        border-bottom: 2px solid #8077ec !important;
      }
    `}
`

type PropsType = {
  typeBtn?: 0 | 1
  type?: 'string' | 'area' | 'number' | 'password'
  rows?: number | 2
  onChangeText?: (value: string | number) => void
} & InputProps &
  InputNumberProps &
  TextAreaProps

const MyInput = ({
  typeBtn = 0,
  type = 'string',
  rows = 2,
  onChangeText = () => {},
  ...props
}: PropsType) => {
  const inputComponent = useMemo(() => {
    switch (type) {
      case 'string':
        return (
          <InputBase
            onChange={(e: any) => onChangeText(e.target.value.toString())}
            $typeBtn={typeBtn}
            {...props}
          />
        )

      case 'number':
        return (
          <InputNumberBase
            onChange={(e: any) => onChangeText(e)}
            $typeBtn={typeBtn}
            {...props}
          />
        )

      case 'password':
        return (
          <InputPassword
            onChange={(e: any) => onChangeText(e.target.value.toString())}
            $typeBtn={typeBtn}
            {...props}
          />
        )

      default:
        return (
          <InputArea
            onChange={(e: any) => onChangeText(e.target.value)}
            $typeBtn={typeBtn}
            rows={rows}
            {...props}
          />
        )
    }
  }, [type, props, rows, typeBtn, onChangeText])

  return inputComponent
}

export default MyInput
