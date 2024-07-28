'use client'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import {
  detectAvatar,
  getBase64,
  scrollTop,
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import { EditTwoTone } from '@ant-design/icons'
import { Col, Row, Upload } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { PropsWithChildren } from 'react'
import ImgCrop from 'antd-img-crop'
import ServerApi from '@/services/serverApi'
import { REQUEST_TYPE } from '@/constant/app'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalProcess from '@/components/ModalProcess'
const Container = ({ children }: PropsWithChildren) => {
  const { isMobile, isClient } = useMedia()
  const { translate } = useLanguage()
  const { userData, refreshLogin } = useUserData()
  const patchName = usePathname()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()

  useEffect(() => {
    setTimeout(() => {
      scrollTop()
    }, 100)
  }, [])

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

      const res = await ServerApi.requestBase({
        url: `user/update-avatar/${userData?._id}`,
        body: {
          file: bodyAPI,
        },
        encode: true,
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

  const renderItem = (icon: string, name: string, link: string) => {
    return (
      <Link
        href={link}
        className="cursor-pointer text-black  flex md:flex-row flex-col gap-1 md:items-start items-center hover:underline"
        style={{
          fontWeight: patchName === link ? 'bold' : 'normal',
          color: 'black',
        }}
      >
        <MyImage
          src={icon}
          alt={`icon-menu-my-profile-${name}`}
          widthImage={isMobile ? '20px' : '25px'}
          heightImage={isMobile ? '20px' : '25px'}
        />
        <span>{name}</span>
      </Link>
    )
  }

  const renderMobile = () => {
    return (
      <div className="bg-white w-[calc(100%+40px)]  p-4 top-[-6px] relative left-[-20px]">
        <div className="w-full relative ">
          <div className="fixed bg-white  w-full flex justify-around bottom-0 left-0 py-3  border-t-[1px] shadow-gray1 border-gray-300 z-10">
            <Row className="w-full">
              <Col span={8}>
                {renderItem(
                  images.icon.iconHome,
                  translate('header.home'),
                  '/'
                )}
              </Col>
              <Col span={8}>
                {renderItem(
                  images.icon.iconHistory,
                  translate('myPage.myOder'),
                  '/my-page/bill'
                )}
              </Col>
              <Col span={8}>
                {renderItem(
                  images.icon.iconMyUser,
                  translate('myPage.myUser'),
                  '/my-page'
                )}
              </Col>
            </Row>
          </div>
          <div className="w-full mb-[75px]">{children}</div>
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="w-full flex gap-6 h-full">
        <div className="w-[200px] flex flex-col  items-center gap-3 h-full">
          <div className="w-[150px] relative overflow-hidden rounded-[50%]">
            <MyImage
              src={detectAvatar(userData?.avatar?.toString())}
              alt="avatar"
              widthImage="100%"
              heightImage="auto"
            />
            <div className="absolute-center mt-2">
              <ImgCrop
                aspect={1}
                quality={1}
                modalOk={translate('common.ok')}
                modalCancel={translate('common.close')}
                onModalOk={(file) => onChangeAvatar(file)}
              >
                <Upload
                  showUploadList={false}
                  accept=".png,.jpg,.jpeg,.gif,.svg"
                >
                  <label className="edit-avatar " htmlFor="avatar">
                    <EditTwoTone
                      className="cursor-pointer hover:scale-125"
                      style={{ fontSize: 25, color: 'blue' }}
                    />
                  </label>
                </Upload>
              </ImgCrop>
              {/* <MyImage 
                alt='icon-edit-avatart'
                src={images.icon.icon}
              /> */}
              {/* <EditOutlined className="text-xl cursor-pointer hover:scale-110" /> */}
            </div>
          </div>
          <div className="text-center text-medium">{userData?.name}</div>
          <div className="flex flex-col w-full gap-5 text-medium">
            {renderItem(
              images.icon.iconMyUser,
              translate('myProfile.myProfile'),
              '/my-page'
            )}
            {renderItem(
              images.icon.iconBill,
              translate('bill.title'),
              '/my-page/bill'
            )}
            {renderItem(
              images.icon.iconCart,
              translate('header.cart'),
              '/my-cart'
            )}
          </div>
        </div>
        <div className="flex flex-1 bg-white p-4 h-fit max-h-[calc(100vh-80px)] overflow-y-auto ">
          {children}
        </div>
      </div>
    )
  }

  return <>{isClient && (isMobile ? renderMobile() : renderDesktop())}</>
}

export default Container
