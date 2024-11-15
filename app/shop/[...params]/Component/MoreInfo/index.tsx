import React from 'react'
import { ItemDetailType } from '../../type'
import InfoDetail from '../InfoDetail'
import { Tabs, TabsProps } from 'antd'
import Comment from '@/components/Comment'
import useLanguage from '@/hook/useLanguage'

const MoreInfo = ({ data }: { data: ItemDetailType }) => {
  const { translate } = useLanguage()

  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: translate('textPopular.infor'),
      children: <InfoDetail dataItem={data} />,
    },
    {
      key: 'Comment',
      label: translate('textPopular.comment'),
      children: <Comment dataItem={data} />,
    },
  ]

  return <Tabs className="p-0" items={items} />
}

export default MoreInfo
