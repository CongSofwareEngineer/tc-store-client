import { PageSizeLimit } from '@/constant/app';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import useUserData from '../useUserData';
import ServerApi from '@/services/serverApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const getData = async ({ queryKey, pageParam = 1 }: { queryKey: any, pageParam: any }): Promise<TypeHookReactQuery> => {
  const queryUrl = `?page=${pageParam}&limit=${queryKey[2]}`
  const dataServer = await ServerApi.requestBase({
    url: `cart/detail/${queryKey[1]}${queryUrl}`
  })

  console.log('====================================');
  console.log({ dataServer, url: `cart/detail/${queryKey[1]}${queryUrl}` });
  console.log('====================================');

  return {
    "data": dataServer?.data || [],
    "page": pageParam,
  }
}

const useMyCart = (pageSize = PageSizeLimit) => {
  const { userData, isLogin } = useUserData()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.MyCartUser, userData?._id, pageSize],
    queryFn: getData,
    enabled: isLogin,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == pageSize) {
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

export default useMyCart