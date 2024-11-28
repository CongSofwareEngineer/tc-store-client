'use client'
import { images } from '@/configs/images'
import useMedia from '@/hook/useMedia'
import { ellipsisText, viewExternal } from '@/utils/functions'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'

const TYPE_METHOD = {
  connect: 'connect',
  idle: 'idle',
  logout: 'logout',
  ETH_SEND_TRANSACTION: 'eth_sendTransaction',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
  ETH_SIGN: 'eth_sign',
  PERSONAL_SIGN: 'personal_sign',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  ETH_SIGN_TYPED_DATA_V4: 'eth_signTypedData_v4',
} as const

type Mess = {
  jsonrpc?: String
  id: String
  data?: any
}

const DATA_FAKE = {
  moreData: {
    userGroupData: {
      address: '0x8555a85e1023b1233fa010e8f504641fee739e80',

      isExist: true,

      hasBackup: false,

      status: 'active',

      language: 'en',

      isPolicyAccepted: true,

      email: '',

      avatar: '',

      username: '',

      campaigns: {},

      activeCampaigns: [],

      name: 'Eggle Gamewallet',

      slug: 'egglegamewallet',

      headerLogo:
        'https://ipfs.pantograph.app/ipfs/QmPx1yrumZjkakCa9uR2tpnSiV6qHgAR94Ddherv5rWrRV?filename=header.png',

      bodyColor: '#000000',

      footerImage:
        'https://ipfs.pantograph.app/ipfs/QmPVBQskVHKFohyvWwZByja8ZWe7rxgfEWyPecdusU9e5f?filename=fotterlogo.png',

      footerVideo: '',

      textColor: '#FFFFFF',

      headerUrl: {
        en: 'https://www.bacoor.io/',

        ja: 'https://www.bacoor.io/',

        cn: 'https://www.bacoor.io/',
      },

      backupCard:
        'https://ipfs.pantograph.app/ipfs/QmNkor9qsRa8Aj2Ubt4RMduuGr1F6JA2afAJUk8VC57xMk?filename=Backupcard_hw.png',

      mainCard:
        'https://ipfs.pantograph.app/ipfs/QmXeAiUcTsfbPLoX3JyEzNJybUttMHkYuWqiin18e2v9Ja?filename=mainncard_passkey_01.png',

      defaultTokens: [],

      buyPageURL: 'https://gp.cmoney.xyz/',

      ImportedDapp: {
        DappOn: true,

        blockchain: 'polygon',

        DappURL: 'https://eggle-matic-dapp.w3w.app',
      },

      socialNetwork: [
        {
          url: 'https://twitter.com/Bacoor_Company',

          icon: 'https://ipfs.pantograph.app/ipfs/QmPZFSpQ3NN2xFm4nq7XPbtMWZM9BRtxpmGjgTexZt8w9x?filename=twitterx4.png',
        },

        {
          url: 'https://t.me/BacoorINC',

          icon: 'https://ipfs.pantograph.app/ipfs/QmWSzMA6EbK8oemcFZtAohRETwf34jvTHKFo4yN2EJy7qC?filename=telegramx4.png',
        },
      ],

      logoSettingScreen:
        'https://ipfs.pantograph.app/ipfs/QmVToAdHu7DZ8nwPkAwAPQ8mYRYafFqaSsShDzP8Zk81SE?filename=back.png',

      defaultNFTs: [],

      partners: ['6707475f008913773894a99b'],

      tabLineColor: ['#FFFFFF'],

      notiDataIcon:
        'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',

      accountUrl: 'https://pass.w3w.app',

      isDefaultEncryptGroup: true,

      groupIcon:
        'https://ipfs.pantograph.app/ipfs/QmWdV4p9FvAUKEnGHefwsYxUrtY8qyEX61xbHdGXworS8k?filename=icon%20NOTI.png',

      groupType: 'passkey-wallet',

      addedDisplayTokens: [
        {
          blockchain: 'polygon',

          tokenName: 'Bacoor Token',

          tokenSymbol: 'BDT',

          tokenDecimals: 18,

          tokenType: 'ERC20',

          contractAddress: '0x59817ce454ceefb53ea7e0e23d18ebe1970d4e7c',

          thumbnail:
            'https://ipfs.pantograph.app/ipfs/QmbJiRGNv7A6zLXFVZBpmvJKE4aWZcYXgr1RJuSXYuTynu?filename=bacoor-token.png',
        },
      ],

      bodyImageDesktop:
        'https://ipfs.pantograph.app/ipfs/QmbWFUmd2HZa8qTxdmSpUBVbZyVCvcu2FT2Bs5kktLYDk4?filename=Desk-nhat.png',

      bodyImageMobile:
        'https://ipfs.pantograph.app/ipfs/QmVPcX1BZp2hrAE38JyCwPTqMEfqGNQvish8knk9GLPHv3?filename=mobile-nhat.png',

      bodyImageActivateEmailDesktop:
        'https://ipfs.pantograph.app/ipfs/QmbWFUmd2HZa8qTxdmSpUBVbZyVCvcu2FT2Bs5kktLYDk4?filename=Desk-nhat.png',

      bodyImageActivateEmailMobile:
        'https://ipfs.pantograph.app/ipfs/QmVPcX1BZp2hrAE38JyCwPTqMEfqGNQvish8knk9GLPHv3?filename=mobile-nhat.png',

      typeTemplate: 1,

      airdropExistBanner: {
        en: 'https://ipfs.pantograph.app/ipfs/QmeCdYiQvMTv9r5Yo4ZhZwwWqFyCHZBGLtvBwP8seXn73M?filename=EN.png',

        ja: 'https://ipfs.pantograph.app/ipfs/QmZfEy52WcMQtU6gBsJ7rYCeYcB5JfjUCxYgsDgNeDoyNx?filename=bacoor-jp-banner.png',

        cn: 'https://ipfs.pantograph.app/ipfs/QmQtrdUC3Y14Fb2YmVmxL8nWHVyoJtpr4w4c8FB4vgsXwA?filename=CN.png',
      },

      specialTokens: {
        blockchain: 'polygon',

        tokenName: 'E Token',

        tokenSymbol: 'E',

        tokenDecimals: 18,

        tokenType: 'ERC20',

        contractAddress: '0x933cFC527ebeAd4dBed29a32878FB7FbD57C0622',

        thumbnail:
          'https://ipfs.pantograph.app/ipfs/QmNw3BHqKj116kqMdjKqRFiXEiMCQhbhGGfakQzT2e6v7z?filename=TOKEN_E.png',

        isSpecialTokens: true,

        isBuyable: true,
      },

      userNameInput: true,

      payMaster: true,

      bodyImageReceiveLinkDesktop:
        'https://ipfs.pantograph.app/ipfs/Qmb1bkhbVhuyyg2rfX23gN5nqemK6ATFtvvfR26XmTXyPs?filename=bacoor-email-DT.jpg',

      bodyImageReceiveLinkMobile:
        'https://ipfs.pantograph.app/ipfs/QmdUgkMtnqVD9b6hWUnSFd3ZkwvQoPSjjA8b4CdQpNQHrh?filename=bacoor-email-mb.jpg',

      scanOn: true,

      banners: [],

      infoMintNFTBook: {
        isMinted: false,

        Contract: '0x31D76C4D187263c0750a5195e75e0672AB763034',

        chainId: 11155420,

        data: null,

        isMintingNFTBook: false,

        isMintError: false,

        enableEditProfile: true,
      },

      isMintNftBook: false,
    },
  },
}
console.log({ DATA_FAKE })

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: any
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#3D0415] border-2 border-white/20 cursor-pointer h-fit py-2 px-4 text-white rounded-lg"
    >
      {/* logout */}
      {children}
    </div>
  )
}

const Passkey = () => {
  const { isMobile } = useMedia()
  const [dataParent, setDataParent] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const handleConnect = () => {
    try {
      if (window.location.href.includes(window.parent?.origin)) {
        viewExternal('https://pass.w3w.app/activate-by-passkey/egglegamewallet')
      } else {
        sendMessageToParent({
          id: TYPE_METHOD.connect,
          data: 'signin',
        })
      }
    } catch (error) {
      sendMessageToParent({
        id: TYPE_METHOD.connect,
        data: 'signin',
      })
    }
  }

  const sendMessageToParent = (
    message: Mess = {
      jsonrpc: '2.0',
      id: TYPE_METHOD.idle,
      data: '',
    }
  ) => {
    const { jsonrpc = '2.0', id = TYPE_METHOD.idle, data = null } = message
    if (id !== TYPE_METHOD.idle && id !== TYPE_METHOD.logout) {
      setLoading(true)
    }

    window.parent.postMessage(
      {
        jsonrpc,
        id,
        data,
      },
      'https://airdropband.w3w.app/'
    )

    window.parent.postMessage(
      {
        jsonrpc,
        id,
        data,
      },
      'https://pass.w3w.app/'
    )

    window.parent.postMessage(
      {
        jsonrpc,
        id,
        data,
      },
      'http://localhost:30002/'
    )
  }

  const receiveDAPPMessage = async (event: any) => {
    try {
      const data = event.data
      if (data?.id) {
        console.log({ data })
        setLoading(false)
      }
      console.log({ receiveParent: data })

      switch (data.id) {
        case TYPE_METHOD.logout:
          setDataParent({})
          break

        case TYPE_METHOD.connect:
          !data.result?.error && setDataParent(data.result)

          break

        default:
          break
      }
    } catch (error) {}
  }

  useEffect(() => {
    window.addEventListener('message', receiveDAPPMessage, false)

    return () => {
      window.removeEventListener('message', receiveDAPPMessage, false)
    }
  }, [])

  return (
    <div className="w-full h-full bg-green-300 fixed inset-0">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={images.passkey[isMobile ? 'bgMobile' : 'bg']}
          className="min-w-full min-h-full max-w-none max-h-none"
        />
      </div>
      {loading && (
        <div className="fixed flex items-center justify-center h-screen w-screen bg-black/30">
          <Spin />
        </div>
      )}

      <div className="w-full h-full relative flex flex-col md:p-12 p-5 md:mt-5 mt-12">
        <div className="flex justify-end w-full">
          {Object.keys(dataParent).length > 0 ? (
            <Button
              onClick={() => {
                setDataParent({})
                sendMessageToParent({
                  id: TYPE_METHOD.logout,
                })
              }}
            >
              {ellipsisText(dataParent?.moreData?.userGroupData?.address, 4, 5)}
            </Button>
          ) : (
            <div className="flex justify-end w-full">
              <Button onClick={handleConnect}>Connect</Button>
            </div>
          )}
        </div>
        {/* <div>{JSON.stringify(dataReceived)}</div> */}

        {Object.keys(dataParent).length > 0 && (
          <div className="flex w-full gap-4 flex-wrap  mt-6 justify-center align-middle flex-1">
            <Button
              onClick={() => {
                setDataParent({})
                sendMessageToParent({
                  id: TYPE_METHOD.logout,
                })
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() =>
                sendMessageToParent({
                  id: TYPE_METHOD.ETH_SIGN,
                  data: {
                    messages: 'diencong',
                    chainId: 10,
                  },
                })
              }
            >
              Sign messages
            </Button>
            <Button
              onClick={() =>
                sendMessageToParent({
                  id: TYPE_METHOD.ETH_SIGN_TRANSACTION,
                })
              }
            >
              Sign Tx
            </Button>

            <Button
              onClick={() =>
                sendMessageToParent({
                  id: TYPE_METHOD.ETH_SEND_TRANSACTION,
                })
              }
            >
              Send Tx
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Passkey
