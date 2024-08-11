import useLanguage from '@/hook/useLanguage'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React from 'react'
type Props = {
  typeFile?: string
  children?: React.ReactNode
  disbale?: boolean
  handleUpload: (file: any) => Promise<void> | void
}
const UploadImage = ({
  children = <></>,
  disbale = false,
  typeFile = '',
  handleUpload,
}: Props) => {
  const { translate } = useLanguage()

  return (
    <ImgCrop
      aspect={1}
      quality={1}
      modalOk={translate('common.ok')}
      modalCancel={translate('common.close')}
      onModalOk={(file) => handleUpload(file)}
    >
      <Upload disabled={disbale} showUploadList={false} accept={typeFile}>
        <label
          className="edit-avatar flex items-center justify-center gap-2 w-ful "
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
