import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any) => {
  const data = await ClientApi.fetchData({
    url: `/product/detail/${queryKey[1]}`,
  })
  return data?.data || null
}
const useGetProductByID = (id = '') => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetProductByID, id],
    enabled: !!id,
    queryFn: getData,
  })
  return {
    data,
    isLoading,
  }
}

export default useGetProductByID
