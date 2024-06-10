
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';


const getAllProduct = async ({ queryKey }: any): Promise<TypeHookReactQuery> => {
  const res = await ServerApi.getProduct(queryKey[1] || '')

  return res.data || [];
};
const useAllProduct = (query = '') => {
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.GetAllProduct, query],
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

export default useAllProduct
