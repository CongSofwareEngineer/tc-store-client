import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import ModalUpdateUser from '../ModalUpdateUser'
import useModalDrawer from '@/hook/useModalDrawer'
import { DataBase, FB_FC } from '@/constant/firebase'
import ClientApi from '@/services/clientApi'

const AddressShip = () => {
  const { userData } = useUserData()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const handleUpdate = (addressOld: string, index: number) => {
    const callBack = async (address?: string) => {
      if (Array.isArray(userData?.addressShipper)) {
        const arrOld = [...userData?.addressShipper]
        arrOld[index] = address?.toString() || ''

        await ClientApi.requestBase({
          nameDB: DataBase.user,
          body: {
            id: userData?.id,
            data: {
              addressShipper: arrOld,
            },
          },
          encode: true,
          namFn: FB_FC.updateData,
        })
      }
    }
    openModalDrawer({
      content: (
        <ModalUpdateUser
          initValue={addressOld}
          callBack={callBack}
          keyType={'addressShipper'}
        />
      ),
      useDrawer: true,
      title: `${translate('common.edit')} ${translate(
        'textPopular.addressShip'
      )}`,
      configDrawer: {
        height: '400px',
        placement: 'bottom',
        maskClosable: false,
      },
    })
  }

  return (
    <div>
      <div className="font-bold flex items-center gap-1">
        <span>{translate('textPopular.addressShip')} </span>
        <PlusCircleOutlined style={{ color: 'green', fontSize: 16 }} />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {Array.isArray(userData?.addressShipper) &&
          userData?.addressShipper.map((e, index) => {
            return (
              <div key={e} className="flex gap-1 items-center w-full">
                <span>({index + 1}) : </span>
                <span className="max-w-[calc(100%-70px)] whitespace-nowrap text-ellipsis overflow-hidden">
                  {e}
                </span>
                <EditFilled
                  onClick={() => handleUpdate(e, index)}
                  className="ml-1"
                  style={{ color: 'green', fontSize: 16 }}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AddressShip
