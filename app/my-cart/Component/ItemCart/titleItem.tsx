import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import React from 'react'

const TitleItem = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const renderDesktop = () => {
    return (
      <thead className="bg-green-100">
        <tr className="border-b-2 border-gray-300">
          <th />
          <th className="py-3">{translate('textPopular.image')}</th>
          <th className="py-3">{translate('textPopular.nameProduct')}</th>
          <th className="py-3">{translate('productDetail.price')}</th>
          <th className="py-3">{translate('textPopular.amount')}</th>
          <th className="py-3">{translate('textPopular.totalMoney')}</th>
          <th />
        </tr>
      </thead>
    )
  }

  const renderMobile = () => {
    return (
      <tr>
        <th className="pb-2" />
        <th className="pb-2">{translate('textPopular.image')}</th>
        <th className="pb-2">{translate('textPopular.description')}</th>
      </tr>
    )
  }
  return isMobile ? renderMobile() : renderDesktop()
}

export default TitleItem
