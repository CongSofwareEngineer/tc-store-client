import { QUERY_KEY } from '@/constant/reactQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useRefreshQuery = () => {
  const queryClient = useQueryClient()
  const refreshQuery = useCallback((key: QUERY_KEY) => {
    queryClient.invalidateQueries({ queryKey: [key] })
  }, [queryClient])

  const refreshListQuery = useCallback((listKey: QUERY_KEY[]) => {
    queryClient.invalidateQueries({ queryKey: listKey })
  }, [queryClient])

  return { refreshQuery, refreshListQuery }

}

export default useRefreshQuery