'use client'

import useDrawer from '@/hook/useDrawer'
import ItemNest from '../nests/Component/Item'
import PrimaryButton from '@/components/PrimaryButton'

const PageRegister = () => {
  const { openDrawer } = useDrawer()

  const handleOpen = () => {
    openDrawer({
      content: <div>demo</div>,
    })
  }
  return (
    <div>
      <div>PageRegister</div>
      <PrimaryButton onClick={handleOpen}>demo drawer</PrimaryButton>
      <div className="w-[200px]">
        <ItemNest data={{ id: 12312 }} />
      </div>
    </div>
  )
}

export default PageRegister
