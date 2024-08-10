import { Button as ButtonCustom, ButtonProps } from 'antd'
import styled, { css } from 'styled-components'
const Button = styled(ButtonCustom)<any>`
  ${(props) =>
    props.$widthBtn &&
    css`
      width: ${props.$widthBtn} !important;
    `}
  ${(props) =>
    props.$heightBtn &&
    css`
      height: ${props.$heightBtn} !important;
    `}
  border-radius: ${(props) => (props.$noBorderRadius ? 0 : 6)}px !important;
`
export type ButtonPropsType = {
  heightBtn?: string
  widthBtn?: string
  noBorderRadius?: boolean
} & ButtonProps

const MyButton = ({
  children,
  heightBtn = '',
  noBorderRadius = false,
  widthBtn = '',
  ...props
}: ButtonPropsType) => {
  return (
    <Button
      $heightBtn={heightBtn}
      $widthBtn={widthBtn}
      $noBorderRadius={noBorderRadius}
      {...props}
      className={`shadow-lg ${props.className}`}
    >
      {children}
    </Button>
  )
}

export default MyButton
