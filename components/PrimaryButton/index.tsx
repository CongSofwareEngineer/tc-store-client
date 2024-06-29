import { Button as ButtonCustom, ButtonProps } from 'antd'
import styled from 'styled-components'
const Button = styled(ButtonCustom)<any>`
  height: ${(props) => props.$heightBtn} !important;
  width: ${(props) => props.$widthBtn} !important;
  border-radius: ${(props) => (props.$noBorderRadius ? 0 : 6)}px !important;
`
export type ButtonPropsType = {
  children: React.ReactNode
  heightBtn?: string
  widthBtn?: string
  noBorderRadius?: boolean
} & ButtonProps
const PrimaryButton = ({
  children,
  heightBtn = '35px',
  widthBtn = 'auto',
  noBorderRadius = false,
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

export default PrimaryButton
