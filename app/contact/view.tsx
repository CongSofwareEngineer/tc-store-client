'use client'
import ButtonForm from '@/components/Form/ButtonForm'
import InputForm from '@/components/Form/InputForm'
// import ModalProcess from '@/components/ModalProcess'
import MyForm from '@/components/Form/MyForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useAos from '@/hook/useAos'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const ModalProcess = dynamic(() => import('@/components/ModalProcess'), {
  ssr: true,
})
const ContactScreen = () => {
  useAos()
  const { isMobile } = useMedia()
  const router = useRouter()
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()
  const { userData } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const content = window.document.getElementsByClassName('main-content')[0]
    if (content) {
      content.classList.add('bg-custom-register')
    }

    const initData = {
      sdt: userData?.sdt || '',
      email: userData?.email || '',
      name: userData?.name || '',
      note: '',
    }
    setFormData(initData)

    return () => content.classList.remove('bg-custom-register')
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    openModalDrawer({
      content: <ModalProcess />,
      configModal: {
        overClickClose: false,
      },
    })
    setTimeout(() => {
      closeModalDrawer()
    }, 3000)
    setLoading(false)
  }

  return (
    <div className=" flex flex-col justify-center items-center h-full w-full gap-2">
      <div className="w-full flex  justify-between h-full items-center">
        {!isMobile && (
          <div
            data-aos="fade-right"
            className="flex-1 flex flex-col justify-center items-center max-w-[450px]"
          >
            <MyImage
              alt={'tc-store-logo-register'}
              className="cursor-pointer max-w-0["
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}

        <div
          data-aos="fade-left"
          className="flex flex-1 justify-start items-start md:w-fit w-full"
        >
          <div className="m-auto flex flex-col   md:w-[80%] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white">
            <h1 className="mb- uppercase font-bold text-center text-[16px]">
              {translate('header.contact')}
            </h1>
            <h2 className="opacity-0 h-0 w-0 overflow-hidden absolute -z-10">
              Liên hệ với Shop nếu cần có thắc mắc cũng như muốn hợp tác với
              Shop
            </h2>
            {formData && (
              <MyForm
                onValuesChange={(_, value) =>
                  setFormData({ ...formData, ...value })
                }
                formData={formData}
                onFinish={handleSubmit}
              >
                <InputForm
                  name="sdt"
                  required
                  disable={!!userData?.sdt}
                  validator={checkNumberPhone}
                  label={translate('productDetail.modalBuy.enterNumberPhone')}
                />

                <InputForm
                  name="name"
                  required
                  label={translate('productDetail.modalBuy.enterName')}
                />

                <InputForm name="email" label={'Email/ Gmail'} />
                <InputForm
                  typeBtn="area"
                  rows={5}
                  name="note"
                  label={translate('textPopular.note')}
                />
                <div className="md:mt-16 mt-6" />

                <ButtonForm
                  loading={loading}
                  classNameItem="w-full"
                  className="w-full"
                  disableClose
                  titleSubmit={translate('common.Send')}
                />
              </MyForm>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactScreen
