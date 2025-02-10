import useQuerySearch from '@/hook/useQuerySearch'
import { Checkbox } from 'antd'
import React from 'react'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import MyCollapse from '../MyCollapse'

type MyFilterCheckBox = {
  data?: Record<string, any>[]
  typeChecked?: string
  titleFilter?: string
  isDefault?: boolean
  isReplace?: boolean
  noBorderBottom?: boolean
}

const MyFilterCheckBox = ({
  data = [],
  typeChecked = '',
  titleFilter = '',
  isDefault = false,
  isReplace = true,
  noBorderBottom = false,
}: MyFilterCheckBox) => {
  const { queries, updateQuery } = useQuerySearch()
  const { translate } = useLanguage()
  const { isClient, isMobile } = useMedia()

  const renderContent = () => {
    return (
      <div className='w-full flex gap-1 md:pb-3   md:flex-col  flex-wrap'>
        {data.map((menu, index: number) => {
          return (
            <div
              className={`md:w-full px-4 py-2  md:border-b-lime-200 ${index !== data.length - 1 && ' '}`}
              key={`menu_${typeChecked}_${index}`}
            >
              <Checkbox
                checked={queries?.[typeChecked]?.includes(menu?.value || menu.key)}
                onChange={() => updateQuery(typeChecked, menu?.value || menu.key, isReplace)}
              >
                <div className='whitespace-nowrap'>{menu.name || menu.label}</div>
              </Checkbox>
            </div>
          )
        })}
        {data.length === 0 && <div className='pl-[10px]'>Đang phát triển</div>}
      </div>
    )
  }

  return isClient ? (
    <MyCollapse
      title={
        <div className='flex items-center flex-1'>
          <div className='flex justify-between items-center'>
            <div className='text-medium '>{titleFilter || translate('menuProduct.category')}</div>
          </div>
        </div>
      }
      noBorderBottom={noBorderBottom}
      isDefaultActive={isMobile ? false : isDefault}
    >
      {renderContent()}
    </MyCollapse>
  ) : (
    <></>
  )
}

export default MyFilterCheckBox
