
import { PageSizeLimit } from '@/constant/app';
import { DataBase, FB_FC } from '@/constant/firebase';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import ClientApi from '@/services/clientApi';
import { useQuery } from '@tanstack/react-query';


const getAllProduct = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  // const res = await ServerApi.getProduct(queryKey[1]?.trim() || '')

  // return res.data || [];
  const query = queryKey[3]
  console.log({ query: queryKey[3] });
  const dataServer = await ClientApi.reqServerFB({
    nameDB: DataBase.productShop,
    body: {
      id: queryKey[1],
      data: {
        page: queryKey[1],
        limit: queryKey[2],
      },
      queryListData: query?.typeProduct || []
    },
    namFn: FB_FC.getProductShop
  })
  console.log({ dataServer });

  if (dataServer.data) {
    return {
      ...dataServer.data
    }
  }

  return {
    "data": [],
    "totalPage": 1,
    "page": queryKey[1],
  }
};
const useAllProduct = (page = 1, pageSize = PageSizeLimit, query: any) => {
  // const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: [QueryKey.GetAllProduct, query],
  //   initialPageParam: true,
  //   queryFn: getAllProduct,
  //   getNextPageParam: (lastPage: {
  //     data: any; totalPage: number, page: number
  //   }) => lastPage?.totalPage > lastPage?.page,
  // })
  // console.log({ data });

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetProductShop, page, pageSize, query],
    queryFn: getAllProduct,

  })

  return {
    data,
    isLoading
  }
}

export default useAllProduct
