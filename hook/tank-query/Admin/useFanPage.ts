import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import AdminApi from '@/services/adminApi'
import { useQuery } from '@tanstack/react-query'

const getData = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  const res = await AdminApi.getFanPage()
  return {
    data: res?.data || [],
    page: 1,
  }
}

const useFanPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetFanPage],
    queryFn: getData,
  })

  return { data, isLoading }
}

export default useFanPage
