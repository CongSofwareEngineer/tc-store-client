import { ReloadIcon } from '@radix-ui/react-icons'
import { Button, ButtonProps } from '../ui/button'
import { useState } from 'react'
type Props = {
  loading?: boolean
  typeBtn?: ButtonProps['variant']
  children?: React.ReactNode
} & ButtonProps
const MyButton = ({
  loading = false,
  typeBtn = 'default',
  children,
  ...props
}: Props) => {
  const [loadingBase, setLoadingBase] = useState(false)

  const handleSubmit = async (param?: any) => {
    setLoadingBase(true)
    if (props?.onClick) {
      await props?.onClick(param)
    }
    setLoadingBase(false)
  }
  return (
    <Button
      variant={typeBtn}
      disabled={loading || loadingBase}
      {...props}
      onClick={handleSubmit}
    >
      <div className="flex flex-nowrap  w-auto items-center">
        {(loading || loadingBase) && (
          <div>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
        {children || <></>}
      </div>
    </Button>
  )
}
export default MyButton
