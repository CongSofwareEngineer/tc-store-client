import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { TypeHookReactQuery } from '@/constant/reactQuery';
type QueryPaginationType = {
  listQueryKey: any[],
  queryFn: (param?: any) => Promise<TypeHookReactQuery>,
  enabled?: any
}
const useQueryPagination = (param: QueryPaginationType) => {

  const [data, setData] = useState<TypeHookReactQuery | null>(null)

  const { data: dataAPI, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: param.listQueryKey,
    queryFn: param.queryFn,
    getNextPageParam: (last) => (last.page < last.totalPage ? last.page + 1 : null),
    initialPageParam: 1,
    enabled: !!param.enabled
  })

  useEffect(() => {
    if (dataAPI) {
      const dataList = dataAPI?.pages.flatMap(e => e.data)
      const moreData = dataAPI?.pages[dataAPI?.pages.length - 1]
      const dataFinal = {
        ...moreData,
        data: dataList,
      }
      setData(dataFinal)
    }
  }, [dataAPI])

  return {
    data,
    isLoading: isLoading || isFetchingNextPage,
    refreshData: refetch,
    loadMore: fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  }

}

export default useQueryPagination