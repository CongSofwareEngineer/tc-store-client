import useLanguage from '@/hooks/useLanguage'
import useUserData from '@/hooks/useUserData'
import { encryptData } from '@/utils/crypto'
import { Button, PasswordInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'

const ModalEnterPassAgain = ({ callBack }: { callBack: () => void }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()

  const [passAgain, setPassAgain] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [passAgain])

  const handleSubmit = () => {
    if (userData?.pass === encryptData(passAgain)) {
      callBack()
    } else {
      setIsError(true)
    }
  }

  return (
    <div className='flex flex-col gap-2 justify-between'>
      <p className='text-medium text-center font-bold'>
        {translate('textPopular.enterPassToContinue')}
      </p>
      <div className='flex flex-col gap-2 w-full'>
        <div>{translate('userDetail.pass')} :</div>
        <PasswordInput
          type='password'
          className='!pb-0'
          maxLength={15}
          value={passAgain}
          onChange={(e) => setPassAgain(e.target.value)}
        />
        <span className='text-xs text-red-600 h-4'>
          {isError && translate('warning.inValidPassWordAgain')}
        </span>
        <div className='flex justify-center w-full mt-2'>
          <Button onClick={handleSubmit} className='!w-full'>
            {translate('common.ok')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalEnterPassAgain
