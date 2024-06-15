import MyFilter from '@/components/MyFilter'
import useLanguage from '@/hook/useLanguage'
import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import React from 'react'

const CategoryHome = () => {
  const { translate } = useLanguage()
  const { CategoryMenu } = useAppSelector((state) => state.app)
  console.log('====================================')
  console.log({ CategoryMenu })
  console.log('====================================')

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <div className="flex flex-col ">
        {CategoryMenu.map((e, index) => {
          return (
            <Link
              className={`text-black hover:text-black hover:font-semibold md:px-3 md:py-4 border-b-[1px] ${
                CategoryMenu.length - 1 !== index && 'border-green-300'
              }`}
              key={e.key}
              href={`/shop?typeProduct=${e.key}`}
            >
              <span className="hover:underline cursor-pointer">{e.name}</span>
            </Link>
          )
        })}
      </div>
    </MyFilter>
  )
}

export default CategoryHome
