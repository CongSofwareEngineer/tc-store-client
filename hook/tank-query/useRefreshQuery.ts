import { QUERY_KEY } from '@/constant/reactQuery'
import { useQueryClient } from '@tanstack/react-query'

const useRefreshQuery = () => {
  const queryClient = useQueryClient()

  const refreshQuery = (key: QUERY_KEY) => {
    queryClient.invalidateQueries({ queryKey: [key] })
  }

  const refreshListQuery = (listKey: QUERY_KEY[]) => {
    queryClient.invalidateQueries({ queryKey: listKey })
  }

  return { refreshQuery, refreshListQuery }
}

export default useRefreshQuery
