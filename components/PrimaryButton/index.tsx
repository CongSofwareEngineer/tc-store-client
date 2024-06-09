import { Button, ButtonProps } from 'antd'

const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button className="shadow-lg" {...props}>
      {children}
    </Button>
  )
}

export default PrimaryButton
