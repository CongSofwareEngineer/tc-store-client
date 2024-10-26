import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'

const getData = async ({
  queryKey,
}: {
  queryKey: any
}): Promise<TypeHookReactQuery> => {
  const query = queryKey[1]
  const { isShow } = query

  let queryUrl = `category/all`

  if (typeof isShow !== 'undefined') {
    queryUrl += `?isShow=${isShow}`
  }

  if (typeof isShow !== 'undefined') {
    queryUrl += `?isShow=${isShow}`
  }

  const dataServer = await ClientApi.fetchData({
    url: queryUrl,
  })

  return {
    data: dataServer?.data || [],
    page: 1,
  }
}
const useCategory = (query: any) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.GetCategoryAdmin, query],
    queryFn: getData,
  })

  return {
    data: data,
    isLoading: isLoading,
    refetch,
  }
}

export default useCategory
