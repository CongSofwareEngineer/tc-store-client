import MyForm from '@/components/Form/MyForm'
import {
  detectImg,
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import React, { useEffect, useState } from 'react'

import CategoryForm from '@/components/CategoryForm'
import useLanguage from '@/hook/useLanguage'
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import useTypeFile from '@/hook/useTypeFile'
import useCheckForm from '@/hook/useCheckForm'
import { REQUEST_TYPE } from '@/constant/app'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import useModalDrawer from '@/hook/useModalDrawer'
import ClientApi from '@/services/clientApi'
import { isEqual } from 'lodash'
import UploadImage from '@/components/UploadImg'
import InputForm from '@/components/Form/InputForm'
import ButtonForm from '@/components/Form/ButtonForm'

const ProductConfig = ({ item }: { item: any }) => {
  const { translate } = useLanguage()
  const { typeFile } = useTypeFile({ typeAndroid: '.png,.jpg,.jpeg' })
  const { checkIsNumber } = useCheckForm()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()

  const [formData, setFormData] = useState<{ [key: string]: any } | null>(null)
  const [loading, setLoading] = useState(false)

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
  }, [item])

  useEffect(() => {
    setFormData((pre) => ({
      ...pre,
      keyName: formData?.name.replaceAll(' ', '-'),
    }))
  }, [formData?.name])

  const handleDeleteMoreImg = (index: number) => {
    const newList = formData?.imageMore?.filter(
      (_: any, indexFilter: number) => indexFilter !== index
    )
    setFormData({ ...formData, imageMore: newList })
  }

  const handleSubmit = async () => {
    setLoading(true)
    let data
    if (item) {
      const dataEdit: Record<string, any> = {}
      Object.keys(item).forEach((key) => {
        if (formData![key] && !isEqual(formData![key], item[key])) {
          dataEdit[key] = formData![key]
        }
      })
      if (Object.keys(dataEdit).length > 0) {
        data = await ClientApi.fetchData({
          url: `/product/update/${item._id}`,
          method: REQUEST_TYPE.POST,
          body: dataEdit,
        })
      }
      console.log({ dataEdit, formData })
    } else {
      data = await ClientApi.fetchData({
        url: '/product/create',
        method: REQUEST_TYPE.POST,
        body: formData,
      })
    }

    if (data?.data) {
      showNotificationSuccess(
        translate(item ? 'success.update' : 'success.create')
      )
      refreshQuery(QUERY_KEY.GetListProductAdmin)
      closeModalDrawer()
    } else {
      showNotificationError(translate('errors.create'))
    }
    setLoading(false)
  }

  return formData ? (
    <MyForm
      onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
      formData={formData}
      onFinish={handleSubmit}
      className="!overflow-auto gap-2"
    >
      <div className="flex flex-col gap-2 w-full flex-1 overflow-y-auto ">
        <div className="flex gap-4 w-full">
          <InputForm
            classFromItem="w-full"
            name="name"
            label={translate('header.name')}
            required
          />
          <CategoryForm
            label={translate('menuProduct.category')}
            name="category"
          />
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
            label={translate('textPopular.cost')}
            required
            typeBtn="number"
            validator={checkIsNumber}
          />

          <InputForm
            classFromItem="w-full"
            name="price"
            label={translate('productDetail.price')}
            required
            typeBtn="number"
            validator={checkIsNumber}
          />
        </div>
        <div className="flex gap-4 w-full">
          <InputForm
            classFromItem="w-full"
            name="disCount"
            label={translate('textPopular.disCount')}
            required
            typeBtn="number"
            validator={checkIsNumber}
          />

          <InputForm
            classFromItem="w-full"
            name="weight"
            label={translate('productDetail.weight')}
            required
            disable={!!item}
          />
        </div>
        <div className="flex gap-3 justify-between  mt-2">
          <div className="flex flex-col  w-[150px]   justify-between items-center">
            <div className="w-[100px]">
              <UploadImage
                maxSizeOutputKB={500}
                typeFile={typeFile}
                fullQuality
                handleUpload={(e) => setFormData({ ...formData, imageMain: e })}
              >
                <div className="flex gap-2">
                  <CameraOutlined />
                  <span>Hình chính</span>
                </div>
              </UploadImage>
            </div>

            <div className="w-[150px] flex justify-center ">
              {(formData?.imageMain?.base64 || formData?.imageMain) && (
                <div className="w-[100px] aspect-square overflow-hidden">
                  <Image
                    alt="img-main"
                    src={detectImg(
                      formData?.imageMain?.base64 || formData?.imageMain
                    )}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[calc(100%-200px)] h-full flex flex-col  gap-3 justify-between items-center">
            <div className="w-full">
              <UploadImage
                typeFile={typeFile}
                listData={formData?.imageMore || []}
                fullQuality
                handleUpload={(e) =>
                  setFormData({
                    ...formData,
                    imageMore: [...formData.imageMore, e],
                  })
                }
                maxSizeOutputKB={300}
              >
                <div className="flex w-full gap-2 justify-center items-center">
                  <CameraOutlined />
                  <span>Hình phụ</span>
                </div>
              </UploadImage>
            </div>
            <div className="flex flex-nowrap gap-3 overflow-scroll w-full ">
              {formData?.imageMore &&
                formData?.imageMore.map((e: any, index: number) => {
                  return (
                    <div className="w-[100px]" key={detectImg(e?.base64 || e)}>
                      <div className="w-[100px] relative">
                        <Image
                          className="w-[100px]"
                          alt={`img-moew-${e?.name}`}
                          src={detectImg(e?.base64 || e)}
                        />
                        <CloseCircleOutlined
                          onClick={() => handleDeleteMoreImg(index)}
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
        <div className="w-full md:mt-10" />

        <InputForm
          classFromItem="w-full"
          name="des2"
          label="des2"
          required
          typeBtn="area"
          rows={6}
        />
      </div>

      <div className="flex flex-1 w-full">
        <ButtonForm
          titleSubmit={translate(item ? 'common.update' : 'common.create')}
          loading={loading}
        />
      </div>
    </MyForm>
  ) : (
    <></>
  )
}

export default ProductConfig
