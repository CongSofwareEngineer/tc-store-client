import useCartAdmin from '@/hook/tank-query/Admin/useCart'
import React from 'react'

const CartAdmin = () => {
  const { data } = useCartAdmin()
  console.log({ data })

  return <div>CartAdmin</div>
}

export default CartAdmin
