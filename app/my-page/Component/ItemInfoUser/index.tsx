import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import ModalUpdateUser from '../ModalUpdateUser'
import ModalEnterPassAgain from '../ModalEnterPassAgain'
import { AiOutlineRight } from 'react-icons/ai'
import { IItemInfoUser } from './type'

const ItemInfoUser = ({ value, keyType, title }: IItemInfoUser) => {
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const getLanguage = () => {
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

  const handleUpdate = () => {
    const callback = () => {
      openModalDrawer({
        content: <ModalUpdateUser keyType={keyType?.toString() || ''} />,
        useDrawer: true,
        title: `${translate('common.edit')} ${getLanguage()}`,
        configDrawer: {
          position: 'bottom',
          overClickOutside: false,
        },
      })
    }

    if (keyType === 'pass') {
      openModalDrawer({
        content: <ModalEnterPassAgain callBack={callback} />,
      })
    } else {
      callback()
    }
  }

  const getDataEx = () => {
    if (keyType === 'pass') {
      return '********'
    }

    if (keyType == 'sex') {
      console.log({ value })
    }
    return value
  }
  return (
    <div
      onClick={handleUpdate}
      className='flex md:justify-start justify-between w-full md:gap-2 py-2'
    >
      <span>{title}</span>

      <span className='flex gap-1 items-center'>
        {keyType === 'sex' ? (
          <span>{!value ? translate('textPopular.female') : translate('textPopular.male')}</span>
        ) : (
          <span>{getDataEx()}</span>
        )}

        <AiOutlineRight />
      </span>
    </div>
  )
}

export default ItemInfoUser
