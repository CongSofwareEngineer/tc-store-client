import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import ClientApi from '@/services/clientApi'
import { useEffect } from 'react'
import ModalDelete from '../ModalDelete'

const CheckPingServer = () => {
  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  useEffect(() => {
    ;(async () => {
      const res = await ClientApi.pingServer()

      if (!res?.data && process.env.NEXT_PUBLIC_ENABLE_CHECK_SERVER_WORKING) {
        openModalDrawer({
          content: (
            <ModalDelete
              disableCancel
              des={translate('pingServer.des')}
              title={translate('pingServer.title')}
              titleConfirm={translate('common.continue')}
            />
          ),
          configModal: {
            overClickClose: false,
            showBtnClose: false,
          },
        })
      }
    })()
  }, [])

  return <></>
}

export default CheckPingServer
