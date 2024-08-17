import { useEffect } from 'react'
import useUserData from '../useUserData'
import { usePathname, useRouter } from 'next/navigation'
import useMyDrawer from '../useMyDrawer'

const useCheckPatchName = () => {
  const { isLogin } = useUserData()
  const patchName = usePathname()
  const router = useRouter()
  const {closeModalDrawer}=useMyDrawer()

  useEffect(() => {
    if (!isLogin) {
      switch (patchName) {
        case '/my-cart':
          router.push('/')
          break;
        case '/my-page':
          router.push('/')
          break;

      }
    } else {
      switch (patchName) {
        case '/register':
          router.push('/')
          break;

      }
    }

    const footer = window.document.getElementsByClassName('footer-web')[0]
    if (patchName.includes('/admin') || patchName.includes('/my-page') || patchName === '/my-cart' || patchName === '/register') {
      if (footer) {
        footer.classList.add('no-display')
      }
    } else {
      if (footer) {
        footer.classList.remove('no-display')
      }
    }
    closeModalDrawer()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, patchName, router])

}

export default useCheckPatchName