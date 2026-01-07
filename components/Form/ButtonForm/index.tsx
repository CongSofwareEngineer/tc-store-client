import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import { cn } from '@/utils/tailwind'
import { Button, Group } from '@mantine/core'
import React from 'react'

type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  classBtnSubmit?: string
  classBtnCancel?: string
  disabledSubmit?: boolean
}

const ButtonForm = ({
  loading,
  disableClose = false,
  titleSubmit = '',
  titleClose = '',
  classBtnSubmit = '',
  classBtnCancel = '',
  disabledSubmit = false,
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <Group className='w-full ' justify='center'>
      <Button className={cn('flex flex-1 !w-full', classBtnSubmit)} disabled={disabledSubmit} loading={loading} type='submit'>
        {titleSubmit || translate('cart.payment')}
      </Button>
      {!disableClose && (
        <Button className={cn('flex flex-1', classBtnCancel)} variant='filled' onClick={closeModalDrawer}>
          {titleClose || translate('common.close')}
        </Button>
      )}
    </Group>
  )
}

export default ButtonForm
