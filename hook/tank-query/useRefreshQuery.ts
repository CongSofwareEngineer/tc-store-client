import { QUERY_KEY } from '@/constant/reactQuery'
import { useQueryClient } from '@tanstack/react-query'

const useRefreshQuery = () => {
  const queryClient = useQueryClient()

  const refreshQuery = async (key: QUERY_KEY) => {
    await queryClient.invalidateQueries({ queryKey: [key] })
  }

  const refreshListQuery = async (listKey: QUERY_KEY[]) => {
    await queryClient.invalidateQueries({ queryKey: listKey })
  }

  return { refreshQuery, refreshListQuery }
}

export default useRefreshQuery
