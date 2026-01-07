import useLanguage from '@/hooks/useLanguage'
import React, { useEffect, useState } from 'react'
import { images } from '@/configs/images'
import Image from 'next/image'

type PropsType = {
  icon?: string
  title?: string
  des?: string
  isCountDown?: boolean
  timeCountDown?: number
}

const ModalProcess = ({ icon, des, title, isCountDown = false, timeCountDown = 60 }: PropsType) => {
  const { translate } = useLanguage()
  const [time, setCount] = useState(timeCountDown)

  useEffect(() => {
    const countDown = () => {
      if (time > 0) {
        setTimeout(() => {
          setCount(time - 1)
        }, 1000)
      }
    }

    if (isCountDown) {
      countDown()
    }
  }, [isCountDown, time])

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-title text-center'>{title || translate('textPopular.statusProcessing')}</p>

      <div className='m-auto my-2 relative overflow-hidden'>
        <div className='animation_spin25s '>
          {isCountDown ? (
            <Image
              fill
              priority
              alt='icon-modal-delete'
              className='animate-pulse !w-auto !relative md:!h-[120px] !h-[70px]'
              src={'https://smart.keyring.app/assets/images/Icon/ic_creating_passkey.png'}
            />
          ) : (
            <Image
              fill
              priority
              alt='icon-modal-delete'
              className='animate-pulse !w-auto !relative md:!h-[120px] !h-[70px]'
              src={icon || images.icon.iconLoadingModal}
            />
          )}
        </div>
        {isCountDown && <div className='absolute-center text-xl font-bold'>{time}</div>}
      </div>
      <div className='text-center mb-2 md:max-w-[90%] m-auto'>{des}</div>
    </div>
  )
}

export default ModalProcess
