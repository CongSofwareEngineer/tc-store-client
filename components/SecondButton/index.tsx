import { Button as ButtonCustom } from 'antd'
import styled from 'styled-components'
import { ButtonPropsType } from '../PrimaryButton'
const Button = styled(ButtonCustom)<any>`
  background: #fcd34d !important;
  color: black !important;
  :active :hover {
    opacity: 0.8 !important;
    background: #fcd34d !important;
    color: black !important;
  }
  height: ${(props) => props.$heightBtn} !important;
  width: ${(props) => props.$widthBtn} !important;
  border-radius: ${(props) => (props.$noBorderRadius ? 0 : 6)}px !important;
`
const SecondButton = ({
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
    >
      {children}
    </Button>
  )
}

export default SecondButton
