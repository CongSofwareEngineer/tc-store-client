import { Button, FileButton } from '@mantine/core'
import React, { useMemo } from 'react'
import CropImg from '../CropImg'
import { AiOutlineUpload } from 'react-icons/ai'
import { isIOS, isMacOs } from 'react-device-detect'
import { MAX_PIXEL_REDUCE } from '@/constants/app'
import { useModalAdmin } from '@/zustand/useModalAdmin'

export type IFileImage = { type?: string; base64?: string; name: string; file: File }

type IUploadImage = {
  callback: (param: IFileImage) => any
  disabled?: boolean
  children?: React.ReactNode
  fullQuality?: boolean
  maxPixelReduce?: number
  maxSizeOutputKB?: number
}
const UploadImage = ({
  callback,
  children = null,
  disabled = false,
  maxSizeOutputKB = 15,
  fullQuality = false,
  maxPixelReduce = MAX_PIXEL_REDUCE,
}: IUploadImage) => {
  const { openModal, closeModal } = useModalAdmin()
  const typeFile = useMemo(() => {
    if (isIOS || isMacOs) {
      return 'image/*'
    }

    return '.png,.jpg,.jpeg,.gif,.svg'
  }, [])

  const handleUploadImg = (file: File | null) => {
    const callbackCrop = async (fileCrop: IFileImage | null) => {
      // console.log({ fileCrop })
      // const formData = new FormData()
      // formData.append('file', file!)

      callback(fileCrop!)
      closeModal()
    }

    openModal({
      body: (
        <CropImg file={file!} fullQuantity={fullQuality} maxScale={maxPixelReduce} maxSizeOutputKB={maxSizeOutputKB} onCropComplete={callbackCrop} />
      ),
      title: 'Cắt ảnh',
      overClickClose: false,
      showBtnClose: false,
    })
  }

  return (
    <FileButton accept={typeFile} disabled={disabled} onChange={handleUploadImg}>
      {(props) => (
        <Button
          {...props}
          className='!p-0 !bg-transparent'
          disabled={disabled}
          style={{
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {children || (
            <div className='text-white !text-2xl cursor-pointer transition-all duration-300 hover:!text-3xl'>
              <AiOutlineUpload />
            </div>
          )}
        </Button>
      )}
    </FileButton>
  )
}

export default UploadImage
