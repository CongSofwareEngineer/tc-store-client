import PrimaryButton from '@/components/PrimaryButton'
import { DataBase, FB_FC } from '@/constant/firebase'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { decryptData } from '@/utils/crypto'
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import { Checkbox, Input } from 'antd'
import React, { useEffect, useState } from 'react'
type PropsType = {
  keyType: string
  callBack?: (param?: string) => Promise<void>
  initValue?: string
}
const ModalUpdateUser = ({ keyType, callBack, initValue }: PropsType) => {
  const { refreshLogin, userData } = useUserData()
  const { closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()

  const [loading, setLoading] = useState(false)
  const [valueNew, setValueNew] = useState<string | boolean | undefined>('')

  useEffect(() => {
    setValueNew(getOldValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const getOldValue = () => {
    switch (keyType) {
      case 'pass':
        return decryptData(userData?.pass?.toString())
      case 'sdt':
        return userData?.sdt?.toString()
      case 'sex':
        return !!userData?.sex
      case 'name':
        return userData?.name?.toString()
      default:
        return initValue?.toString()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    switch (keyType) {
      case 'sdt':
        if (checkNumberPhone(valueNew?.toString() || '')) {
          showNotificationError(checkNumberPhone(valueNew?.toString() || ''))
          setLoading(false)
          return
        }
      case 'name':
      case 'pass':
        showNotificationError(translate('errors.empty'))
        setLoading(false)
        return
    }
    if (callBack) {
      await callBack(valueNew?.toString())
    } else {
      await ClientApi.requestBase({
        nameDB: DataBase.user,
        body: {
          id: userData?.id,
          data: {
            [keyType]: valueNew,
          },
        },
        encode: true,
        namFn: FB_FC.updateData,
      })
    }
    await refreshLogin()
    closeModalDrawer()
    showNotificationSuccess(translate('myPage.updateSuccess'))
    setLoading(false)
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-medium font-bold">
          {translate('textPopular.now')} :
        </div>
        <div className="">
          {keyType === 'sex' ? (
            <div className="flex gap-2">
              <Checkbox checked={!!getOldValue()} disabled>
                {translate('textPopular.female')}
              </Checkbox>
              <Checkbox checked={!getOldValue()} disabled>
                {translate('textPopular.male')}
              </Checkbox>
            </div>
          ) : (
            <Input value={getOldValue()?.toString()} disabled />
          )}
        </div>

        <div className="text-medium font-bold mt-2">
          {translate('textPopular.newValue')} :
        </div>
        <div className="w-full mt-1">
          {keyType === 'sex' ? (
            <div className="flex gap-2">
              <Checkbox checked={!!valueNew} onClick={() => setValueNew(true)}>
                {translate('textPopular.female')}
              </Checkbox>
              <Checkbox checked={!valueNew} onClick={() => setValueNew(false)}>
                {translate('textPopular.male')}
              </Checkbox>
            </div>
          ) : (
            <Input.TextArea
              rows={2}
              value={valueNew?.toString()}
              onChange={(e) => setValueNew(e.target.value)}
            />
          )}
        </div>
        <div className="w-full mt-3">
          <PrimaryButton
            widthBtn="100%"
            loading={loading}
            onClick={handleSubmit}
          >
            {translate('common.save')}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdateUser
