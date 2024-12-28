'use client'
import { FirebaseServices } from '@/services/firebaseService'
import { Button } from 'antd'
import { RecaptchaVerifier } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const AptCha = () => {
  const [numberPhone] = useState('+84392225405')

  useEffect(() => {
    const auth = FirebaseServices.initAuth()
    let recaptchaVerifier: RecaptchaVerifier

    setTimeout(() => {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })

      window.recaptchaVerifier = recaptchaVerifier
    })

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier?.clear()
      }
    }
  }, [])

  const submit = async () => {
    console.log({ recaptchaVerifier: window.recaptchaVerifier })

    FirebaseServices.sendNumberToGetOtp(numberPhone)
  }

  return (
    <div>
      <div id='recaptcha-container'></div>
      <Button onClick={submit}>submit</Button>
      <Button
        className='g-recaptcha'
        data-sitekey='6LduyKcqAAAAADr61HAi3H68cCPL4JG0Jw_M1CNr'
        data-callback='onSubmit'
        data-action='submit'
      >
        submit
      </Button>
    </div>
  )
}

export default AptCha
