import ModalProcess from '@/components/ModalProcess'
import MyImage from '@/components/MyImage'
import { REQUEST_TYPE } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { detectAvatar, getBase64 } from '@/utils/functions'
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/notification'
import { EditTwoTone } from '@ant-design/icons'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useMemo } from 'react'
import { isIOS, isMacOs } from 'react-device-detect'

const Avatar = () => {
  const { userData, refreshLogin } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  const onChangeAvatar = async (file: any) => {
    const callBack = async (data: any) => {
      openModalDrawer({
        content: <ModalProcess title={translate('textPopular.updating')} />,
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })
      const bodyAPI = {
        ...data,
        public_id: userData?.avatar,
      }

      const res = await ClientApi.fetchData({
        url: `user/update-avatar/${userData?._id}`,
        body: {
          file: bodyAPI,
        },
        method: REQUEST_TYPE.POST,
      })

      if (res?.data) {
        refreshLogin()
        showNotificationSuccess(translate('myPage.updateSuccess'))
      } else {
        showNotificationError(translate('errors.update'))
      }
      closeModalDrawer()
    }

    getBase64(file, callBack)
  }

  const typeFile = useMemo(() => {
    if (isIOS && isMacOs) {
      return 'image/*'
    }
    return '.png,.jpg,.jpeg,.gif,.svg'
  }, [])

  return (
    <div className="w-[150px] min-h-[150px] relative overflow-hidden rounded-[50%]">
      <MyImage
        src={detectAvatar(userData?.avatar?.toString())}
        alt="avatar"
        widthImage="100%"
        heightImage="auto"
        priority
      />
      <div className="absolute-center mt-2">
        <ImgCrop
          aspect={1}
          quality={1}
          modalOk={translate('common.ok')}
          modalCancel={translate('common.close')}
          onModalOk={(file) => onChangeAvatar(file)}
        >
          <Upload showUploadList={false} accept={typeFile}>
            <label className="edit-avatar " htmlFor="avatar">
              <EditTwoTone
                className="cursor-pointer hover:scale-125"
                style={{ fontSize: 25, color: 'blue' }}
              />
            </label>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  )
}

export default Avatar
