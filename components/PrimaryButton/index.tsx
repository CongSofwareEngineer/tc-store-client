import { Button, ButtonProps } from 'antd'
type ButtonPropsType = {
  children: React.ReactNode
  noBorderRadius?: boolean
} & ButtonProps
const PrimaryButton = ({
  children,
  noBorderRadius = false,
  ...props
}: ButtonPropsType) => {
  return (
    <Button
      {...props}
      className={`shadow-lg ${props.className}`}
      style={{ borderRadius: noBorderRadius ? 0 : 6 }}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton
