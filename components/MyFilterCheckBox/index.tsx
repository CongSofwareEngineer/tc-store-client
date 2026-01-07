import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useQuerySearch from '@/hooks/useQuerySearch'
import { Checkbox } from '@mantine/core'
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
  const { isClient } = useMedia()

  const renderContent = () => {
    return (
      <div className='w-full flex gap-1 md:pb-3   md:flex-col  flex-wrap'>
        {data.map((menu, index: number) => {
          return (
            <div key={`menu_${typeChecked}_${index}`} className={`md:w-full px-4 py-2  md:border-b-lime-200 ${index !== data.length - 1 && ' '}`}>
              <Checkbox
                key={`menu_${typeChecked}_${index}_${queries?.[typeChecked]?.includes(menu?.value || menu.key)}`}
                checked={queries?.[typeChecked]?.includes(menu?.value || menu.key)}
                label={<div className='whitespace-nowrap'>{menu.name || menu.label}</div>}
                onChange={() => updateQuery(typeChecked, menu?.value || menu.key, isReplace)}
              />
            </div>
          )
        })}
        {data.length === 0 && <div className='pl-[10px]'>Đang phát triển</div>}
      </div>
    )
  }

  return isClient ? (
    <MyCollapse
      isDefaultActive={isDefault}
      noBorderBottom={noBorderBottom}
      title={
        <div className='flex items-center flex-1'>
          <div className='flex justify-between items-center'>
            <div className='text-medium '>{titleFilter || translate('menuProduct.category')}</div>
          </div>
        </div>
      }
    >
      {renderContent()}
    </MyCollapse>
  ) : (
    <></>
  )
}

export default MyFilterCheckBox
