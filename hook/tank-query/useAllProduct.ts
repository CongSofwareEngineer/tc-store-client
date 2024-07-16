
import { PageSizeLimit } from '@/constant/app';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';


const getAllProduct = async ({ queryKey, pageParam }: { queryKey: any, pageParam: number }): Promise<TypeHookReactQuery> => {
  const query = queryKey[2]
  const { category = [] } = query

  let queryUrl = `?page=${pageParam}&limit=${queryKey[1]}`

  if (category?.length > 0) {
    queryUrl += `&category=${category.toString()}`
  }
  const dataServer = await ServerApi.requestBase({
    url: `product/all${queryUrl}`,
  })

  return {
    "data": dataServer?.data || [],
    "page": pageParam,
  }
};
const useAllProduct = (pageSize = PageSizeLimit, query: any) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.GetAllProduct, pageSize, query],
    initialPageParam: 1,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == pageSize) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap(e => e.data)
    return dataFormat
  }, [data])


  return {
    data: dataFinal,
    isLoading: isFetchingNextPage || isLoading,
    loadMore: fetchNextPage,
    hasNextPage
  }
}

export default useAllProduct
