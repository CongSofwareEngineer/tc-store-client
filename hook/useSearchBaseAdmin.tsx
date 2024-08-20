import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import useLanguage from './useLanguage'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/CheckBoxForm'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import ButtonForm from '@/components/ButtonForm'

const dateStart = moment(Date.now()).add(-7, 'days').format('YYYY-MM-DD')
type Props = {
  allDate?: boolean
  category?: boolean
  id?: boolean
  sdt?: boolean
  keyName?: boolean
  status?: boolean
  admin?: boolean
  oneDate?: boolean
}
const useSearchBaseAdmin = (
  param: Props = {
    allDate: true,
    category: true,
    id: true,
    sdt: true,
    keyName: true,
    status: true,
    oneDate: true,
    admin: false,
  }
) => {
  const { translate } = useLanguage()
  const pathPage = usePathname()
  const router = useRouter()

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

  const handleSubmit = () => {
    let query = ''
    Object.entries(param).forEach(([key, value]: [string, boolean]) => {
      if (value) {
        if (query) {
          query += `&${formData?.[key]}`
        } else {
          query += formData?.[key]
        }
      }
    })

    router.push(`${pathPage}?${query}`)
  }

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
              {param.keyName && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'KeyName'}
                    name="keyName"
                    label={'Key Name'}
                  />
                </div>
              )}

              {param.sdt && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'sdt'}
                    name="sdt"
                    label={translate('userDetail.sdt')}
                  />
                </div>
              )}

              {param.category && (
                <div className="md:w-[48%] w-full">
                  <CategoryForm label="category" name="category" />
                </div>
              )}
              {param.admin && (
                <div className="md:w-[48%] w-full">
                  <CheckBoxForm label="Admin" name="admin" />
                </div>
              )}
            </div>
            <div className="flex justify-center w-full">
              <ButtonForm
                disableClose
                titleSubmit={translate('common.search')}
              />
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
