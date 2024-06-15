import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'
const ButtonCustom = styled(Button)`
  background: #fcd34d !important;
  color: black !important;
  :active :hover {
    opacity: 0.8 !important;
    background: #fcd34d !important;
    color: black !important;
  }
`
const SecondButton = ({ children, ...props }: ButtonProps) => {
  return <ButtonCustom {...props}>{children}</ButtonCustom>
}

export default SecondButton
