import ButtonForm from '@/components/Form/ButtonForm'
import InputForm from '@/components/Form/InputForm'
import MyDatePickerForm from '@/components/Form/MyDatePickerForm'
import MyForm from '@/components/Form/MyForm'
import UploadImage from '@/components/UploadImg'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { CameraOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import MyImage from '@/components/MyImage'
import { detectImg } from '@/utils/functions'
import ServerApi from '@/services/serverApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'

const ModalConfig = ({ data }: { data?: any }) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  useEffect(() => {
    const date = dayjs(new Date(data?.date || Date.now()))
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

  const handleSubmit = async () => {
    setLoading(true)

    const body = {
      ...formData,
      date: new Date(formData?.date?.toString()).getTime(),
    }
    console.log({ body })
    const res = await ServerApi.createFanPage(body)
    console.log({ res })

    if (res.data) {
      await refreshQuery(QUERY_KEY.GetFanPage)
      showNotificationSuccess(translate('success.create'))
      closeModalDrawer()
    } else {
      showNotificationError(translate('error.create'))
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <MyForm
        formData={formData}
        onFinish={handleSubmit}
        onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        className='!w-full !h-full md:min-h-[70vh]  max-h-[85vh]'
      >
        <div className='flex flex-col gap-3 flex-1 h-full overflow-hidden'>
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
              {formData?.listImage?.map((e: any) => {
                return (
                  <div className='flex aspect-square w-full overflow-hidden relative' key={e}>
                    <MyImage
                      className='!relative !w-full !h-auto '
                      alt={detectImg(e?.base64 || e)}
                      src={detectImg(e?.base64 || e)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex  w-full'>
            <ButtonForm titleSubmit={translate(data ? 'common.update' : 'common.create')} loading={loading} />
          </div>
        </div>
      </MyForm>
    </div>
  )
}

export default ModalConfig
