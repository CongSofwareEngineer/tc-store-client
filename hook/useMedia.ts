import { useLayoutEffect, useState } from 'react'
const defaultCheck = false
const useMedia = () => {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    let mounted = true;
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setIsMobile(!!mql.matches);
    };

    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };

  }, []);

  return {
    isMobile: isMobile || defaultCheck
  }
}

export default useMedia