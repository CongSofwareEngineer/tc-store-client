import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MyForm from '@/components/Form/MyForm'
import InputForm from '@/components/Form/InputForm'
import useLanguage from './useLanguage'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/Form/CheckBoxForm'
import { usePathname, useRouter } from 'next/navigation'
import ButtonForm from '@/components/Form/ButtonForm'
import useMedia from './useMedia'
import { isObject } from '@/utils/functions'
import useQuerySearch from './useQuerySearch'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import StatusFormBill from '@/components/Form/StatusFormBill'
import { FILTER_BILL } from '@/constant/app'
import { useLanguage as useLanguageZustand } from '@/zustand/useLanguage'
import { Button } from 'antd'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'

type KeySearchProps = {
  dateStart?: boolean
  dateEnd?: boolean
  category?: boolean
  id?: boolean
  sdt?: boolean
  keyName?: boolean
  status?: boolean
  admin?: boolean
  oneDate?: boolean
  idProduct?: boolean
  idUser?: boolean
}

type TitleProps = {
  id?: string
  keyName?: string
  oneDate?: string
  dateStart?: string
  dateEnd?: string
  idProduct?: string
}
const useSearchBaseAdmin = (param?: KeySearchProps, paramTitle?: TitleProps) => {
  const { translate } = useLanguage()
  const pathPage = usePathname()
  const router = useRouter()
  const { isClient } = useMedia()
  const { language } = useLanguageZustand()
  const { categoryMenu } = useCategoryMenu()
  const { queries } = useQuerySearch()
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  useEffect(() => {
    const getCategory = () => {
      const initData = {
        label: categoryMenu[0]?.lang?.[language.locale || 'vn'].toString() || '',
        value: categoryMenu[0]?.keyName.toString() || '',
      }
      if (queries?.['category']) {
        const dataLan = categoryMenu.find((e) => e.keyName === queries?.['category'][0]!)
        initData.label =
          dataLan?.lang?.[language.locale || 'vn'].toString() || queries?.['category'][0]!
        initData.value = dataLan?.keyName.toString() || queries?.['category'][0]!
      }

      return initData
    }
    if (isClient) {
      const initData = {
        category: getCategory(),
        id: '',
        sdt: '',
        keyName: '',
        status: FILTER_BILL.All,
        oneDate: moment().format('YYYY-MM-DD'),
        admin: false,
        dateStart: '',
        dateEnd: '',
        // dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
        // dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
      }
      setFormData(initData)
    }

    return () => setFormData(null)
  }, [categoryMenu, language, queries, isClient])

  const clearSearch = () => {
    const initData = {
      category: '',
      id: '',
      sdt: '',
      keyName: '',
      status: '',
      oneDate: moment().format('YYYY-MM-DD'),
      admin: false,
      dateStart: '',
      dateEnd: '',
      // dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
      // dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
    }
    setFormData(initData)
    router.push(pathPage)
  }

  const handleSubmit = () => {
    let query = ''

    Object.entries(param!).forEach(([key, value]: [string, any]) => {
      if (value && formData?.[key]) {
        if (query) {
          if (isObject(formData?.[key])) {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              console.log('format data')

              const time = new Date(formData?.[key].toString()).getTime()
              query += `&${key}=${time}`
            } else {
              query += `&${key}=${formData?.[key]?.value}`
            }
          } else {
            query += `&${key}=${formData?.[key]}`
          }
        } else {
          if (isObject(formData?.[key])) {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              const time = new Date(formData?.[key].toString()).getTime()
              query += `${key}=${time}`
            } else {
              query += `${key}=${formData?.[key]?.value}`
            }
          } else {
            if (key === 'dateStart' || key === 'dateEnd' || key === 'oneDate') {
              const time = new Date(formData?.[key].toString()).getTime()
              query += `${key}=${time}`
            } else {
              query += `${key}=${formData?.[key]}`
            }
          }
        }
      }
    })
    router.push(`${pathPage}?${query}`)
  }

  const renderContent = () => {
    return (
      <div className='flex  flex-col gap-3 '>
        {formData && isClient && (
          <MyForm
            onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
            formData={formData}
            onFinish={handleSubmit}
            className='w-full'
          >
            <div className='flex justify-between flex-wrap'>
              {param?.id && (
                <div className='md:w-[48%] w-full'>
                  <InputForm noPaddingBottom key={'id'} name='id' label={paramTitle?.id || 'ID'} />
                </div>
              )}
              {param?.idProduct && (
                <div className='md:w-[48%] w-full'>
                  <InputForm
                    noPaddingBottom
                    key={'idProduct'}
                    name='idProduct'
                    label={paramTitle?.idProduct || 'ID Product'}
                  />
                </div>
              )}
              {param?.keyName && (
                <div className='md:w-[48%] w-full'>
                  <InputForm noPaddingBottom key={'KeyName'} name='keyName' label={'Key Name'} />
                </div>
              )}

              {param?.sdt && (
                <div className='md:w-[48%] w-full'>
                  <InputForm
                    noPaddingBottom
                    key={'sdt'}
                    name='sdt'
                    label={translate('userDetail.sdt')}
                  />
                </div>
              )}

              {param?.category && (
                <div className='md:w-[48%] w-full'>
                  <CategoryForm noPaddingBottom label='category' name='category' />
                </div>
              )}
              {param?.status && (
                <div className='md:w-[48%] w-full'>
                  <StatusFormBill
                    noPaddingBottom
                    label={translate('textPopular.status')}
                    name='status'
                  />
                </div>
              )}
              {param?.admin && (
                <div className='md:w-[48%] w-full'>
                  <CheckBoxForm noPaddingBottom label='Admin' name='admin' />
                </div>
              )}

              {param?.dateStart && (
                <div className='md:w-[48%] w-full'>
                  <MyDatePickerForm
                    noPaddingBottom
                    label={translate('textPopular.dateStart')}
                    name='dateStart'
                    defaultValue={formData.dateStart}
                  />
                </div>
              )}
              {param?.dateEnd && (
                <div className='md:w-[48%] w-full'>
                  <MyDatePickerForm
                    noPaddingBottom
                    label={translate('textPopular.dateEnd')}
                    name='dateEnd'
                    defaultValue={formData.dateEnd}
                  />
                </div>
              )}
            </div>
            <div className='flex justify-center items-center gap-2 w-full'>
              <ButtonForm disableClose titleSubmit={translate('common.search')} />
              <Button type='primary' className=' mt-2' onClick={() => clearSearch()}>
                {'Clean'}
              </Button>
            </div>
          </MyForm>
        )}
      </div>
    )
  }

  return {
    formData,
    renderContent,
  }
}

export default useSearchBaseAdmin
