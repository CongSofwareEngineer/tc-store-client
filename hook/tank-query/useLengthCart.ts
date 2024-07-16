import { QueryKey } from '@/constant/reactQuery'
import ServerApi from '@/services/serverApi'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any) => {
  const lengthCart = await ServerApi.requestBase({
    url: `/cart/length-cart/${queryKey[1]}`
  })

  return lengthCart?.data || 0

}
const useLengthCart = (id = '') => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.LengthCartUser, id],
    enabled: !!id,
    queryFn: getData
  })
  return {
    data, isLoading
  }
}

export default useLengthCart