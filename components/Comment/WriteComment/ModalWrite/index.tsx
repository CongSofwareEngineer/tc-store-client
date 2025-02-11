import { ItemDetailType } from '@/components/InfoItemDetail/type'

import ImageNext from 'next/image'
import MyLoading from '@/components/MyLoading'
import UploadImage from '@/components/UploadImg'
import { DataAddComment } from '@/constant/mongoDB'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { detectImg } from '@/utils/functions'
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useCommentDetail from '@/hook/tank-query/useCommentDetail'
import { useForm } from '@mantine/form'
import MyForm from '@/components/MantineUI/Form/MyForm'
import InputForm from '@/components/MantineUI/Form/Input'
import TextAreaForm from '@/components/MantineUI/Form/TextAreaForm'
import ButtonForm from '@/components/MantineUI/Form/ButtonForm'
import RateForm from '@/components/MantineUI/Form/RateForm'

const ModalWrite = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const [loading, setLoading] = useState(false)
  // const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [dataExited, setDataExited] = useState<{ [key: string]: any } | null>(null)

  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const { checkNumberPhone, checkNameUser } = useCheckForm()
  const { refreshListQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const { data: dataApi, isLoading: loadingApi } = useCommentDetail(dataItem._id)

  const formData: any = useForm({
    mode: 'uncontrolled',
    initialValues: {
      idProduct: dataItem._id,
      sdt: '',
      name: '',
      note: 'Sản phẩm rất tốt',
      rate: 5,
      listImg: [],
    },
    validate: {
      sdt: (sdt) => checkNumberPhone(sdt),
      name: (name) => checkNameUser(name),
    },
    validateInputOnChange: true,
  })
  useEffect(() => {
    const getData = async () => {
      const initData = {
        idProduct: dataItem._id,
        sdt: userData?.sdt || '',
        name: userData?.name || '',
        note: 'Sản phẩm rất tốt',
        rate: 5,
        listImg: [],
      }
      if (userData && dataApi) {
        initData.listImg = dataApi.listImg
        initData.note = dataApi.note
        initData.rate = dataApi.rate
        setDataExited(dataApi)
      }
      formData.setInitialValues(initData)
    }
    getData()
  }, [userData, dataItem, dataApi])

  const getDataToUpdate = () => {
    const data: { [key: string]: any } = {}
    for (const key in dataExited) {
      if (!isEqual(formData.getValues()?.[key], dataExited[key])) {
        if (formData.getValues()?.[key]) {
          data[key] = formData.getValues()?.[key]
        }
      }
    }

    data.imagesDelete = []
    if (Array.isArray(dataExited?.listImg)) {
      data.imagesDelete = dataExited?.listImg?.filter((e: any) => {
        const isExited = formData.getValues()?.listImg.find((eApi: any) => {
          return eApi === e
        })

        return !isExited
      })
    }

    return data
  }

  const handleSubmit = async () => {
    setLoading(true)
    const body: DataAddComment = {
      idProduct: formData.getValues()?.idProduct,
      listImg: formData.getValues()?.listImg,
      note: formData.getValues()?.note,
      name: formData.getValues()?.name,
      rate: formData.getValues()?.rate || 5,
      sdt: formData.getValues()?.sdt,
    }
    let res

    if (dataExited) {
      res = await ClientApi.updateComment(dataExited?._id, getDataToUpdate())
    } else {
      res = await ClientApi.createComment(body)
    }
    if (res?.data) {
      await refreshListQuery([
        QUERY_KEY.GetCommentProduction,
        QUERY_KEY.GetProductByID,
        QUERY_KEY.GetCommentDetail,
      ])
      closeModalDrawer()
      showNotificationSuccess(translate('comment.feedbackSuccess'))
    } else {
      showNotificationError(translate('comment.feedbackFail'))
    }
    setLoading(false)
  }

  const handleUpload = async (file: any) => {
    const prevTemp = formData.getValues().listImg
    formData.setFieldValue('listImg', [...prevTemp, file])
  }

  const deleteImg = (index: number) => {
    const data = formData
      .getValues()
      ?.listImg.filter((_: any, indexFilter: number) => indexFilter !== index)
    formData.setFieldValue('listImg', data)
  }

  const renderListImg = () => {
    return (
      formData.getValues()?.listImg?.length > 0 && (
        <div className='flex gap-3 mt-2'>
          {formData.getValues()?.listImg?.map((item: any, index: number) => (
            <div key={`img-${index}`} className='relative w-[70px] '>
              <ImageNext
                alt='img'
                className='!relative !h-auto !-[70px]'
                src={detectImg(item?.base64 || item)}
                fill
              />
              <CloseCircleOutlined
                onClick={() => deleteImg(index)}
                className='absolute text-[20px] z-10 cursor-pointer right-0 top-0'
              />
            </div>
          ))}
        </div>
      )
    )
  }

  return (
    <div className='flex flex-col gap-3 w-full justify-center items-center min-h-[300px]'>
      {loadingApi && <MyLoading />}
      {!loadingApi && (
        <MyForm form={formData} className='w-full gap-0' submit={handleSubmit}>
          <div className='flex flex-col overflow-y-auto'>
            <div className='flex gap-2 w-full mb-3'>
              <div className='w-[100px] aspect-square overflow-hidden'>
                <Image alt='avatar-product' src={detectImg(dataItem.imageMain)} />
              </div>
              <div className='flex flex-1 flex-col gap-2 h-auto justify-center'>
                <p className='text-medium font-bold'>{dataItem.name}</p>
                <RateForm form={formData} keyName='rate' />
              </div>
            </div>
            <InputForm
              required
              form={formData}
              keyName={'name'}
              label={translate('header.name')}
              placeholder={translate('header.name')}
              disabled={!!isLogin}
            />

            <InputForm
              required
              form={formData}
              keyName={'sdt'}
              label={translate('userDetail.sdt')}
              placeholder={translate('userDetail.sdt')}
              disabled={!!isLogin}
            />

            <TextAreaForm
              form={formData}
              name={'note'}
              required
              label={translate('textPopular.note')}
              placeholder={translate('textPopular.note')}
              maxLength={200}
              disabled={!!isLogin}
            />

            {/* <InputForm
              typeBtn='string'
              required
              name={'sdt'}
              label={translate('userDetail.sdt')}
              classFromItem='w-full'
              validator={checkNumberPhone}
              disable={!!isLogin}
            />
            <InputForm
              name={'note'}
              required
              typeBtn='area'
              label={translate('textPopular.note')}
              classFromItem='w-full'
              showCount
              maxLength={200}
            /> */}
            {renderListImg()}
            <UploadImage
              handleUpload={handleUpload}
              disabled={formData.getValues()?.listImg?.length >= 2}
              listData={formData.getValues()?.listImg || []}
              maxSizeOutputKB={200}
              maxPixelReduce={400}
            >
              <div className='flex gap-2 item-center w-full mt-3'>
                <CameraOutlined
                  className='cursor-pointer'
                  style={{ fontSize: 25, color: 'blue' }}
                />
                <span>{translate('comment.uploadImg_des')}</span>
              </div>
            </UploadImage>
          </div>

          <div className='flex flex-col w-full gap-2 mt-5 '>
            <ButtonForm
              loading={loading}
              disableClose
              titleSubmit={translate(dataExited ? 'common.updateFeedback' : 'common.sendFeedback')}
            />
          </div>
        </MyForm>
      )}
    </div>
  )
}

export default ModalWrite
