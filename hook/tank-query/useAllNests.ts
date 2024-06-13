
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';


const getData = async ({ queryKey }: any): Promise<TypeHookReactQuery> => {
  const queryParam = `${queryKey[1] || ''}?typeProduct=nest`
  const res = await ServerApi.getProduct(queryParam)

  return res.data || [];
};
const useAllNests = (query = '') => {
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.GetAllNests, query],
    initialPageParam: false,
    queryFn: getData,
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

export default useAllNests
