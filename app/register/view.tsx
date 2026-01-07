'use client'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '@mantine/core'
import dynamic from 'next/dynamic'

import { IFormRegister } from './type'

import useCheckForm from '@/hooks/useCheckForm'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import { BodyUserData } from '@/constants/firebase'
import { encryptData } from '@/utils/crypto'
import ClientApi from '@/services/clientApi'
import { showNotificationError } from '@/utils/notification'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import MyForm from '@/components/Form/MyForm'
// import InputForm from '@/components/Form/Input'
// import InputPasswordForm from '@/components/Form/InputPassword'
// import CheckboxForm from '@/components/Form/Checkbox'
// import ButtonForm from '@/components/Form/ButtonForm'
const CaptchaOtp = dynamic(() => import('@/components/CaptchaOtp'), { ssr: false })
const ButtonForm = dynamic(() => import('@/components/Form/ButtonForm'), { ssr: false })
const InputForm = dynamic(() => import('@/components/Form/Input'), { ssr: false })
const InputPasswordForm = dynamic(() => import('@/components/Form/InputPassword'), { ssr: false })
const CheckboxForm = dynamic(() => import('@/components/Form/Checkbox'), { ssr: false })

const RegisterScreen = () => {
  useFirstLoadPage()

  const [loadingRegister, setLoadingRegister] = useState(false)

  const { translate } = useLanguage()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const router = useRoutePage()
  const { checkNumberPhone, checkPassword, checkNameUser } = useCheckForm()
  const { isMobile } = useMedia()
  const { login } = useUserData()

  const form = useForm<IFormRegister>({
    initialValues: {
      name: '',
      pass: '',
      passAgain: '',
      saveLogin: true,
      sdt: '',
      sex: true,
    },
    validateInputOnChange: true,
    validate: {
      name: checkNameUser,
      pass: checkPassword,
      sdt: checkNumberPhone,
      passAgain: (pass, record: IFormRegister) => {
        if (record.pass !== pass) {
          return translate('warning.passAgain')
        }
      },
    },
  })

  useEffect(() => {
    const footer = window.document.getElementsByClassName('main-content')[0]

    if (footer) {
      footer.classList.add('bg-custom-register')
    }

    return () => footer.classList.remove('bg-custom-register')
  }, [])

  const handleRegister = async (formData: IFormRegister) => {
    const bodyUser: BodyUserData = {
      addressShipper: [],
      exp: 0,
      sdt: formData.sdt,
      sex: formData.sex,
      isAdmin: false,
      name: formData.name,
      pass: encryptData(formData.pass),
      avatar: '',
      address: '',
    }
    const newData = await ClientApi.register(bodyUser)

    if (!newData?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      await login(formData.sdt, formData.pass, !!formData?.saveLogin)
    }

    closeModalDrawer()
    setLoadingRegister(false)
  }

  const handleSubmit = async (formData: IFormRegister) => {
    setLoadingRegister(true)
    if (formData.pass !== formData.passAgain) {
      showNotificationError(translate('warning.passAgain'))
      setLoadingRegister(false)

      return
    }

    const isExitedSDT = await ClientApi.checkSDT(formData.sdt)

    setLoadingRegister(false)
    if (isExitedSDT?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      openModalDrawer({
        content: <CaptchaOtp callback={() => handleRegister(formData)} numberPhone={formData.sdt} />,
        title: translate('verifyNumberPhone.title'),
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })
    }
  }

  return (
    <div className='h-full max-w-[1000px] relative flex justify-center m-auto'>
      <div className='w-full flex justify-between h-full items-center'>
        {!isMobile && (
          <div className='flex-1 flex flex-col justify-center items-center max-w-[450px]' data-aos='fade-right'>
            <MyImage
              alt={'tc-store-logo-register'}
              className='cursor-pointer   !w-full !h-auto'
              src={images.logoStore}
              onClick={() => router.push('/')}
            />
          </div>
        )}

        <div className='flex justify-start items-start md:w-fit w-full' data-aos='fade-left'>
          <div className='m-auto flex flex-col md:w-[450px] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white'>
            <p className='mb-3 uppercase font-bold text-center text-[16px]'>{translate('register.title')}</p>
            <MyForm form={form} submit={handleSubmit}>
              <InputForm
                required
                formData={form}
                keyName='sdt'
                label={translate('productDetail.modalBuy.enterNumberPhone')}
                placeholder={translate('productDetail.modalBuy.enterNumberPhone')}
              />
              <InputForm
                required
                showCount
                formData={form}
                keyName='name'
                label={translate('productDetail.modalBuy.enterName')}
                maxLength={24}
                placeholder={translate('productDetail.modalBuy.enterName')}
              />
              <InputPasswordForm
                required
                formData={form}
                keyName='pass'
                label={translate('register.enterPassWord')}
                placeholder={translate('register.enterPassWord')}
              />
              <InputForm
                required
                formData={form}
                keyName='passAgain'
                label={translate('register.enterPassWordAgain')}
                placeholder={translate('register.enterPassWordAgain')}
              />
              <div className='flex gap-4 mb-2 mt-1 '>
                <Checkbox checked={form.values?.sex} label={translate('textPopular.male')} onChange={() => form.setFieldValue('sex', true)} />
                <Checkbox checked={!form.values?.sex} label={translate('textPopular.female')} onChange={() => form.setFieldValue('sex', false)} />
              </div>
              <div className='flex gap-2 justify-end my-5 relative top-[-5px]'>
                <div>{translate('register.saveRegister')}</div>
                <CheckboxForm
                  formData={form}
                  keyName='saveLogin'
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                />
              </div>
              <ButtonForm disableClose loading={loadingRegister} titleSubmit={translate('header.register')} />
            </MyForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
