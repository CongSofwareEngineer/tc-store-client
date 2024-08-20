import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import MyInput from '@/components/MyInput'
import MyRangePicker from '@/components/MyRangePicker'
import MyButton from '@/components/MyButton'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import useLanguage from './useLanguage'
import SelectForm from '@/components/SelectForm'
import { FILTER_BILL } from '@/constant/app'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/CheckBoxForm'

const dateStart = moment(Date.now()).add(-7, 'days').format('YYYY-MM-DD')
type Props = {
  showId?: boolean
  showSDT?: boolean
  showKeyName?: boolean
  showAllDate?: boolean
  showOneDate?: boolean
  showStatus?: boolean
  showCategory?: boolean
  showAdmin?: boolean
}
const useSearchBaseAdmin = (
  param: Props = {
    showAllDate: true,
    showCategory: true,
    showId: true,
    showSDT: true,
    showKeyName: true,
    showStatus: true,
    showOneDate: false,
    showAdmin: false,
  }
) => {
  const { translate } = useLanguage()

  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  useEffect(() => {
    const initData = {
      allDate: [dateStart, moment().format('YYYY-MM-DD')],
      category: '',
      id: '',
      sdt: '',
      keyName: '',
      status: '',
      oneDate: moment().format('YYYY-MM-DD'),
      admin: false,
    }
    setFormData(initData)
    return () => setFormData(initData)
  }, [])

  const handleSubmit = () => {}

  const renderContent = () => {
    return (
      <div className="flex  flex-col gap-3 ">
        {formData && (
          <MyForm
            onValuesChange={(_, value) =>
              setFormData({ ...formData, ...value })
            }
            formData={formData}
            onFinish={handleSubmit}
            className="w-full"
          >
            <div className="flex justify-between flex-wrap">
              {param.showKeyName && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'KeyName'}
                    name="keyName"
                    label={'Key Name'}
                  />
                </div>
              )}

              {param.showSDT && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'sdt'}
                    name="sdt"
                    label={translate('userDetail.sdt')}
                  />
                </div>
              )}

              {param.showCategory && (
                <div className="md:w-[48%] w-full">
                  <CategoryForm label="category" name="category" />
                </div>
              )}
              {param.showAdmin && (
                <div className="md:w-[48%] w-full">
                  <CheckBoxForm label="Admin" name="admin" />
                </div>
              )}
            </div>
          </MyForm>
        )}
        {/* {param.showAllDate && (
          <MyRangePicker
            className="md:min-w-[230] min-w-full"
            onChange={(dateString) => setDateTime(dateString)}
          />
        )}

        <div className="w-full md:flex-col flex-row flex gap-2">
          <div className="flex flex-1 gap-3">
            <MyInput
              placeholder="SDT"
              type="string"
              value={sdt}
              onChangeText={(e) => setSdt(e!.toString())}
            />
            <MyButton type="dashed" onClick={handleSearchSDT}>
              Search
            </MyButton>
          </div>
          <div className="flex flex-1 md:flex-row  flex-col  gap-3">
            <MyInput
              placeholder="Id"
              type="string"
              value={idOther}
              onChangeText={(e) => setIdOther(e?.toString() || '')}
            />
            <Button type="primary" onClick={handleSearchIDOther}>
              Search
            </Button>
          </div>
        </div> */}
      </div>
    )
  }

  return {
    formData,
    renderContent,
  }
}

export default useSearchBaseAdmin
