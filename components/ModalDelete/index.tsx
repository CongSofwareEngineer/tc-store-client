import useLanguage from '@/hook/useLanguage'
import { useState } from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import useModalDrawer from '@/hook/useModalDrawer'
type ModalDeleteType = {
  des?: string
  callback?: (param?: any) => Promise<void> | void
  title?: string
}
const ModalDelete = ({
  des = '',
  title = '',
  callback = () => {},
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
    closeModalDrawer()
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-title text-center">
        {title || translate('warning.doYouWantDetele')}
      </p>

      <div className="m-auto my-2">
        <MyImage
          src={images.icon.iconWarning}
          heightImage="120px"
          alt="icon-modal-delete"
        />
      </div>
      <div className="text-center mb-2 max-w-[90%] m-auto">{des}</div>
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <PrimaryButton
            loading={loading}
            className="w-full"
            onClick={handleSubmit}
          >
            {translate('common.ok')}
          </PrimaryButton>
        </div>
        <div className="flex-1">
          <SecondButton
            disabled={loading}
            className="w-full"
            onClick={closeModalDrawer}
          >
            {translate('common.close')}
          </SecondButton>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
