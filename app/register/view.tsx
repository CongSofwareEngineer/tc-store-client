'use client'

import ItemNest from '../nests/Component/Item'
import PrimaryButton from '@/components/PrimaryButton'
import BtnBack from '@/components/BtnBack'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import useModalDrawer from '@/hook/useModalDrawer'

const RegisterPageScreen = () => {
  const { openModalDrawer } = useModalDrawer()
  const route = useRouter()

  const handleOpen = () => {
    openModalDrawer({
      content: <div>demo</div>,
      configDrawer: {
        width: '70%',
      },
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

export default RegisterPageScreen
