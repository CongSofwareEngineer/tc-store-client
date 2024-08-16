import * as React from 'react'

import { Drawer, DrawerContent } from '@/components/ui/drawer'
type Props = {
  children?: React.ReactNode
  className?: string
  open?: boolean
  onChangeOpen?: (param: boolean) => void
  position?: 'top' | 'bottom' | 'left' | 'right'
}
export function MyDrawer({
  position = 'bottom',
  children,
  className,
  open,
  onChangeOpen,
}: Props) {
  const classNameContent = () => {
    if (position == 'right' || position == 'left') {
      return 'h-screen top-0 right-0 left-auto mt-0 w-auto rounded-none overflow-y-auto'
    }
    return 'w-screen  max-h-[300px] overflow-y-auto'
  }

  const classNameContainerContet = () => {
    if (position == 'right') {
      return 'h-screen top-0 right-0 left-auto mt-0 w-auto rounded-none'
    }
    return ''
  }
  const arr = []
  for (let index = 0; index < 100; index++) {
    arr.push(index)
  }
  return (
    <Drawer
      preventScrollRestoration
      fixed
      direction={position}
      onOpenChange={onChangeOpen}
      open={open}
    >
      <DrawerContent className={classNameContainerContet()}>
        <div className="w-full bg-white">
          {position === 'bottom' && (
            <div className="mx-auto mt-2 h-[5px] w-[100px] rounded-full bg-black/50" />
          )}
          <div className={`${classNameContent()} ${className}`}>
            {children || <></>}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
