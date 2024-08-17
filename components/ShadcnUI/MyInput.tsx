import React from 'react'
import { Input, InputProps } from '../ui/input'
import styled, { css } from 'styled-components'
const InputCusom = styled(Input)<{ $hideControl?: boolean }>`
  ${(props) =>
    props.$hideControl &&
    css`
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }
    `}
`
type Props = {
  disabled?: boolean
  hideControl?: boolean
} & InputProps
const MyInput = ({ hideControl = false, ...props }: Props) => {
  return <InputCusom $hideControl={hideControl} {...props} />
}

export default MyInput
