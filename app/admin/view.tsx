import { FILTER_BILL, PAGE_SIZE_LIMIT } from '@/constant/app'
import useRevenue from '@/hook/tank-query/Admin/useRevenue'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { NextPage } from 'next'
import React from 'react'
import ModalViewBillDetail from './Component/ModalViewBillDetail'
import GraphRevenue from './Component/GraphRevenue'

const RevenueScreen: NextPage = () => {
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const { renderContent } = useSearchBaseAdmin({
    dateEnd: true,
    dateStart: true,
  })

  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } = useRevenue(PAGE_SIZE_LIMIT, queries)

  return (
    <div className='flex flex-col gap-3 w-full overflow-y-auto '>
      {/* {renderContent()} */}
      <GraphRevenue data={data} />
    </div>
  )
}

export default RevenueScreen
