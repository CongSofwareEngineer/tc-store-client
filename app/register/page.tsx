'use client'

import useDrawer from '@/hook/useDrawer'
import ItemNest from '../nests/Component/Item'
import PrimaryButton from '@/components/PrimaryButton'
import BtnBack from '@/components/BtnBack'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'

const PageRegister = () => {
  const { openDrawer } = useDrawer()
  const route = useRouter()

  const handleOpen = () => {
    openDrawer({
      content: <div>demo</div>,
      width: '70%',
    })
  }

  return (
    <div>
      <BtnBack title={'Register'} onClick={() => route.push('/shop')} />
      <div>PageRegister</div>
      <PrimaryButton onClick={handleOpen}>demo drawer</PrimaryButton>
      <div className="w-[200px]">
        <ItemNest data={{ id: 12312 }} />
      </div>
      <CldUploadWidget
        // uploadPreset="next-tc-store"
        signatureEndpoint="/api/cloudinary"
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>
        }}
      </CldUploadWidget>
    </div>
  )
}

export default PageRegister
