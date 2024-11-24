import useLanguage from '@/hook/useLanguage'
import { useState } from 'react'
import { images } from '@/configs/images'
import useModalDrawer from '@/hook/useModalDrawer'
import Image from 'next/image'
import { Button } from 'antd'

type ModalDeleteType = {
  des?: string
  callback?: (param?: any) => Promise<void> | void
  title?: string
  titleConfirm?: string
  autoClose?: boolean
}
const ModalDelete = ({
  des = '',
  title = '',
  titleConfirm = '',
  callback = () => {},
  autoClose = true,
}: ModalDeleteType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    if (callback) {
      await callback()
    }
    setLoading(false)
    autoClose && closeModalDrawer()
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-title text-center">
        {title || translate('warning.doYouWantDetele')}
      </p>

      <div className="m-auto my-2">
        <Image
          fill
          src={images.icon.iconWarning}
          alt="icon-modal-delete"
          className="!relative !w-auto md:!h-[120px] !h-[70px]"
        />
      </div>
      <div className="text-center mb-2 md:max-w-[90%] m-auto">{des}</div>
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <Button className="w-full" loading={loading} onClick={handleSubmit}>
            {titleConfirm || translate('common.ok')}
          </Button>
        </div>
        <div className="flex-1">
          <Button
            disabled={loading}
            type="primary"
            className="w-full"
            onClick={closeModalDrawer}
          >
            {translate('common.close')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
