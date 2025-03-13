import { FilterAPI } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import React, { useMemo } from 'react'
import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import useMedia from '@/hooks/useMedia'

const MenuCategory = () => {
  const { translate, lang } = useLanguage()
  const { categoryMenu } = useCategoryMenu()
  const { isMobile } = useMedia()
  const itemMenu = useMemo(() => {
    return categoryMenu.map((e) => {
      return {
        value: e.keyName,
        label: e.keyName,
        name: e?.lang?.[lang],
      }
    })
  }, [categoryMenu, lang])

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={itemMenu || []}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.Category}
        isReplace={false}
        isDefault={!isMobile}
      />
    </MyFilter>
  )
}

export default MenuCategory
