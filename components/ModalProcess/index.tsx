import useLanguage from '@/hook/useLanguage'
import React from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'

type PropsType = {
  icon?: string
  title?: string
  des?: string
}
const ModalProcess = ({ icon, des, title }: PropsType) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-title text-center">
        {title || translate('warning.doYouWantDetele')}
      </p>

      <div className="m-auto my-2 relative overflow-hidden">
        <div className="animation_spin25s ">
          <MyImage
            src={icon || images.icon.iconLoadingModal}
            heightImage={isMobile ? '70px' : '120px'}
            alt="icon-modal-delete"
            widthImage="auto"
            className="animate-pulse"
            priority
          />
        </div>
      </div>
      <div className="text-center mb-2 md:max-w-[90%] m-auto">{des}</div>
    </div>
  )
}
export default ModalProcess
