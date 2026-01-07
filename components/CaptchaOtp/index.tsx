import { Button, Input } from '@mantine/core'
import { Auth, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import OtpInput from 'react-otp-input'

import MyImage from '../MyImage'

import { FirebaseServices } from '@/services/firebaseService'
import useModalDrawer from '@/hooks/useModalDrawer'
import useLanguage from '@/hooks/useLanguage'
import { getPhoneFormat } from '@/utils/phone'

type CaptchaOtpProps = {
  callback?: (param?: any) => any
  numberPhone?: string
}
const CaptchaOtp = ({ numberPhone = '', callback }: CaptchaOtpProps) => {
  const [loadingCheckPinCode, setLoadingCheckPinCode] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isErrorCode, setIsErrorCode] = useState(false)
  const [otpReceived, setOtpReceived] = useState<ConfirmationResult | null>(null)
  const [pinCode, setPinCode] = useState<string>()
  const [isErrorManyRequest, setIsErrorManyRequest] = useState(false)
  const [phoneFormat] = useState(getPhoneFormat(numberPhone))

  const [reCaptchaVerifier, setReCaptchaVerifier] = useState<RecaptchaVerifier | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null)

  const { closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  // console.log({ phoneFormat })

  useLayoutEffect(() => {
    const auth = FirebaseServices.initAuth()

    setAuth(auth)
  }, [])

  useEffect(() => {
    let recaptChaClient: RecaptchaVerifier

    if (auth) {
      recaptChaClient = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })
      setReCaptchaVerifier(recaptChaClient)
    }

    return () => {
      if (recaptChaClient) {
        recaptChaClient?.clear()
      }
    }
  }, [auth])

  const handleSendOtp = async () => {
    try {
      setIsPending(true)
      const otpRes = await FirebaseServices.sendNumberToGetOtp(phoneFormat, auth!, reCaptchaVerifier!)

      setOtpReceived(otpRes)
    } catch (error) {
      // console.log('====================================')
      // console.log({ error })
      // console.log('====================================')
      setIsErrorManyRequest(true)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoadingCheckPinCode(true)
      if (otpReceived) {
        const isVerify = await otpReceived.confirm(pinCode!)

        // console.log('====================================')
        // console.log({ isVerify })
        // console.log('====================================')

        if (isVerify && callback) {
          await callback()
        }
      }
    } catch (error) {
      // console.log('====================================')
      // console.log({ error })
      // console.log('====================================')
      setIsErrorCode(true)
    } finally {
      setLoadingCheckPinCode(false)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='absolute opacity-0 z-[-1]' id='recaptcha-container' />
      <div className='flex relative justify-center mt-5 mb-2'>
        <OtpInput
          numInputs={6}
          renderInput={(props: any) => (
            <div className=' md:w-9 w-8 '>
              <Input {...props} className='border-2 !w-full border-gray-200' />
            </div>
          )}
          renderSeparator={<div className='mx-1 w-[10px] border-[1px] border-black' />}
          value={pinCode}
          onChange={setPinCode}
        />
        {!isPending && <div className='absolute w-full h-full cursor-not-allowed opacity-75' />}
      </div>
      {isPending && !isErrorManyRequest && (
        <div className='flex justify-center items-center'>
          <div className='md:w-[80px] w-[60px] aspect-square overflow-hidden relative '>
            <MyImage alt='loading' className='animate-spin3s' src={'https://smart.keyring.app/assets/images/Icon/ic_creating_passkey.png'} />
          </div>
        </div>
      )}
      <div className='text-center'>{translate('verifyNumberPhone.note')}</div>
      {isErrorCode && <div className='text-red-500 text-center'>{translate('errors.pinCode')}</div>}
      {isErrorManyRequest && <div className='text-red-500 text-center'>{translate('verifyNumberPhone.manyRequest')}</div>}
      <div className='flex gap-3 w-full'>
        {!isPending ? (
          <Button className='flex-1' onClick={handleSendOtp}>
            {translate('verifyNumberPhone.receiveCode')}
          </Button>
        ) : (
          <Button
            className='flex-1'
            disabled={isErrorManyRequest || !pinCode || pinCode?.length! < 6}
            loading={loadingCheckPinCode}
            onClick={handleVerifyOtp}
          >
            {translate('verifyNumberPhone.verifyCode')}
          </Button>
        )}

        <Button className='flex-1' variant='filled' onClick={closeModalDrawer}>
          {translate('common.close')}
        </Button>
      </div>
    </div>
  )
}

export default CaptchaOtp
