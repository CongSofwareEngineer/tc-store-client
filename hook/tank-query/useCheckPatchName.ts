import { useEffect } from 'react'
import useUserData from '../useUserData'
import { usePathname, useRouter } from 'next/navigation'

const useCheckPatchName = () => {
  const { isLogin } = useUserData()
  const patchName = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      switch (patchName) {
        case '/my-cart':
          router.push('/')
          break;

        default:
          break;
      }
    }

  }, [isLogin, patchName, router])

}

export default useCheckPatchName