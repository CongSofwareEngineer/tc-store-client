import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'
const ButtonCustom = styled(Button)`
  background: #45cacd !important;
  :active :hover {
    opacity: 0.8 !important;
    background: #45cacd !important;
  }
`
const SecondButton = ({ children, ...props }: ButtonProps) => {
  return <ButtonCustom {...props}>{children}</ButtonCustom>
}

export default SecondButton
