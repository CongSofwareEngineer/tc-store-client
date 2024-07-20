'use client'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import ItemInfoUser from './Component/ItemInfoUser'
import useLanguage from '@/hook/useLanguage'
import AddressShip from './Component/AddressShip'
import { copyToClipboard } from '@/utils/functions'
import MyInput from '@/components/MyInput'
import { FormDataBaseUserType } from './type'
import { decryptData } from '@/utils/crypto'

const MyProfile = () => {
  const { isMobile } = useMedia()
  const { userData } = useUserData()
  const { translate } = useLanguage()

  const [formData, setFormData] = useState<FormDataBaseUserType | null>(null)

  useEffect(() => {
    if (userData) {
      const initData = {
        name: userData.name?.toString(),
        pass: decryptData(userData.pass)?.toString(),
      }
      setFormData(initData)
    }
  }, [userData])

  const handleEditAvatar = () => {}

  const renderDesktop = () => {
    return (
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-medium font-bold">
          {translate('myProfile.myProfile')}
        </h1>
        <h3>{translate('myProfile.desProfile')}</h3>
        <div className="relative w-full border-[1px]   border-gray-300" />
        <div className="flex justify-between">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex gap-2">
              <span className="w-[140px]">{translate('userDetail.sdt')}</span>
              <div className="flex gap-1 text-green-500">
                {userData?.sdt}
                <CopyOutlined onClick={() => copyToClipboard(userData?.sdt)} />
              </div>
            </div>

            <div className="flex gap-2">
              <span className="w-[140px]">{translate('userDetail.name')}</span>
              <div className="flex flex-1">
                <MyInput
                  className="w-[90%]"
                  typeBtn={1}
                  value={formData?.name}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-[140px]">{translate('userDetail.pass')}</span>
              <div className="flex flex-1">
                <MyInput
                  className="w-[90%]"
                  typeBtn={1}
                  type="password"
                  value={formData?.pass}
                />
              </div>
            </div>
            <AddressShip />
          </div>
          <div className="w-[20%] min-w-[200px]">avatart</div>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="w-full bg-white flex flex-col items-center">
        <div className="h-[150px] relative overflow-hidden rounded-[50%]">
          <MyImage
            src={
              userData?.avatar?.toString() || images.userDetail.iconUserDetail
            }
            alt="avatar"
            widthImage="auto"
            heightImage="100%"
          />
          <div className="absolute-center ">
            <EditOutlined onClick={handleEditAvatar} style={{ fontSize: 23 }} />
          </div>
        </div>
        <div className="relative w-full border-[.5px] my-3 border-gray-300" />

        <div className="w-full flex flex-col">
          <ItemInfoUser
            value={userData?.name?.toString()}
            title={translate('header.name')}
            keyType="name"
          />
          <div className="relative w-full border-[.5px] my-3 border-gray-300" />

          <ItemInfoUser
            value={userData?.sdt?.toString()}
            title={translate('userDetail.sdt')}
            keyType="sdt"
          />
          <div className="relative w-full border-[.5px] my-3 border-gray-300" />

          <ItemInfoUser
            value={userData?.pass?.toString()}
            title={translate('userDetail.pass')}
            keyType="pass"
          />
          <div className="relative w-full border-[.5px] my-3 border-gray-300" />

          <ItemInfoUser
            value={!!userData?.sex}
            title={translate('userDetail.sex')}
            keyType="sex"
          />
          <div className="relative w-full border-[.5px] my-3 border-gray-300" />

          <AddressShip />
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default MyProfile
