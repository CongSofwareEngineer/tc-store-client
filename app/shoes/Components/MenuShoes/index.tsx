import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'
import MyFilterRange from '@/components/MyFilterRange'
import { DEFAULT_VALUE_RANGE, FilterAPI } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import React from 'react'

const MenuShoes = () => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const menuShoes = [
    {
      value: 'male',
      label: translate('textPopular.male'),
    },
    {
      value: 'female',
      label: translate('textPopular.female'),
    },
  ]

  return (
    <MyFilter titleHeader={translate('menuProduct.category')}>
      <MyFilterCheckBox
        data={menuShoes}
        titleFilter={translate('menuProduct.product')}
        typeChecked={FilterAPI.Sex}
        isReplace={false}
        isDefault={!isMobile}
      />

      <MyFilterRange
        keyMax='maxSize'
        keyMin='minSize'
        maxSlider={DEFAULT_VALUE_RANGE.Shoes.maxSize}
        minSlider={DEFAULT_VALUE_RANGE.Shoes.minSize}
        title={translate('textPopular.size')}
        isDefault={!isMobile}
      />

      <MyFilterRange
        isDefault={!isMobile}
        stepRange={100000}
        keyMax='maxPrice'
        keyMin='minPrice'
        maxSlider={DEFAULT_VALUE_RANGE.Price.max}
        minSlider={DEFAULT_VALUE_RANGE.Price.min}
        title={`${translate('productDetail.price')} (VNĐ)`}
      />
    </MyFilter>
  )
}

export default MenuShoes
