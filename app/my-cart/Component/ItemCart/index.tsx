import useLanguage from '@/hook/useLanguage'
import React from 'react'

const ItemCart = () => {
  const { translate } = useLanguage()
  return <div>{translate('addCart.addSuccess')}</div>
}

export default ItemCart
