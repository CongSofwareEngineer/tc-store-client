'use client'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import ItemInfoUser from './Component/ItemInfoUser'
import useLanguage from '@/hook/useLanguage'
// import AddressShip from './Component/AddressShip'
import { numberWithCommas } from '@/utils/functions'
import MyInput from '@/components/MyInput'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalUpdateUser from './Component/ModalUpdateUser'
import ModalEnterPassAgain from './Component/ModalEnterPassAgain'
import MyCheckBox from '@/components/MyCheckBox'
import Avatar from './Component/Avatar'
import { copyToClipboard } from '@/utils/notification'

const MyProfile = () => {
  const { isMobile } = useMedia()
  const { userData } = useUserData()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const getLanguage = (keyType: string) => {
    switch (keyType) {
      case 'pass':
        return translate('userDetail.pass')
      case 'sdt':
        return translate('userDetail.sdt')
      case 'sex':
        return translate('userDetail.sex')
      case 'name':
        return translate('userDetail.name')
      default:
        return ''
    }
  }

  const handleEditName = (key: string) => {
    const callback = () => {
      openModalDrawer({
        content: <ModalUpdateUser keyType={key} />,
        title: <div className='text-medium '>{`${translate('common.edit')} ${getLanguage(key)}`}</div>,
      })
    }

    if (key === 'pass') {
      openModalDrawer({
        content: <ModalEnterPassAgain callBack={callback} />,
      })
    } else {
      callback()
    }
  }

  const renderDesktop = () => {
    return (
      <div className='w-full flex flex-col gap-3'>
        <h1 className='text-medium font-bold'>{translate('myProfile.myProfile')}</h1>
        <h3>{translate('myProfile.desProfile')}</h3>
        <div className='relative w-full border-[1px]   border-gray-300' />
        <div className='flex justify-between mt-2'>
          <div className='flex flex-1 flex-col gap-5'>
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.sdt')}</span>
              <div className='flex gap-1 text-green-500'>
                {userData?.sdt}
                <CopyOutlined onClick={() => copyToClipboard(userData?.sdt)} />
              </div>
              {/* <EditOutlined
                onClick={() => handleEditName('sdt')}
                className="text-xl cursor-pointer hover:scale-110"
                style={{ color: 'green' }}
              /> */}
            </div>

            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.name')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <MyInput className='w-[90%]' typeBtn={1} value={userData?.name} />
                <EditOutlined onClick={() => handleEditName('name')} className='text-xl cursor-pointer hover:scale-110 ml-1' style={{ color: 'green' }} />
              </div>
            </div>
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.pass')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <MyInput className='w-[90%]' typeBtn={1} type='password' value={userData?.pass} disabled />
                <EditOutlined onClick={() => handleEditName('pass')} className='text-xl cursor-pointer hover:scale-110 ml-1' style={{ color: 'green' }} />
              </div>
            </div>
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.sex')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <div className='flex gap-2 items-end'>
                  <MyCheckBox value={!userData?.sex} />
                  <span>{translate(!!userData?.sex ? 'textPopular.female' : 'textPopular.male')}</span>
                </div>
                <EditOutlined onClick={() => handleEditName('sex')} className='text-xl cursor-pointer hover:scale-110 ml-1' style={{ color: 'green' }} />
              </div>
            </div>
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('textPopular.point')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <span>{numberWithCommas(userData?.point || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='w-full bg-white flex flex-col items-center'>
        <div className='h-[150px] relative overflow-hidden rounded-[50%]'>
          <Avatar />
        </div>
        <div className='relative w-full border-[.5px] my-3 border-gray-300' />

        <div className='w-full flex flex-col'>
          <ItemInfoUser value={userData?.name?.toString()} title={translate('header.name')} keyType='name' />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser value={userData?.sdt?.toString()} title={translate('userDetail.sdt')} keyType='sdt' />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser value={userData?.pass?.toString()} title={translate('userDetail.pass')} keyType='pass' />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser value={!!userData?.sex} title={translate('userDetail.sex')} keyType='sex' />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <div className='flex gap-2 justify-between w-full py-2 pr-2'>
            <span>{translate('textPopular.point')}</span>
            <div>{numberWithCommas(userData?.point || 0)}</div>
          </div>
          <div className='relative w-full border-[.5px] my-3 mb-0 border-gray-300' />
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default MyProfile
