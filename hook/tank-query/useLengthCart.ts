import { QueryKey } from '@/constant/reactQuery'
import ServerApi from '@/services/serverApi'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any) => {
  const lengthCart = await ServerApi.getLengthCart(queryKey[1])
  return lengthCart

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