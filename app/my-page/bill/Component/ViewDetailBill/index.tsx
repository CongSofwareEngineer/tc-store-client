import ConfigBill from '@/components/ConfigBill'
import TextCopy from '@/components/TextCopy'
import { FILTER_BILL } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import { formatPrice, numberWithCommas, totalBill } from '@/utils/functions'
import { Button } from '@mantine/core'
import ModalFeedBack from '../ModalFeedBack'
import ImageMain from '@/components/ImageMain'
import { IClientApi } from '@/services/ClientApi/type'
type Props = {
  data?: IClientApi['bill']
}
const ViewDetailBill = ({ data }: Props) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const route = useRoutePage()
  const { openModalDrawer } = useModalDrawer()
  const enableFeedback = data?.status === FILTER_BILL.DeliverySuccess

  console.log({ ViewDetailBill: data })

  const getAddressShip = (item: any) => {
    const address = { ...item.addressShip }
    address.address = address.address.replaceAll('---', ' ')
    return `${address.addressDetail} (${address.address})`
  }

  const handleFeedback = (item: any) => {
    openModalDrawer({
      content: <ModalFeedBack item={data} data={item} />,
      title: translate('feedback.title'),
      useDrawer: true,
    })
  }

  const handleRoute = (e: any) => {
    route.push(`/shop/${e.moreData.keyName}`)
  }

  return (
    <div className='flex flex-col w-full pt-2 gap-2 overflow-y-auto'>
      <div className='flex flex-col  w-full  '>
        <div className='flex gap-1 items-center'>
          <span className='font-bold'>{`SĐT :`}</span>
          <TextCopy textView={data?.sdt} value={data?.sdt} />
        </div>
        {data?.infoBanking?.id && (
          <div className='flex flex-col mt-1   gap-1'>
            <span className='font-bold'>{`${translate('banking.title')} (Vietcombank) :`}</span>
            <div className='flex gap-1 ml-3'>
              <span className='font-bold'>{`+ ${translate('banking.idBanked')} :`}</span>
              <TextCopy textView={data?.infoBanking?.id} value={data?.infoBanking?.id} />
            </div>
            <div className='fex gap-1  ml-3'>
              <span className='font-bold'>{`+ ${translate('textPopular.content')} :`}</span>
              <span className='ml-1'>{data?.infoBanking?.messages} </span>
            </div>
          </div>
        )}
        {isMobile && (
          <div className=' mt-1'>
            <div className='whitespace-nowrap font-bold'>{`${translate('textPopular.address')} :`}</div>

            <div>{getAddressShip(data)}</div>
          </div>
        )}
      </div>
      <div className='w-full font-bold'>{`${translate('bill.listBill')} :`}</div>
      {data && (
        <div className='flex flex-col gap-4 w-full overflow-y-auto'>
          {data?.listBill?.map((e) => {
            return (
              <div
                style={{
                  borderBottom: `2px solid #e5e7eb `,
                }}
                key={e.moreData._id}
                className={`flex gap-3 w-full pb-4 `}
              >
                <div className='  w-[100px] h-max   relative rounded-md overflow-hidden'>
                  <ImageMain listImage={e.moreData.images} model={e.models.model} />
                </div>
                <div className='flex flex-col  gap-1'>
                  <p onClick={() => handleRoute(e)} className='font-bold'>
                    {e.moreData.name}
                  </p>
                  <div>{`${translate('textPopular.amount')} : x${e.amountBuy}`}</div>
                  <ConfigBill
                    item={{
                      ...e,
                      configBill: {
                        model: e.models.model,
                        size: e.models.size,
                      },
                      models: e.moreData.models,
                    }}
                  />
                  <div className='text-green-700 font-bold'>
                    <span className='mr-1'>{translate('productDetail.price')} :</span>
                    <span>{formatPrice(e.moreData.price)} VNĐ</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    {enableFeedback && (
                      <Button
                        variant='filled'
                        onClick={() => handleFeedback(e)}
                        size='xs'
                        className='w-max'
                      >
                        {translate('common.feedback')}
                      </Button>
                    )}
                    {data?.status !== FILTER_BILL.Processing && (
                      <Button onClick={() => handleRoute(e)} size='xs' className='w-max'>
                        {translate('common.buyAgain')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div className='text-medium gap-1   pt-3 flex w-full justify-end font-bold text-green-500 '>
        <span>{translate('textPopular.totalMoney')} : </span>
        <span>{`${numberWithCommas(totalBill(data?.listBill, data?.discount))} VNĐ`}</span>
      </div>
    </div>
  )
}

export default ViewDetailBill
