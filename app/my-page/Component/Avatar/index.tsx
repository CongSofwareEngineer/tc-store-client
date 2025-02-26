import CropImg from '@/components/CropImg'
import ModalProcess from '@/components/ModalProcess'
import MyImage from '@/components/MyImage'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useUserData from '@/hooks/useUserData'
import ClientApi from '@/services/clientApi'
import { detectAvatar } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { Button, FileButton } from '@mantine/core'
import React, { useMemo } from 'react'
import { isIOS, isMacOs } from 'react-device-detect'
import { AiOutlineEdit } from 'react-icons/ai'

const Avatar = () => {
  const { userData, refreshLogin } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  const typeFile = useMemo(() => {
    if (isIOS || isMacOs) {
      return 'image/*'
    }
    return '.png,.jpg,.jpeg,.gif,.svg'
  }, [])

  const handleUploadImg = (file: File | null) => {
    const callback = async (fileCrop: File | null) => {
      console.log({ fileCrop })

      openModalDrawer({
        content: <ModalProcess title={translate('textPopular.updating')} />,
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })

      const bodyAPI = {
        ...fileCrop,
        public_id: userData?.avatar,
      }

      const res = await ClientApi.updateAvatar(userData?._id, bodyAPI)

      if (res?.data) {
        refreshLogin()
        showNotificationSuccess(translate('myPage.updateSuccess'))
      } else {
        showNotificationError(translate('errors.update'))
      }
      closeModalDrawer()
    }

    openModalDrawer({
      content: <CropImg onCropComplete={callback} file={file!} />,
      title: 'Cắt ảnh',
      configModal: {
        overClickClose: false,
        showBtnClose: false,
      },
    })
  }
  return (
    <div className='w-[150px] min-h-[150px] relative overflow-hidden rounded-[50%]'>
      {/* <div className=' relative w-full  '> */}
      <div className='absolute w-full h-full'>
        <MyImage
          src={detectAvatar(userData?.avatar?.toString())}
          alt='avatar'
          className='!relative !w-full !h-full'
        />
      </div>

      <div className='absolute-center mt-2 text-2xl '>
        <FileButton onChange={handleUploadImg} accept={typeFile}>
          {(props) => (
            <Button {...props} className='!p-0 !bg-transparent'>
              <div className='text-white !text-2xl cursor-pointer transition-all duration-300 hover:!text-3xl'>
                <AiOutlineEdit />
              </div>
            </Button>
          )}
        </FileButton>
      </div>
    </div>
  )
}

export default Avatar
