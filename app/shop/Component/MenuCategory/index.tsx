import { FilterAPI } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import React from 'react'
import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'

const MenuCategory = () => {
  const { translate, lang } = useLanguage()
  const { categoryMenu } = useCategoryMenu()
  const itemMenu = categoryMenu.map((e) => {
    return {
      value: e.keyName,
      label: e.keyName,
      name: e?.lang?.[lang],
    }
  })

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={itemMenu || []}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.Category}
        isReplace={false}
      />
    </MyFilter>
  )
}

export default MenuCategory
