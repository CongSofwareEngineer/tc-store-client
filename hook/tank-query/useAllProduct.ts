
import { PageSizeLimit } from '@/constant/app';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';


const getAllProduct = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  const query = queryKey[3]
  const { category = [] } = query

  let queryUrl = `?page=${queryKey[1]}&limit=${queryKey[2]}`

  if (category?.length > 0) {
    queryUrl += `&category=${category.toString()}`
  }
  const dataServer = await ServerApi.requestBase({
    url: `product/list-product${queryUrl}`,
  })

  return {
    "data": dataServer.data || [],
    "page": queryKey[1],
    totalPage: 1
  }
};
const useAllProduct = (page = 1, pageSize = PageSizeLimit, query: any) => {
  // const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: [QueryKey.GetAllProduct, query],
  //   initialPageParam: true,
  //   queryFn: getAllProduct,
  //   getNextPageParam: (lastPage: {
  //     data: any; totalPage: number, page: number
  //   }) => {
  //     console.log({ lastPage });

  //     return lastPage?.totalPage > lastPage?.page
  //   },
  // })
  // console.log({ data });


  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetProductShop, page, pageSize, query],
    queryFn: getAllProduct,
    enabled: !!query
  })

  return {
    data,
    isLoading
  }
}

export default useAllProduct
