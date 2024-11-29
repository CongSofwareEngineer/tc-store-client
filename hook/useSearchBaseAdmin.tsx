import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MyForm from '@/components/Form/MyForm'
import InputForm from '@/components/Form/InputForm'
import useLanguage from './useLanguage'
import CategoryForm from '@/components/CategoryForm'
import CheckBoxForm from '@/components/Form/CheckBoxForm'
import { usePathname, useRouter } from 'next/navigation'
import ButtonForm from '@/components/Form/ButtonForm'
import { useAppSelector } from '@/redux/store'
import useMedia from './useMedia'
import { isObject } from '@/utils/functions'
import useQuerySearch from './useQuerySearch'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import dayjs from 'dayjs'
import MyButton from '@/components/MyButton'
import StatusFormBill from '@/components/Form/StatusFormBill'
import { FILTER_BILL } from '@/constant/app'

type Props = {
  dateStart?: boolean
  dateEnd?: boolean
  category?: boolean
  id?: boolean
  sdt?: boolean
  keyName?: boolean
  status?: boolean
  admin?: boolean
  oneDate?: boolean
}
const useSearchBaseAdmin = (param?: Props) => {
  const config: Props = {
    dateStart: true,
    dateEnd: true,
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
      const initData = {
        label: CategoryMenu[0]?.lang?.[Language.locale || 'vn'].toString() || '',
        value: CategoryMenu[0]?.keyName.toString() || '',
      }
      if (queries?.['category']) {
        const dataLan = CategoryMenu.find((e) => e.keyName === queries?.['category'][0]!)
        initData.label = dataLan?.lang?.[Language.locale || 'vn'].toString() || queries?.['category'][0]!
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
        dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
        dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
      }
      setFormData(initData)
    }

    return () => setFormData(null)
  }, [CategoryMenu, Language, queries, isClient])

  const clearSearch = () => {
    const initData = {
      category: '',
      id: '',
      sdt: '',
      keyName: '',
      status: '',
      oneDate: moment().format('YYYY-MM-DD'),
      admin: false,
      dateStart: dayjs(new Date(Date.now()).setDate(new Date().getDate() - 7)),
      dateEnd: dayjs(new Date(Date.now()).setDate(new Date().getDate())),
    }
    setFormData(initData)
    router.push(pathPage)
  }

  const handleSubmit = () => {
    let query = ''

    Object.entries(config).forEach(([key, value]: [string, boolean]) => {
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
          <MyForm onValuesChange={(_, value) => setFormData({ ...formData, ...value })} formData={formData} onFinish={handleSubmit} className='w-full'>
            <div className='flex justify-between flex-wrap'>
              {config.keyName && (
                <div className='md:w-[48%] w-full'>
                  <InputForm key={'KeyName'} name='keyName' label={'Key Name'} />
                </div>
              )}

              {config.sdt && (
                <div className='md:w-[48%] w-full'>
                  <InputForm key={'sdt'} name='sdt' label={translate('userDetail.sdt')} />
                </div>
              )}

              {config.category && (
                <div className='md:w-[48%] w-full'>
                  <CategoryForm label='category' name='category' />
                </div>
              )}
              {config.status && (
                <div className='md:w-[48%] w-full'>
                  <StatusFormBill label={translate('textPopular.status')} name='status' />
                </div>
              )}
              {config.admin && (
                <div className='md:w-[48%] w-full'>
                  <CheckBoxForm label='Admin' name='admin' />
                </div>
              )}

              {config.dateStart && (
                <div className='md:w-[48%] w-full'>
                  <MyDatePickerForm label={translate('textPopular.dateStart')} name='dateStart' defaultValue={formData.dateStart} />
                </div>
              )}
              {config.dateEnd && (
                <div className='md:w-[48%] w-full'>
                  <MyDatePickerForm label={translate('textPopular.dateEnd')} name='dateEnd' defaultValue={formData.dateEnd} />
                </div>
              )}
            </div>
            <div className='flex justify-center items-center gap-2 w-full'>
              <ButtonForm disableClose titleSubmit={translate('common.search')} />
              <MyButton type='primary' className=' mt-2' onClick={() => clearSearch()}>
                {'Clean'}
              </MyButton>
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
