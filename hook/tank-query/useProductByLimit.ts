import fetchConfig from '@/configs/fetchConfig'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
 import { useQuery } from '@tanstack/react-query'

const getData = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  const queryUrl = `?page=1&limit=${queryKey[2]}&category=${queryKey[1].toString()}`
  const dataServer = await fetchConfig({
    url: `product/all${queryUrl}`,
  })
    
  return {
    "data": dataServer?.data || [],
    "page": 1,
  }
}

const useProductByLimit = (category?: string, limitItem = PAGE_SIZE_LIMIT) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetProductShop, category, limitItem],
    queryFn: getData,
    enabled: !!category
  })

  return {
    data,
    isLoading
  }
}

export default useProductByLimit