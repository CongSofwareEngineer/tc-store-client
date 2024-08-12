import MyForm from '@/components/MyForm'
import { delayTime, detectImg } from '@/utils/functions'
import React, { useEffect, useState } from 'react'
import InputForm from '@/components/InputForm'
import ButtonForm from '@/components/ButtonForm'
import CategoryForm from '@/components/CategoryForm'
import useLanguage from '@/hook/useLanguage'
import UploadImage from '../../../../../components/UploadImg/index'
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import useTypeFile from '@/hook/useTypeFile'

const ProductConfig = ({ item }: { item: any }) => {
  const { translate } = useLanguage()
  const { typeFile } = useTypeFile({ typeAndroid: '.png,.jpg,.jpeg' })
  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [loading, setLoading] = useState(false)
  console.log({ item })

  useEffect(() => {
    const initData = {
      cost: item?.cost || 0,
      amount: item?.amount || 100,
      disCount: item?.disCount || 0,
      dateEndSale: item?.dateEndSale || new Date().getTime(),
      dateSale: item?.dateSale || new Date().getTime(),
      imageMore: item?.imageMore || [],
      imageMain: item?.imageMain || '',
      des: item?.des || '',
      des2: item?.des2 || '',
      name: item?.name || '',
      keyName: item?.keyName || '',
      linkShoppe: item?.linkShoppe || '',
      linkFacebook: item?.linkFacebook || '',
      numberLike: item?.numberLike || 1,
      price: item?.price || 1,
      sold: item?.sold || 0,
      typeProduct: item?.typeProduct || 'water',
      weight: item?.weight || '',
      category: item?.category || 'water',
    }
    setFormData(initData)
  }, [])

  useEffect(() => {
    console.log({ name: formData?.name })
    setFormData((pre) => ({
      ...pre,
      keyName: formData?.name.replaceAll(' ', '-'),
    }))
  }, [formData?.name])

  console.log('====================================')
  console.log({ formData })
  console.log('====================================')

  const handleSubmit = async () => {
    setLoading(true)
    await delayTime(200)
    setLoading(false)
  }

  return formData ? (
    <MyForm
      onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
      formData={formData}
      onFinish={handleSubmit}
    >
      <div className="flex gap-4 w-full">
        <InputForm classFromItem="w-full" name="name" label="name" required />
        <CategoryForm label="category" name="category" />
      </div>

      <div className="flex gap-4 w-full">
        <InputForm
          classFromItem="w-full"
          name="linkFacebook"
          label="linkFacebook"
        />

        <InputForm
          classFromItem="w-full"
          name="linkShoppe"
          label="linkShoppe"
        />
      </div>

      <div className="flex gap-4 w-full">
        <InputForm
          classFromItem="w-full"
          name="cost"
          label="cost"
          required
          typeBtn="number"
        />

        <InputForm
          classFromItem="w-full"
          name="price"
          label="price"
          required
          typeBtn="number"
        />
      </div>
      <div className="flex gap-4 w-full">
        <InputForm
          classFromItem="w-full"
          name="disCount"
          label="disCount"
          required
          typeBtn="number"
        />

        <InputForm
          classFromItem="w-full"
          name="weight"
          label="weight"
          required
          disable={!!item}
        />
      </div>
      <div className="flex gap-3 justify-between">
        <div className="flex flex-col  w-[150px]   justify-between items-center">
          <div className="w-[100px]">
            <UploadImage
              typeFile={typeFile}
              handleUpload={(e) => setFormData({ ...formData, imageMain: e })}
            >
              <div className="flex gap-2">
                <CameraOutlined />
                <span>Hình chính</span>
              </div>
            </UploadImage>
          </div>
          <div className="w-[150px] flex justify-center ">
            <div className="w-[100px] aspect-square overflow-hidden">
              <Image
                alt="img-main"
                src={detectImg(
                  formData?.imageMain?.base64 || formData?.imageMain || ''
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-200px)] flex flex-col  gap-3 justify-between items-center">
          <div className="w-full">
            <UploadImage
              typeFile={typeFile}
              handleUpload={(e) =>
                setFormData({
                  ...formData,
                  imageMore: [...formData.imageMore, e],
                })
              }
              children={
                <div className="flex w-full gap-2 justify-center items-center">
                  <CameraOutlined />
                  <span>Hình phụ</span>
                </div>
              }
            />
          </div>
          <div className="flex flex-nowrap gap-3 overflow-scroll w-full ">
            {formData?.imageMore &&
              formData?.imageMore.map((e: any) => {
                return (
                  <div className="w-[100px]" key={e.base64}>
                    <div className="w-[100px] relative">
                      <Image
                        className="w-[100px]"
                        alt={`img-moew-${e.name}`}
                        src={e.base64}
                      />
                      <CloseCircleOutlined
                        onClick={() => {}}
                        className="absolute right-0 top-0 text-[18px] cursor-pointer "
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      <InputForm
        classFromItem="w-full"
        name="des"
        label="des"
        required
        typeBtn="area"
      />
      <div className="mt-1" />

      <InputForm
        classFromItem="w-full"
        name="des2"
        label="des2"
        required
        typeBtn="area"
      />

      <div className="mt-5">
        <ButtonForm
          titleSubmit={translate('common.create')}
          loading={loading}
        />
      </div>
    </MyForm>
  ) : (
    <></>
  )
}

export default ProductConfig
