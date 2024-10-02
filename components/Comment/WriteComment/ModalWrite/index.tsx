import ButtonForm from '@/components/Form/ButtonForm'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import InputForm from '@/components/Form/InputForm'
import MyForm from '@/components/Form/MyForm'
import MyImage from '@/components/MyImage'
import MyLoading from '@/components/MyLoading'
import RateForm from '@/components/Form/RateForm'
import UploadImage from '@/components/UploadImg'
import { REQUEST_TYPE } from '@/constant/app'
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
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/notification'

const ModalWrite = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const [loading, setloading] = useState(false)
  const [loadingGetData, setloadingGetData] = useState(true)
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [dataExited, setDataExited] = useState<{ [key: string]: any } | null>(
    null
  )

  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()

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
      if (userData) {
        const res = await ClientApi.fetchData({
          url: `/comment/detail/${dataItem._id}/${userData?.sdt}`,
        })
        if (res?.data) {
          initData.listImg = res.data.listImg
          initData.note = res.data.note
          initData.rate = res.data.rate
          setDataExited(res.data)
        }
      }
      setFormData(initData)
      setloadingGetData(false)
    }
    getData()
  }, [userData, dataItem])

  const getDataToUpdate = () => {
    const data: { [key: string]: any } = {}
    for (const key in dataExited) {
      if (!isEqual(formData?.[key], dataExited[key])) {
        if (formData?.[key]) {
          data[key] = formData?.[key]
        }
      }
    }
    return data
  }

  const handleSubmit = async () => {
    setloading(true)
    const body: DataAddComment = {
      idProduct: formData?.idProduct,
      listImg: formData?.listImg,
      note: formData?.note,
      name: formData?.name,
      rate: formData?.rate || 5,
      sdt: formData?.sdt,
    }
    let res

    if (dataExited) {
      res = await ClientApi.fetchData({
        url: `comment/update/${dataExited?._id}`,
        method: REQUEST_TYPE.POST,
        body: getDataToUpdate(),
      })
    } else {
      res = await ClientApi.fetchData({
        url: 'comment/create',
        method: REQUEST_TYPE.POST,
        body: body,
      })
    }
    if (res?.data) {
      closeModalDrawer()
      showNotificationSuccess(translate('comment.feedbackSuccess'))
      refreshQuery(QUERY_KEY.GetProductByID)
      refreshQuery(QUERY_KEY.GetCommentProduction)
    } else {
      showNotificationError(translate('comment.feedbackFaild'))
    }
    setloading(false)
  }

  const handleUpload = async (file: any) => {
    setFormData((prev) => ({ ...prev, listImg: [...prev?.listImg, file] }))
  }

  const deleteImg = (index: number) => {
    const data = formData?.listImg.filter(
      (_: any, indexFilter: number) => indexFilter !== index
    )
    setFormData((prev) => ({ ...prev, listImg: data }))
  }

  const renderListImg = () => {
    return (
      formData?.listImg?.length > 0 && (
        <div className="flex gap-3">
          {formData?.listImg?.map((item: any, index: number) => (
            <div key={`img-${index}`} className="relative w-[70px] ">
              <Image
                alt="img"
                className="w-[70px]"
                src={detectImg(item?.base64 || item)}
              />
              <CloseCircleOutlined
                onClick={() => deleteImg(index)}
                className="absolute text-[20px] z-10 cursor-pointer right-0 top-0"
              />
            </div>
          ))}
        </div>
      )
    )
  }

  return (
    <div className="flex flex-col gap-3 w-full justify-center items-center">
      {loadingGetData && <MyLoading />}
      {!loadingGetData && formData && (
        <MyForm
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
          className="w-full gap-0"
          formData={formData}
          onFinish={handleSubmit}
        >
          <div className="flex gap-2 w-full">
            <div className="w-[100px] aspect-square overflow-hidden">
              <MyImage
                alt="avatar-product"
                src={detectImg(dataItem.imageMain)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 h-auto justify-center">
              <p className="text-medium font-bold">{dataItem.name}</p>
              <RateForm name="rate" />
            </div>
          </div>
          <InputForm
            typeBtn="string"
            required
            name={'name'}
            label={translate('header.name')}
            classFromItem="w-full"
            disable={!!isLogin}
          />
          <InputForm
            typeBtn="string"
            required
            name={'sdt'}
            label={translate('userDetail.sdt')}
            classFromItem="w-full"
            validator={checkNumberPhone}
            disable={!!isLogin}
          />
          <InputForm
            name={'note'}
            required
            typeBtn="area"
            label={translate('textPopular.note')}
            classFromItem="w-full"
            showCount
            maxLength={200}
          />

          <div className="flex flex-col w-full gap-2 mt-10">
            {renderListImg()}
            <UploadImage
              handleUpload={handleUpload}
              disbale={formData?.listImg?.length >= 2}
              listData={formData?.listImg || []}
              maxSizeOutputKB={15}
            >
              <div className="flex gap-2 item-center w-full">
                <CameraOutlined
                  className="cursor-pointer"
                  style={{ fontSize: 25, color: 'blue' }}
                />
                <span>{translate('comment.uploadImg_des')}</span>
              </div>
            </UploadImage>

            <ButtonForm
              loading={loading}
              classNameItem="w-full "
              className="w-full mt-4"
              disableClose
              titleSubmit={translate(
                dataExited ? 'common.updateFeedback' : 'common.sendFeedback'
              )}
            />
          </div>
        </MyForm>
      )}
    </div>
  )
}

export default ModalWrite
