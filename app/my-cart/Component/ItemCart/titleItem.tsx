import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import React from 'react'
import styled from 'styled-components'
const TR = styled.tr.attrs({ className: 'border-b-2 border-gray-300' })`
  th {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`
const TitleItem = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const renderDesktop = () => {
    return (
      <thead className="bg-green-100">
        <TR>
          <th />
          <th>{translate('textPopular.image')}</th>
          <th>{translate('textPopular.nameProduct')}</th>
          <th>{translate('productDetail.price')}</th>
          <th>{translate('textPopular.amount')}</th>
          <th>{translate('textPopular.totalMoney')}</th>
          <th>{translate('common.delete')}</th>
        </TR>
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
