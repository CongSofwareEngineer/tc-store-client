import { OBSERVER_KEY } from '@/constant/app'
import ObserverService from '@/services/observer'
import { useRouter } from 'next/navigation'

const useRoutePage = () => {
  const router = useRouter()

  const push = (url: string = '') => {
    router.push(url)
    const urlPathName = url.replace(/\?.*$/, '')
    ObserverService.emit(OBSERVER_KEY.RoutePage, { url: urlPathName })
  }

  return {
    ...router,
    push,
  }
}

export default useRoutePage
