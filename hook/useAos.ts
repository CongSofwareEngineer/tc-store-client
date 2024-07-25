import { useEffect } from 'react'
const useAos = (time = 1500) => {
  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Aos = require('aos')
    Aos.init({
      duration: time,
      disable: 'mobile'

    })
  }, [time])

}

export default useAos