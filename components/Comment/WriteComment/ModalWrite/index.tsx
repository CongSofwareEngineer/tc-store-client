import ButtonForm from '@/components/ButtonForm'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import InputForm from '@/components/InputForm'
import MyForm from '@/components/MyForm'
import MyImage from '@/components/MyImage'
import RateForm from '@/components/RateForm'
import UploadImage from '@/components/UploadImg'
import { DataAddComment } from '@/constant/mongoDB'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useBase64Img from '@/hook/useBase64Img'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { delayTime, showNotificationError } from '@/utils/functions'
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalWrite = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)

  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()
  const { getBase64 } = useBase64Img()
  const { refreshQuery } = useRefreshQuery()

  useEffect(() => {
    const initData = {
      idProduct: dataItem.id,
      sdt: userData?.sdt || '',
      name: userData?.name || '',
      note: 'Sản phẩm rất tốt',
      rate: 5,
      listImg: [],
    }
    setFormData(initData)
  }, [userData, dataItem.id])
  console.log({ formData })

  const handleSubmit = async () => {
    try {
      setloading(true)
      const body: DataAddComment = {
        idProduct: formData?.idProduct,
        listImg: formData?.listImg,
        note: formData?.note,
        name: formData?.name,
        rate: formData?.rate || 5,
        sdt: formData?.sdt,
      }
      await delayTime(200)
      refreshQuery(QUERY_KEY.GetProductByID)
      refreshQuery(QUERY_KEY.GetCommentProduction)

      console.log('====================================')
      console.log({ body })
      console.log('====================================')
      setloading(false)
    } catch (error) {}
  }

  const handleUpload = async (file: any) => {
    const callBack = async (data: any) => {
      if (formData?.listImg.some((e: any) => e.name === data.name)) {
        showNotificationError(translate('errors.existFile'))
      } else {
        setFormData((prev) => ({ ...prev, listImg: [...prev?.listImg, data] }))
      }
    }
    getBase64(file, callBack)
  }

  const deleteImg = (name: string) => {
    const data = formData?.listImg.filter((e: any) => e.name !== name)
    setFormData((prev) => ({ ...prev, listImg: data }))
  }

  const renderListImg = () => {
    return (
      formData?.listImg?.length > 0 && (
        <div className="flex gap-3">
          {formData?.listImg?.map((item: any, index: number) => (
            <div key={`img-${index}`} className="relative w-[70px] ">
              <Image alt="img" className="w-[70px]" src={item?.base64} />
              <CloseCircleOutlined
                onClick={() => deleteImg(item.name)}
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
      {formData && (
        <MyForm
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
          className="w-full gap-0"
          formData={formData}
          onFinish={handleSubmit}
        >
          <div className="flex gap-2 w-full">
            <div className="w-[100px] aspect-square overflow-hidden">
              <MyImage alt="avatar-product" src={dataItem.image} />
            </div>
            <div className="flex flex-1 flex-col gap-2 h-auto justify-center">
              <p className="text-medium font-bold">{dataItem.name}</p>
              <RateForm name="rate" />
              {/* <Rate
                defaultValue={formData.rate || 5}
                style={{ fontSize: 18 }}
              /> */}
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
          />

          <div className="flex flex-col w-full gap-2 mt-8">
            {renderListImg()}
            <UploadImage
              handleUpload={handleUpload}
              disbale={formData?.listImg?.length >= 2}
              listData={formData?.listImg || []}
              maxSize={7}
            >
              <div className="flex gap-2 item-center w-full">
                <CameraOutlined
                  className="cursor-pointer"
                  style={{ fontSize: 25, color: 'blue' }}
                />
                <span>Gửi hình chụp thực tế và video (Tối đa 2 hình)</span>
              </div>
            </UploadImage>

            <ButtonForm
              loading={loading}
              classNameItem="w-full "
              className="w-full mt-4"
              disableClose
              titleSubmit={'Gửi đánh giá'}
            />
          </div>
        </MyForm>
      )}
    </div>
  )
}

export default ModalWrite
