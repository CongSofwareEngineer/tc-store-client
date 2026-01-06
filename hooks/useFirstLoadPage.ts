import { useEffect } from 'react'

import { OBSERVER_KEY } from '@/constants/app'
import ObserverService from '@/services/observer'

const useFirstLoadPage = () => {
  useEffect(() => {
    ObserverService.emit(OBSERVER_KEY.FirstLoadPage)
  }, [])
}

export default useFirstLoadPage
