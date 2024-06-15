import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const useRefreshQuery = () => {
  const queryClient = useQueryClient()
  const refreshQuery = useCallback((key: string) => {
    queryClient.invalidateQueries({ queryKey: [key] })
  },
    [queryClient]
  )
  return { refreshQuery }

}

export default useRefreshQuery