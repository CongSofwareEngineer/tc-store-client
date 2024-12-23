import { useEffect } from 'react'
import useMedia from './useMedia'
const useAos = (time = 1000) => {
  const { isMobile } = useMedia()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Aos = require('aos')
    setTimeout(() => {
      Aos.init({
        duration: time,
      })
    }, 500)
  }, [time, isMobile])
}

export default useAos
