import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any) => {
  const lengthCart = await ClientApi.fetchData({
    url: `/cart/length-cart/${queryKey[1]}`,
  })

  return lengthCart?.data || { lengthCart: 0 }
}
const useLengthCart = (id = '') => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.LengthCartUser, id],
    enabled: !!id,
    queryFn: getData,
  })
  return {
    data,
    isLoading,
  }
}

export default useLengthCart
