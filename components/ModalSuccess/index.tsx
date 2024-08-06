import useLanguage from '@/hook/useLanguage'
import React from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'
import PrimaryButton from '../PrimaryButton'
import useModalDrawer from '@/hook/useModalDrawer'
import SecondButton from '../SecondButton'
type Props = {
  title?: string
  titleSubmit?: string
  titleClose?: string
  des?: string
  icon?: string
  callback?: ((params?: any) => any) | null
  showClose?: boolean | false
}
const ModalSuccess = ({
  showClose = false,
  callback = null,
  ...props
}: Props) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <div className="flex flex-col w-full gap-4 justify-center align-middle">
      <p className="text-title text-center">
        {props.title || translate('warning.doYouWantDetele')}
      </p>
      <div className="m-auto my-2 relative overflow-hidden">
        <MyImage
          src={props.icon || images.icon.iconSuccess}
          heightImage={isMobile ? '70px' : '100px'}
          alt="icon-modal-success"
          widthImage="auto"
          priority
        />
      </div>
      {props.des && (
        <div className="text-center mb-2 md:max-w-[90%] m-auto">
          {props.des}
        </div>
      )}

      <div className="flex w-full gap-3">
        <div className="flex flex-1">
          <PrimaryButton
            widthBtn="100%"
            onClick={() => (callback ? callback() : closeModalDrawer())}
          >
            {props.titleSubmit || translate('common.ok')}
          </PrimaryButton>
        </div>
        {showClose && (
          <div className="flex flex-1">
            <SecondButton widthBtn="100%" onClick={() => closeModalDrawer()}>
              {props.titleClose || translate('common.close')}
            </SecondButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalSuccess
