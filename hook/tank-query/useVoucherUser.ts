import useUserData from '../useUserData'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'

const getData = async ({ queryKey }: { queryKey: any }): Promise<any[]> => {
  const data = await ClientApi.getVouchersByIdUser(queryKey[1])
  return data?.data || []
}

const useVoucherUser = () => {
  const { userData, isLogin } = useUserData()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.VoucherByIdUser, userData?._id],
    queryFn: getData,
    enabled: isLogin,
    initialData: [],
  })

  return {
    isLoading,
    data,
    refetch,
  }
}

export default useVoucherUser
