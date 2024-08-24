import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import useLanguage from './useLanguage'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/CheckBoxForm'
import { usePathname, useRouter } from 'next/navigation'
import ButtonForm from '@/components/ButtonForm'
import { useAppSelector } from '@/redux/store'
import useMedia from './useMedia'
import { isObject } from '@/utils/functions'
import useQuerySearch from './useQuerySearch'

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
const useSearchBaseAdmin = (param: Props) => {
  const config: Props = {
    allDate: true,
    category: true,
    id: true,
    sdt: true,
    keyName: true,
    status: true,
    oneDate: true,
    admin: false,
    ...param,
  }

  const { translate } = useLanguage()
  const pathPage = usePathname()
  const router = useRouter()
  const { isClient } = useMedia()
  const { CategoryMenu, Language } = useAppSelector((state) => state.app)
  const { queries } = useQuerySearch()
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  useEffect(() => {
    const getCategory = () => {
      const initdata = {
        label:
          CategoryMenu[0]?.lang?.[Language.locale || 'vn'].toString() || '',
        value: CategoryMenu[0]?.keyName.toString() || '',
      }
      if (queries?.['category']) {
        const dataLan = CategoryMenu.find(
          (e) => e.keyName === queries?.['category'][0]!
        )
        initdata.label =
          dataLan?.lang?.[Language.locale || 'vn'].toString() ||
          queries?.['category'][0]!
        initdata.value =
          dataLan?.keyName.toString() || queries?.['category'][0]!
      }

      return initdata
    }
    if (isClient) {
      const initData = {
        allDate: [dateStart, moment().format('YYYY-MM-DD')],
        category: getCategory(),
        id: '',
        sdt: '',
        keyName: '',
        status: '',
        oneDate: moment().format('YYYY-MM-DD'),
        admin: false,
      }
      setFormData(initData)
    }

    return () => setFormData(null)
  }, [CategoryMenu, Language, queries, isClient])

  const handleSubmit = () => {
    let query = ''
    Object.entries(config).forEach(([key, value]: [string, boolean]) => {
      if (value && formData?.[key]) {
        if (query) {
          if (isObject(formData?.[key])) {
            query += `&${key}=${formData?.[key]?.value}`
          } else {
            query += `&${key}=${formData?.[key]}`
          }
        } else {
          if (isObject(formData?.[key])) {
            query += `${key}=${formData?.[key]?.value}`
          } else {
            query += `${key}=${formData?.[key]}`
          }
        }
      }
    })
    console.log({ query })

    router.push(`${pathPage}?${query}`)
  }

  const renderContent = () => {
    return (
      <div className="flex  flex-col gap-3 ">
        {formData && isClient && (
          <MyForm
            onValuesChange={(_, value) =>
              setFormData({ ...formData, ...value })
            }
            formData={formData}
            onFinish={handleSubmit}
            className="w-full"
          >
            <div className="flex justify-between flex-wrap">
              {config.keyName && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'KeyName'}
                    name="keyName"
                    label={'Key Name'}
                  />
                </div>
              )}

              {config.sdt && (
                <div className="md:w-[48%] w-full">
                  <InputForm
                    key={'sdt'}
                    name="sdt"
                    label={translate('userDetail.sdt')}
                  />
                </div>
              )}

              {config.category && (
                <div className="md:w-[48%] w-full">
                  <CategoryForm label="category" name="category" />
                </div>
              )}
              {config.admin && (
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
