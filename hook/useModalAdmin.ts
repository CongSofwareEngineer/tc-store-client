import { SLICE, TYPE_PERSIST_REDUCER } from '@/constant/redux'
import { setModal } from '@/redux/modalAdminSlice'
import { useDispatch } from 'react-redux'

const useModalAdmin = () => {
  const dispatch = useDispatch()

  const openModal = (param: TYPE_PERSIST_REDUCER[SLICE.ModalAdmin]) => {
    const {
      title = '',
      open = true,
      body,
      className = '',
      width = '500px',
      height = '',
      callBackAfter = () => {},
      classNameContent = '',
      overClickClose = true,
      showBtnClose = true,
    } = param
    dispatch(
      setModal({
        open,
        body,
        className,
        width,
        height,
        callBackAfter,
        title,
        classNameContent,
        overClickClose,
        showBtnClose,
      }),
    )
  }
  const closeModal = () => {
    dispatch(
      setModal({
        open: false,
        body: null,
        className: '',
        width: '500px',
        height: 'auto',
        classNameContent: '',
        overClickClose: true,
        title: '',
        showBtnClose: true,
      }),
    )
  }

  return {
    openModal,
    closeModal,
  }
}

export default useModalAdmin
