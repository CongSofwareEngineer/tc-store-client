import { PAGE_SIZE_LIMIT, REQUEST_TYPE } from "@/constant/app";
import { QUERY_KEY } from "@/constant/reactQuery";
import useUserData from "@/hook/useUserData";
import ServerApi from "@/services/serverApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";


const getData = async ({ queryKey, pageParam = 1 }: { queryKey: any, pageParam: any }): Promise<TypeHookReactQuery> => {
  try {
    const query = queryKey[1]
    const dateTime = queryKey[2]
    // const { type = null } = query
    // console.log({ type, dateTime });

    let queryUrl = `?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`
    // if (type) {
    //   queryUrl += `&type=${type[0]}`
    // }
    if (dateTime) {
      queryUrl += `&date=${dateTime}`
    }

    console.log({ queryUrl });

    const dataServer = await ServerApi.requestBase({
      url: `bill/all${queryUrl}`,

    })
    console.log('====================================');
    console.log({ dataServer });
    console.log('====================================');

    return {
      "data": dataServer?.data || [],
      "page": pageParam,
    }
  } catch (error) {
    console.log({ error });

    return {
      "data": [],
      "page": pageParam,
    }
  }
}

const useBillAdmin = (query: any = [], dateTime = '') => {
  const { isLogin } = useUserData()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.BillAdmin, query, dateTime],
    queryFn: getData,
    enabled: !!isLogin,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    console.log({ data });

    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e: any) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  }
}

export default useBillAdmin