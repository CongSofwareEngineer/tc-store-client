import { PageSizeLimit } from '@/constant/app';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import useUserData from '../useUserData';
import { useInfiniteQuery } from '@tanstack/react-query';
import ServerApi from '@/services/serverApi';
import { useMemo } from 'react';

// const getData = async ({ queryKey, pageParam = 0 }: any): Promise<TypeHookReactQuery> => {
const getData = async (params: any): Promise<TypeHookReactQuery> => {
  console.log('====================================');
  console.log({ params });
  console.log('====================================');
  // console.log({ queryKey, pageParam });

  // const queryData = `page=${queryKey[2]}&limit=${queryKey[3]}`
  // const res = await ServerApi.requestBase({
  //   url: `/cart-user/${queryKey[1]}?${queryData}`,
  // })
  // console.log('====================================');
  // console.log({ res });
  // console.log('====================================');

  // return res.data || [];
  return [];
}

const useMyCart = (pageLimit = PageSizeLimit, page = 1) => {
  const { userData } = useUserData()
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKey.GetAllProduct, userData?.id?.toString(), page, pageLimit],
    queryFn: (data) => {
      const param = { ...data }
      if (param.pageParam === true) {
        console.log({ param });

        param.queryKey[3] = Number(param.queryKey[3]) + 1

      }
      getData(data)
    },
    getNextPageParam: (lastPage: any) => {
      console.log('====================================');
      console.log({ lastPage });
      console.log('====================================');
      // return lastPage?.totalPage > lastPage?.page
      return false
    },
    initialPageParam: 1,
    enabled: !!userData?.id

  })

  console.log({ data });


  return {
    data, isLoading, refetch, fetchNextPage, isFetchingNextPage, hasNextPage
  }
}

export default useMyCart