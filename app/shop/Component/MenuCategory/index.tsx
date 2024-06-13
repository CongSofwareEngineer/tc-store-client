import { FilterAPI } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import { useAppSelector } from '@/redux/store'
import React from 'react'
import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'

const MenuCategory = () => {
  const { translate } = useLanguage()
  const { CategoryMenu } = useAppSelector((state) => state.app)
  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={CategoryMenu || []}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.TypeProduct}
      />
    </MyFilter>
  )
}

export default MenuCategory
