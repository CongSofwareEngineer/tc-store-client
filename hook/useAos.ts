import { useEffect } from 'react'
const useAos = (time = 1500) => {
  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Aos = require('aos')
    setTimeout(() => {
      Aos.init({
        duration: time,
      })
    }, 500);
  }, [time])

}

export default useAos