'use client'
import React from 'react'
import { Checkbox, Input } from '@mantine/core'
import { AiOutlineCopy, AiOutlineEdit, AiOutlineRight } from 'react-icons/ai'

import Avatar from './Component/Avatar'
import ItemInfoUser from './Component/ItemInfoUser'
import ModalEnterPassAgain from './Component/ModalEnterPassAgain'
import ModalUpdateUser from './Component/ModalUpdateUser'

import useMedia from '@/hooks/useMedia'
import useUserData from '@/hooks/useUserData'
import useLanguage from '@/hooks/useLanguage'
// import AddressShip from './Component/AddressShip'
import { numberWithCommas } from '@/utils/functions'
import useModalDrawer from '@/hooks/useModalDrawer'
import { copyToClipboard } from '@/utils/notification'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'

const MyProfile = () => {
  const { isMobile } = useMedia()
  const { userData } = useUserData()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  useFirstLoadPage()

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
  const updateAddressShip = () => {
    // openModalDrawer({
    //   content: <ModalUpdateAddressShip />,
    //   title: `${translate('common.update')} ${translate('textPopular.addressShip')}`,
    //   useDrawer: true,
    // })
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

  const renderAddressShip = () => {
    const addressUser = userData?.addressShipper[0]
    let addressString = ''

    if (addressUser) {
      const addressBase = addressUser.address.replaceAll('---', ',')

      addressString = `${addressUser.addressDetail}, ${addressBase}`
    }

    return isMobile ? (
      <div className='flex gap-2'>
        <span className='w-[100px]'>{translate('textPopular.address')}</span>
        <div className='flex flex-1 flex-nowrap'>
          <div className='flex flex-1 justify-end gap-2  '>
            <span>{addressString || translate('textPopular.notData')}</span>
            <AiOutlineRight onClick={updateAddressShip} />
          </div>
        </div>
      </div>
    ) : (
      <div className='flex gap-2'>
        <span className='w-[140px]'>{translate('textPopular.address')}</span>
        <div className='flex flex-1 flex-nowrap'>
          <div className='flex flex-1   gap-2  '>
            <span>{addressString || translate('textPopular.notData')}</span>
            <AiOutlineEdit className='text-xl cursor-pointer hover:scale-110 ml-1' style={{ color: 'green' }} onClick={updateAddressShip} />
          </div>
        </div>
      </div>
    )
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
              <div className='flex items-center gap-1 text-green-500'>
                {userData?.sdt}
                <AiOutlineCopy onClick={() => copyToClipboard(userData?.sdt)} />
              </div>
            </div>

            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.name')}</span>
              <div className='flex flex-1 gap-2 items-center'>
                <Input className='flex-1' value={userData?.name} />
                <AiOutlineEdit
                  className='text-xl cursor-pointer hover:scale-110 ml-1'
                  style={{ color: 'green' }}
                  onClick={() => handleEditName('name')}
                />
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <span className='w-[140px]'>{translate('userDetail.pass')}</span>
              <div className='flex flex-1  gap-2 items-center'>
                <Input disabled className='flex-1' type='password' value={userData?.pass} />
                <AiOutlineEdit
                  className='text-xl cursor-pointer hover:scale-110 ml-1'
                  style={{ color: 'green' }}
                  onClick={() => handleEditName('pass')}
                />
              </div>
            </div>
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('userDetail.sex')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <div className='flex gap-2 items-center'>
                  <Checkbox defaultChecked label={<span>{translate(userData?.sex ? 'textPopular.female' : 'textPopular.male')}</span>} />
                </div>
                <AiOutlineEdit
                  className='text-xl cursor-pointer hover:scale-110 ml-1'
                  style={{ color: 'green' }}
                  onClick={() => handleEditName('sex')}
                />
              </div>
            </div>
            {renderAddressShip()}
            <div className='flex gap-2'>
              <span className='w-[140px]'>{translate('textPopular.point')}</span>
              <div className='flex flex-1 gap-2 items-end'>
                <span>{numberWithCommas(userData?.exp || 0)}</span>
                <span>≈</span>
                <span>{numberWithCommas(userData?.exp || 0)} VNĐ</span>
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
          <ItemInfoUser keyType='name' title={translate('header.name')} value={userData?.name?.toString()} />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser keyType='sdt' title={translate('userDetail.sdt')} value={userData?.sdt?.toString()} />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser keyType='pass' title={translate('userDetail.pass')} value={userData?.pass?.toString()} />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <ItemInfoUser keyType='sex' title={translate('userDetail.sex')} value={!!userData?.sex} />
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />
          {renderAddressShip()}
          <div className='relative w-full border-[.5px] my-3 border-gray-300' />

          <div className='flex gap-2 flex-nowrap  justify-between w-full py-2 pr-2'>
            <span className='whitespace-nowrap'>{translate('textPopular.point')}</span>
            <div className='flex flex-nowrap overflow-hidden text-ellipsis  gap-2 items-end'>
              <span>{numberWithCommas(userData?.exp || 0)}</span>
              <span>≈</span>
              <span>{numberWithCommas(userData?.exp || 0)} VNĐ</span>
            </div>
          </div>
          <div className='relative w-full border-[.5px] my-3 mb-0 border-gray-300' />
        </div>
      </div>
    )
  }

  return <>{isMobile ? renderMobile() : renderDesktop()}</>
}

export default MyProfile
