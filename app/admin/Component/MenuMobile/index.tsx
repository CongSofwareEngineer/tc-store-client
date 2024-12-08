import useLanguage from '@/hook/useLanguage'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const MenuMobile = () => {
  const router = useRouter()
  const { translate } = useLanguage()
  const patchName = usePathname()

  const LIST_MENU = [
    {
      title: translate('admin.revenue'),
      url: '/admin',
    },
    {
      title: translate('bill.title'),
      url: '/admin/bill',
    },
    {
      title: translate('header.cart'),
      url: '/admin/cart',
    },
    {
      title: translate('textPopular.comment'),
      url: '/admin/comment',
    },
    {
      title: translate('textPopular.product'),
      url: '/admin/product',
    },
    {
      title: translate('menuProduct.category'),
      url: '/admin/category',
    },
    {
      title: translate('admin.subCategories'),
      url: '/admin/sub-categories',
    },
  ]
  return (
    <div className='flex w-full gap-3  flex-col  pt-4 pb-3  '>
      {LIST_MENU.map((e) => {
        return (
          <div key={e.url} className='w-auto'>
            <Link href={e.url} className={`${patchName === e.url ? 'font-bold underline' : ''}   text-black`}>
              {e.title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default MenuMobile
