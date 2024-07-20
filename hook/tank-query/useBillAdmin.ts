import ServerApi from "@/services/serverApi"
import useUserData from "../useUserData"
import { QUERY_KEY, TypeHookReactQuery } from "@/constant/reactQuery"
import { PAGE_SIZE_LIMIT } from "@/constant/app"
import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

const getData = async ({ queryKey, pageParam = 1 }: { queryKey: any, pageParam: any }): Promise<TypeHookReactQuery> => {
  const query = queryKey[2]
  const { type = null } = query
  console.log({ type });

  let queryUrl = `?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`
  if (type) {
    queryUrl += `&type=${type[0]}`
  }
  const dataServer = await ServerApi.requestBase({
    url: `bill/detail/${queryKey[1]}${queryUrl}`
  })

  return {
    "data": dataServer?.data || [],
    "page": pageParam,
  }
}

const useBillAdmin = (query: any = []) => {
  const { userData } = useUserData()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.BillAdmin, userData?._id, query],
    queryFn: getData,
    enabled: !!userData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
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