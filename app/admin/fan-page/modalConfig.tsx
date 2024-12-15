import ButtonForm from '@/components/Form/ButtonForm'
import InputForm from '@/components/Form/InputForm'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import MyForm from '@/components/Form/MyForm'
import UploadImage from '@/components/UploadImg'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import MyImage from '@/components/MyImage'
import { detectImg } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import { isEqual } from 'lodash'
import AdminApi from '@/services/adminApi'

const ModalConfig = ({ data }: { data?: any }) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  useEffect(() => {
    const date = dayjs(new Date(Number(data?.date) || Date.now()))
    const initData = {
      des: data?.des || '',
      source: data?.source || '',
      date,
      listImage: data?.listImage || [],
    }
    setFormData(initData)
    console.log({ data, initData })
  }, [])

  console.log({ formData })

  const getImageDelete = () => {
    if (data) {
      const list: string[] = []

      data?.listImage.forEach((e: string) => {
        const isExited = formData?.listImage?.find((eForm: any) => eForm === e)
        if (!isExited) {
          list.push(e)
        }
      })
      return list
    }
    return []
  }
  const onDeleteImage = (index: number) => {
    const arrImg = formData?.listImage.filter((_: any, indexFiler: number) => indexFiler !== index)
    const data = {
      ...formData,
      listImage: arrImg,
    }
    setFormData(data)
  }
  const handleSubmit = async () => {
    setLoading(true)
    if (data) {
      const dataEdit: Record<string, any> = {}

      Object.keys(data).forEach((key) => {
        if (formData![key] && !isEqual(formData![key], data[key])) {
          dataEdit[key] = formData![key]
        }
      })

      dataEdit.date = new Date(formData?.date?.toString()).getTime()
      dataEdit.imagesDelete = getImageDelete()
      console.log({ dataEdit })

      const res = await AdminApi.updateFanPage(data?._id, dataEdit)
      console.log({ res })

      if (res.data) {
        await refreshQuery(QUERY_KEY.GetFanPage)
        showNotificationSuccess(translate('success.update'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('error.update'))
      }
    } else {
      const body = {
        ...formData,
        date: new Date(formData?.date?.toString()).getTime(),
      }

      const res = await AdminApi.createFanPage(body)
      if (res.data) {
        await refreshQuery(QUERY_KEY.GetFanPage)
        showNotificationSuccess(translate('success.create'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('error.create'))
      }
    }

    setLoading(false)
  }

  return (
    <MyForm
      formData={formData}
      onFinish={handleSubmit}
      onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
      className='!w-full !h-full flex flex-1 md:min-h-[70vh] md:max-h-[85vh] overflow-y-auto '
    >
      <div className='flex flex-col gap-3 max-h overflow-y-auto w-full flex-1'>
        <MyDatePickerForm defaultValue={formData?.date} label={translate('textPopular.date')} name='date' />
        <InputForm label={translate('textPopular.source')} name={'source'} classFromItem='w-full' />
        <InputForm
          label={translate('textPopular.infor')}
          typeBtn='area'
          rows={12}
          name={'des'}
          classFromItem='w-full'
        />

        <div className='md:mb-[250px] w-full bg-gray-300' />

        <div className='flex '>
          <div className='flex w-max'>
            <UploadImage
              maxSizeOutputKB={500}
              maxPixelReduce={500}
              handleUpload={(e) => {
                setFormData({
                  ...formData,
                  listImage: [...formData?.listImage, e],
                })
              }}
            >
              <div className='flex gap-2'>
                <CameraOutlined />
                <span>{translate('textPopular.image')}</span>
              </div>
            </UploadImage>
          </div>
        </div>
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3'>
          {formData?.listImage?.map((e: any, index: number) => {
            return (
              <div className='flex aspect-square w-full overflow-hidden relative' key={e}>
                <MyImage
                  className='!relative !w-full !h-auto '
                  alt={detectImg(e?.base64 || e)}
                  src={detectImg(e?.base64 || e)}
                />
                <div className='absolute text-red-500 text-xl right-4 top-3'>
                  <DeleteOutlined onClick={() => onDeleteImage(index)} className='cursor-pointer ' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex  w-full'>
        <ButtonForm titleSubmit={translate(data ? 'common.update' : 'common.create')} loading={loading} />
      </div>
    </MyForm>
  )
}

export default ModalConfig
