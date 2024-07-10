import { FilterAPI } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import { useAppSelector } from '@/redux/store'
import React, { useMemo } from 'react'
import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'

const MenuCategory = () => {
  const { translate, lang } = useLanguage()
  const { CategoryMenu } = useAppSelector((state) => state.app)

  const itemMenu = useMemo(() => {
    return CategoryMenu.map((e) => {
      return {
        value: e.keyName,
        label: e.keyName,
        name: e?.lang?.[lang],
      }
    })
  }, [CategoryMenu, lang])

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={itemMenu || []}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.Category}
      />
    </MyFilter>
  )
}

export default MenuCategory
