import useModalAdmin from '@/hook/useModalAdmin'
import { useAppSelector } from '@/redux/store'
import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

const MyModalAdmin = () => {
  const { closeModal } = useModalAdmin()
  const { ModalAdmin } = useAppSelector((state) => state.app)

  const onClick = (event: any) => {
    if (event.target === event.currentTarget) {
      if (!ModalAdmin.overClickClose) {
        closeModal()
      }
    } else {
      console.log('Child element clicked!')
    }
  }
  return ModalAdmin.body ? (
    <div
      onClick={onClick}
      className='fixed z-[9999999] flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-black/20 '
    >
      <div
        className={`md:w-[500px] w-[90dvw] animate-zoom  transition-all duration-500 relative flex flex-col justify-center items-center bg-white rounded-xl p-5 ${ModalAdmin.className}`}
      >
        {ModalAdmin.showBtnClose && (
          <div className='absolute z-10 text-xl right-5 top-5 flex justify-end'>
            <CloseOutlined
              className='cursor-pointer'
              onClick={() => {
                closeModal()
                if (ModalAdmin?.callBackAfter) {
                  ModalAdmin.callBackAfter()
                }
              }}
            />
          </div>
        )}
        {ModalAdmin.title && <div className='text-medium mb-2 font-bold w-full'>{ModalAdmin.title}</div>}
        {ModalAdmin.body}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default MyModalAdmin
