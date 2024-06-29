import useLanguage from '@/hook/useLanguage'
import React from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import styled, { keyframes } from 'styled-components'
import useMedia from '@/hook/useMedia'
const spinAround = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const ContainerIcon = styled.div`
  animation: ${spinAround} 2.5s ease-in-out infinite;
`

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
        <ContainerIcon>
          <MyImage
            src={icon || images.icon.iconLoadingModal}
            heightImage={isMobile ? '70px' : '120px'}
            alt="icon-modal-delete"
            widthImage="auto"
            className="animate-pulse"
          />
        </ContainerIcon>
      </div>
      <div className="text-center mb-2 md:max-w-[90%] m-auto">{des}</div>
    </div>
  )
}

export default ModalProcess
