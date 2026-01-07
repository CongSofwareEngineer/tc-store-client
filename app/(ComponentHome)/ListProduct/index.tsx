import ItemProduct from '@/components/ItemProduct'
import LoadingGetData from '@/components/LoadingGetData'
import MyCollapse from '@/components/MyCollapse'
import { FilterAPI } from '@/constants/app'
import useProductByLimit from '@/hooks/tank-query/useProductByLimit'
import useLanguage from '@/hooks/useLanguage'
import { getUrlProduct } from '@/utils/functions'
import Link from 'next/link'
import { AiOutlineRight } from 'react-icons/ai'
export type ListProductType = {
  title?: string
  type?: string
}

const ListProduct = ({ title, type = 'all' }: ListProductType) => {
  const { data, isLoading } = useProductByLimit(type, 5)
  const { translate } = useLanguage()

  const getUrl = () => {
    // if (type === TYPE_PRODUCT.shoes) {
    //   return 'shoes'
    // }
    return `shop?${FilterAPI.Category}=${type || 'all'}`
  }

  const renderListItem = () => {
    return (
      <div className='py-4 flex gap-3 md:gap-5 overflow-x-auto w-full'>
        <LoadingGetData colDesktop={5} loading={isLoading} />

        {Array.isArray(data?.data) &&
          data?.data?.map((item) => {
            return (
              <ItemProduct
                key={item.keyName}
                showFeedback
                showSold
                className={'w-[180px] md:w-[230px]   md:h-[350px]'}
                href={getUrlProduct(item)}
                item={item}
              />
            )
          })}

        {Array.isArray(data?.data) && data?.data?.length === 0 && <div>{translate('warning.noData')}</div>}
      </div>
    )
  }

  const renderTitle = () => {
    return (
      <div className='flex flex-1 justify-between'>
        <div>{title}</div>
        <Link
          className='text-medium flex items-center  cursor-pointer hover:font-semibold transition-all duration-300 font-bold  text-green-600'
          href={getUrl()}
          onClick={(event) => event.stopPropagation()}
        >
          <span> {translate('textPopular.viewMore')}</span>
          <AiOutlineRight className='text-sm ml-2' />
        </Link>
      </div>
    )
  }

  return (
    <MyCollapse isDefaultActive classNameTitle='pl-0' title={renderTitle()}>
      {renderListItem()}
    </MyCollapse>
  )
}

export default ListProduct
