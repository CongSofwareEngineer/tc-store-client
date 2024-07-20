import { PAGE_SIZE_LIMIT } from '@/constant/app';
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';
const getAllProduct = async ({ queryKey }: any): Promise<TypeHookReactQuery> => {
  const res = await ServerApi.getProduct(queryKey[1]?.trim() || '')

  return {
    data: res.data || [],
    page: 1
  };
};
const useComment = (query = '') => {
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetCommentProduction, query],
    initialPageParam: 1,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  return {
    data: data?.pages[0] || null,
    isLoading: isLoading || isFetchingNextPage,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}


export default useComment