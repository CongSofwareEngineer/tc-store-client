import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';
const getAllProduct = async ({ QUERY_KEY }: any): Promise<TypeHookReactQuery> => {
  const res = await ServerApi.getProduct(QUERY_KEY[1]?.trim() || '')

  return res.data || [];
};
const useComment = (query = '') => {
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetCommentProduction, query],
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