import useBase64Img from '@/hook/useBase64Img'
import useLanguage from '@/hook/useLanguage'
import useTypeFile from '@/hook/useTypeFile'
import { showNotificationError } from '@/utils/functions'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { isEqual } from 'lodash'
import React from 'react'
type Props = {
  typeFile?: string
  children?: React.ReactNode
  disbale?: boolean
  handleUpload: (file: any) => Promise<void> | void
  maxSize?: number
  listData?: any[]
}
const UploadImage = ({
  children = <></>,
  disbale = false,
  typeFile = '',
  handleUpload,
  maxSize = 5,
  listData = [],
}: Props) => {
  const { translate } = useLanguage()
  const { getBase64 } = useBase64Img(maxSize)
  const { typeFile: typeFileBase } = useTypeFile()

  const handleLoadFile = (file: any) => {
    const callBack = (data: any) => {
      if (listData.some((e) => isEqual(e, data))) {
        showNotificationError(translate('errors.existFile'))
      } else {
        handleUpload(data)
      }
    }
    getBase64(file, callBack)
  }

  return (
    <ImgCrop
      aspect={1}
      quality={1}
      modalOk={translate('common.ok')}
      modalCancel={translate('common.close')}
      onModalOk={(file) => handleLoadFile(file)}
    >
      <Upload
        className="w-full flex justify-center items-center"
        disabled={disbale}
        showUploadList={false}
        accept={typeFile || typeFileBase}
      >
        <label
          className="cursor-pointer   edit-avatar flex w-full items-center justify-center gap-2 w-ful "
          htmlFor="avatar"
          style={{ opacity: disbale ? 0.5 : 1 }}
        >
          {children}
        </label>
      </Upload>
    </ImgCrop>
  )
}

export default UploadImage
