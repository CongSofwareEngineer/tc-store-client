'use client'

import { useRouter } from 'next/navigation'
import useModal from '@/hook/useModal'
import { useAppSelector } from '@/redux/store'

const Home = () => {
  const router = useRouter()
  const { Language } = useAppSelector((state) => state.app)
  console.log('====================================')
  console.log({ Language })
  console.log('====================================')
  const { openModal } = useModal()
  const oprn = () => {
    router.push('')
    openModal({
      content: <div>modal</div>,
    })
  }
  return (
    <div onClick={oprn} className="w-full text-medium">
      home page
    </div>
  )
}

export default Home
