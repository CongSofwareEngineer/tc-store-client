import useLanguage from '@/hook/useLanguage'
import { useState } from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import useModalDrawer from '@/hook/useModalDrawer'
import MyButton from '../MyButton'
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
        <MyImage
          src={images.icon.iconWarning}
          alt="icon-modal-delete"
          widthImg={'auto'}
          className=" md:!h-[120px] !h-[70px]"
        />
      </div>

      <div className="text-center mb-2 md:max-w-[90%] m-auto">{des}</div>
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <MyButton loading={loading} widthBtn="100%" onClick={handleSubmit}>
            {titleConfirm || translate('common.ok')}
          </MyButton>
        </div>
        <div className="flex-1">
          <MyButton
            disabled={loading}
            type="primary"
            widthBtn="100%"
            onClick={closeModalDrawer}
          >
            {translate('common.close')}
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
