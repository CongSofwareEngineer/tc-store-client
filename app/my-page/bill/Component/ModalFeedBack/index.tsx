import ClientApi from '@/services/clientApi'
import { detectImg } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import ImageNext from 'next/image'
import React, { useEffect, useState } from 'react'
import ViewDetailBill from '../ViewDetailBill'
import useUserData from '@/hooks/useUserData'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useCommentDetail from '@/hooks/tank-query/useCommentDetail'
import { DataAddComment } from '@/constants/mongoDB'
import { QUERY_KEY } from '@/constants/reactQuery'
import { AiOutlineArrowLeft, AiOutlineCamera, AiOutlineCloseCircle } from 'react-icons/ai'
import MyLoading from '@/components/MyLoading'
import { Button, Rating, Textarea } from '@mantine/core'
import UploadImage, { IFileImage } from '@/components/UploadImage'
import MyImage from '@/components/MyImage'

const ModalFeedBack = ({ data, item }: { data: any; item: any }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()
  const { data: dataGetApi, isLoading: loadingAPI } = useCommentDetail(data._id)

  const [listImgFeeBack, setListImgFeeBack] = useState<IFileImage[]>([])
  const [loading, setLoading] = useState(false)
  const [rate, setRate] = useState(5)
  const [des, setDes] = useState('')

  console.log({ listImgFeeBack, rate, des })

  useEffect(() => {
    const getData = async () => {
      setListImgFeeBack(dataGetApi.listImg || [])
      setDes(dataGetApi.note || '')
      setRate(Number(dataGetApi.rate || 5))
    }
    dataGetApi && getData()
  }, [dataGetApi])

  const handleUpload = async (file: IFileImage) => {
    setListImgFeeBack([...listImgFeeBack, file])
  }

  const deleteImg = (index: number) => {
    const data = listImgFeeBack.filter((_: any, indexFilter: number) => indexFilter !== index)
    setListImgFeeBack(data)
  }

  const getDataToUpdate = () => {
    const dataFile: { [key: string]: any } = {}

    if (des !== dataGetApi?.note) {
      dataFile.note = des
    }
    if (rate !== Number(dataGetApi?.rate)) {
      dataFile.rate = rate
    }

    dataFile.listImg = listImgFeeBack

    dataFile.imagesDelete = dataGetApi?.listImg.filter((e: any) => {
      const isExited = listImgFeeBack.find((eApi) => {
        return eApi === e
      })

      return !isExited
    })

    return dataFile
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let res
      const arrImg = listImgFeeBack.map((e) => {
        delete e.base64
        delete e.type
        return e
      })
      const body: DataAddComment = {
        idProduct: data._id,
        listImg: arrImg,
        note: des,
        name: userData?.name,
        rate: Number(rate),
        sdt: userData?.sdt,
      }

      if (dataGetApi?.note) {
        res = await ClientApi.updateComment(dataGetApi._id, getDataToUpdate())
      } else {
        res = await ClientApi.createComment(body)
      }

      if (res?.data) {
        await refreshQuery(QUERY_KEY.MyBillUser)
        showNotificationSuccess(translate('success.feedback'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('error.feedback'))
      }
    } catch {
      showNotificationError(translate('error.feedback'))
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    openModalDrawer({
      content: <ViewDetailBill data={item} />,
      useDrawer: true,
      title: translate('textPopular.viewDetail'),
    })
  }

  const getQuality = () => {
    if (rate >= 4) {
      return translate('comment.veryGood')
    }
    if (rate >= 3) {
      return translate('comment.good')
    }

    if (rate >= 2) {
      return translate('comment.wellwell')
    }
    return translate('comment.normal')
  }

  const renderListImg = () => {
    return (
      <div className='flex gap-3'>
        {listImgFeeBack.map((item: any, index: number) => (
          <div key={`img-${index}`} className='relative w-[70px] '>
            <MyImage alt='img' className='!w-[70px]' src={detectImg(item?.base64 || item)} />
            <AiOutlineCloseCircle
              onClick={() => deleteImg(index)}
              className='absolute text-[20px] z-10 cursor-pointer right-0 top-0'
            />
          </div>
        ))}
      </div>
    )
  }

  if (loadingAPI) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[350px]'>
        <div>
          <MyLoading />
        </div>
      </div>
    )
  }

  return (
    <div className='fex flex-col gap-3 '>
      <div
        onClick={handleBack}
        className='w-max mb-4 flex items-center gap-2 cursor-pointer font-bold'
      >
        <AiOutlineArrowLeft />
        <div>{translate('common.back')}</div>
      </div>
      <div className='flex gap-2'>
        <div className='md:w-[100px] w-[80px] aspect-square'>
          <ImageNext
            src={detectImg(data?.moreData?.imageMain)}
            alt={data.keyName}
            fill
            className='!relative '
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-lg'>{data?.moreData?.name}</div>
          <div>{getQuality()}</div>
          <Rating value={rate} onChange={(e) => setRate(e)} />
        </div>
      </div>
      <div className='mt-2 mb-1'>{`${translate('textPopular.note')} :`}</div>
      <Textarea onChange={(e) => setDes(e.target.value)} rows={3} value={des} maxLength={150} />
      <div className='mb-3' />
      {renderListImg()}
      <UploadImage
        callback={handleUpload}
        disabled={listImgFeeBack?.length >= 2}
        maxSizeOutputKB={200}
        maxPixelReduce={400}
      >
        <div className='flex gap-2 items-center w-full mt-3'>
          <AiOutlineCamera className='cursor-pointer' style={{ fontSize: 25, color: 'blue' }} />
          <div className='text-black'>{translate('comment.uploadImg_des')}</div>
        </div>
      </UploadImage>

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!des}
        className='mt-4 md:mb-0 mb-2 w-full mx-auto min-w-[50%]'
      >
        {dataGetApi?.note ? translate('common.update') : translate('common.save')}
      </Button>
    </div>
  )
}

export default ModalFeedBack
