import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Button, Image } from '@mantine/core'
import TextCopy from '../TextCopy'
import VPBankService from '@/services/VPBank'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { delayTime } from '@/utils/functions'
import SepayServices from '@/services/Sepay'
import { showNotificationError } from '@/utils/notification'
import { useModal } from '@/zustand/useModal'
import useUserData from '@/hooks/useUserData'
import { cn } from '@/utils/tailwind'

const InfoBanking = ({
  amount = 0,
  callback = () => {},
  callbackError = () => {},
}: {
  amount?: number
  callback?: (id?: string, mess?: string) => any
  callbackError?: () => any
}) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { closeModal } = useModalAdmin()

  const isStopRef = React.useRef(false)

  const [qrCode, setQrCode] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [isBanking] = useState(false)
  const [idBanking, setIdBanking] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [time, setCount] = useState(120)

  useEffect(() => {
    isStopRef.current = false
    return () => {
      isStopRef.current = true
    }
  }, [])

  useEffect(() => {
    const countDown = () => {
      if (time > 0) {
        setTimeout(() => {
          setCount(time - 1)
        }, 1000)
      }
    }
    isTracking && countDown()
  }, [time, isTracking])

  useEffect(() => {
    ;(async () => {
      const infoBanking = new VPBankService(amount)

      setQrCode(infoBanking.qrCode)
      setMessage(infoBanking.message)
      setIdBanking(infoBanking.idBanking)
    })()
  }, [amount])

  const checkBanking = async () => {
    if (isMobile) {
      VPBankService.openDeepLink(amount, message)
    } else {
      setLoadingCheck(true)
      setLoadingCheck(false)
    }
  }

  const tracking = async (amountRequest = 39) => {
    //120s

    if (isStopRef.current) {
      return
    }
    if (amountRequest > 0) {
      await delayTime(3000)
      amountRequest -= 1

      const listPayment = await SepayServices.getListPayment()

      if (
        listPayment?.transactions &&
        Array.isArray(listPayment?.transactions) &&
        listPayment?.transactions?.length > 0
      ) {
        const isValidContent = listPayment?.transactions.some((e) => {
          return e.transaction_content.includes(message)
        })
        const isValidMoney = listPayment?.transactions.some((e) => {
          return Number(e.amount_in) === amount
        })
        if (isValidContent) {
          if (isValidMoney) {
            callback(idBanking, message)
          } else {
            closeModal()
            callbackError()
            showNotificationError('Bạn chuyển tiền chưa đủ.')
          }
        } else {
          await tracking(amountRequest)
        }
      } else {
        callback(idBanking, message)
      }
    } else {
      closeModal()
      callbackError()
      showNotificationError('Bạn chưa chuyển tiền.')
    }
  }

  const handleCallBack = async () => {
    setIsTracking(true)
    tracking()
  }

  return (
    <div className='flex md:flex-row md:py-1 mt-2 overflow-y-auto flex-col md:gap-5 gap-2 md:justify-center w-full'>
      {isMobile ? (
        <div className='relative w-[90%] flex-1  m-auto  flex md:pb-0  aspect-square overflow-hidden'>
          {/* <Image preview={false} src={qrCode} alt='QR' className='!relative !w-full !h-auto' /> */}
          <MyImage src={qrCode} alt='QR' className='!relative !w-full !h-auto' />
        </div>
      ) : (
        <div className='relative w-full flex-1 flex md:pb-0  aspect-square overflow-hidden'>
          <div className='absolute w-full aspect-square flex justify-center items-center'>
            <div className='relative md:w-full   aspect-square '>
              <Image src={qrCode} alt='QR' className='!relative !w-full !h-auto ' />
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col flex-1 gap-2  '>
        <div className='flex gap-2'>
          <div className='font-bold'>NH : VP Bank</div>

          <div className='relative justify-center w-5 rounded-lg aspect-square overflow-auto'>
            <MyImage
              src={'https://www.vpbank.com.vn/assets/images/favicons/favicon-32x32.png'}
              alt='logo VCB'
              className='!relative !w-full !h-auto '
            />
          </div>
        </div>
        <div className='flex  md:gap-2 gap-1'>
          <span className='font-bold'>{`STK : `}</span>
          <TextCopy value={'0392225405'} textView={'0392225405'} />
        </div>
        <div className='flex  flex-col  gap-1'>
          <span className='font-bold'>{translate('textPopular.content')} :</span>
          <TextCopy value={message} textView={message} />
        </div>
        <div className='rounded-lg mt-1 flex p-3 w-full bg-[#f6cf83]'>
          <span className='mr-1'>
            <AiOutlineExclamationCircle />
          </span>
          <span>Nội dung chuyển khoản phải ghi đúng để bạn khiếu nãi và kiểm tra hoá đơn.</span>
        </div>

        <div
          className={cn(
            'w-full gap-1 text-base flex  items-center relative ',
            isTracking ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span>{translate('banking.tracking')}:</span>
          <span className='font-bold'>{time}</span>
          <span>(s)</span>
        </div>
        <div className='flex gap-3  '>
          {isMobile ? (
            <>
              <Button
                disabled={isTracking}
                onClick={checkBanking}
                loading={loadingCheck}
                className='flex-1'
                variant='filled'
              >
                {translate('banking.openApp')}
              </Button>
              <Button
                onClick={handleCallBack}
                disabled={isBanking}
                className='flex-1'
                loading={isTracking}
              >
                {translate('textPopular.sended')}
              </Button>
            </>
          ) : (
            <Button
              loading={isTracking}
              onClick={handleCallBack}
              disabled={isBanking}
              className='flex-1'
            >
              {translate('textPopular.sended')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoBanking
