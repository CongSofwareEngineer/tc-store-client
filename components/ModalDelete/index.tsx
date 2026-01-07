import useLanguage from '@/hooks/useLanguage'
import { useState } from 'react'
import { images } from '@/configs/images'
import useModalDrawer from '@/hooks/useModalDrawer'
import Image from 'next/image'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { Button } from '@mantine/core'

type ModalDeleteType = {
  des?: string
  callback?: (param?: any) => Promise<void> | void
  reject?: () => Promise<void> | void
  title?: string
  titleConfirm?: string
  titleReject?: string
  autoClose?: boolean
  isModalAdmin?: boolean
  disableCancel?: boolean
}
const ModalDelete = ({
  des = '',
  title = '',
  titleConfirm = '',
  callback = () => {},
  reject = () => {},
  titleReject = '',
  autoClose = true,
  isModalAdmin = false,
  disableCancel = false,
}: ModalDeleteType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { closeModal } = useModalAdmin()

  const [loading, setLoading] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    if (callback) {
      await callback()
    }
    setLoading(false)
    if (autoClose) {
      if (isModalAdmin) {
        closeModal()
      } else {
        closeModalDrawer()
      }
    }
  }

  const handleCancel = async () => {
    try {
      setLoadingReject(true)
      await reject()
      isModalAdmin ? closeModal() : closeModalDrawer()
      setLoadingReject(false)
    } catch {
      setLoadingReject(false)
    }
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-title text-center'>{title || translate('warning.doYouWantDetele')}</p>

      <div className='m-auto my-2'>
        <Image fill alt='icon-modal-delete' className='!relative !w-auto md:!h-[120px] !h-[70px]' src={images.icon.iconWarning} />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: des,
        }}
        className='text-center mb-2 md:max-w-[90%] m-auto'
      />
      <div className='w-full flex gap-4'>
        <div className='flex-1'>
          <Button className='!w-full' disabled={loadingReject} loading={loading} onClick={handleSubmit}>
            {titleConfirm || translate('common.ok')}
          </Button>
        </div>
        {!disableCancel && (
          <div className='flex-1'>
            <Button className='!w-full' disabled={loading} loading={loadingReject} variant='filled' onClick={handleCancel}>
              {titleReject || translate('common.close')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalDelete
