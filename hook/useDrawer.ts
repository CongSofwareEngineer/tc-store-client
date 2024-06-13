import { DrawerContext } from '@/components/DrawerProvider/config'
import { useContext } from 'react'

const useDrawer = () => {
  const { closeDrawer, openDrawer } = useContext(DrawerContext)

  return {
    closeDrawer, openDrawer
  }
}

export default useDrawer