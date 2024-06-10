'use client'

import { useRouter } from 'next/navigation'
import useModal from '@/hook/useModal'
import { useAppSelector } from '@/redux/store'
import PrimaryButton from '@/components/PrimaryButton'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()
  const { Language } = useAppSelector((state) => state.app)
  console.log({ Language })

  const { openModal } = useModal()
  const oprn = () => {
    router.push('')
    openModal({
      content: <div>modal</div>,
    })
  }
  return (
    <div>
      {/* <PrimaryButton
        onClick={() => router.push('/shop?typeProduct=water,food,technology')}
      >
        shopping
      </PrimaryButton>
      <div onClick={oprn} className="w-full text-medium">
        home page
      </div> */}
    </div>
  )
}

export default Home
