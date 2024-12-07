import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import useLanguage from '@/hook/useLanguage'
import React from 'react'
type ISexProps = {
  data: any
  onChange: (param?: any) => void
}
const Sex = ({ data, onChange }: ISexProps) => {
  const { translate } = useLanguage()
  const items: ItemCollapseProps = [
    {
      key: 'sex',
      label: <div>{translate('userDetail.sex')} </div>,
      children: <div className='flex flex-col gap-2'>{`st Sex = ({ data, onChange }:`}</div>,
    },
  ]

  return <MyCollapse items={items} className='!bg-[#f3efef]' />
}

export default Sex
