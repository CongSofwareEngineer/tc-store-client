import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
const getAllProduct = async ({ queryKey }: any): Promise<TypeHookReactQuery> => {
  const res = await ServerApi.getProduct(queryKey[1]?.trim() || '')

  return res.data || [];
};
const useComment = (query = '') => {
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.GetCommentProduction, query],
    initialPageParam: false,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: {
      data: any; totalPage: number, page: number
    }) => lastPage?.totalPage > lastPage?.page,
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