import { COOKIE_KEY, DEFAULT_FEE_SHIP, FILTER_BILL, OPTIONS_PAYMENT } from '@/constants/app'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useOptionPayment from '@/hooks/useOptionPayment'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import { delayTime, getDataLocal, numberWithCommas, saveDataLocal } from '@/utils/functions'
import { useEffect, useMemo, useState } from 'react'
import ModalProcess from '../ModalProcess'
import { QUERY_KEY } from '@/constants/reactQuery'
import ModalSuccess from '../ModalSuccess'
import { BodyAddBill } from '@/constants/firebase'
import InfoBanking from '../InfoBanking'
import ModalDelete from '../ModalDelete'
import BtnBackUI from '../BtnBackUI'
import OptionsPayment from '../OptionsPayment'
import BillFinal from '../BillFinal'
import MyForm from '../Form/MyForm'
import InfoBill from './InfoBill'
import { IFormPayment, IItemInfoBill, IPayment } from './type'
import { useForm } from '@mantine/form'
import useCheckForm from '@/hooks/useCheckForm'
import ContentFormPayment from './ContentFormPayment'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import ClientApi from '@/services/ClientApi/index'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { ID_USER_NO_LOGIN } from '@/constants/mongoDB'

const INIt_FORM: IFormPayment = {
  sdt: '',
  name: '',
  linkContact: '',
  gmail: '',
  noteBil: '',
  addressShip: {
    addressDetail: '',
    address: '',
  },
}
const Payment = ({ data, clickBack, showBack = true }: IPayment) => {
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const { refreshListQuery } = useRefreshQuery()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { closeModal: closeModalAdmin, openModal: openModalAdmin } = useModalAdmin()
  const route = useRoutePage()

  const [loading, setLoading] = useState(false)
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment(null, { banking: true })
  const { checkNumberPhone, checkNameUser } = useCheckForm()

  const formData = useForm({
    initialValues: INIt_FORM,
    validate: {
      sdt: (sdt) => checkNumberPhone(sdt),
      name: (name) => checkNameUser(name),
    },
    validateInputOnChange: true,
  })

  useEffect(() => {
    const initData: IFormPayment = {
      sdt: userData?.sdt,
      name: userData?.name,
      addressShip: userData?.addressShipper[0],
      linkContact: userData?.linkContact!,
      gmail: userData?.gmail,
      noteBil: '',
    }

    formData.setValues(initData)
  }, [userData, isLogin])

  const isValidSubmit = useMemo(() => {
    if (!formData.values?.addressShip) {
      return false
    }

    return !!formData.values.addressShip?.addressDetail
  }, [formData])

  const onChangeAddressShip = (item: any) => {
    formData.setFieldValue('addressShip', item)
  }

  const getTotalPayBill = (plusFee = false) => {
    let total = 0

    data.forEach((e) => {
      if (e.selected) {
        total = Number(e.amountBuy) * Number(e.moreData?.price) + total
      }
    })

    return numberWithCommas(total + (plusFee ? DEFAULT_FEE_SHIP : 0))
  }

  const callbackProcessing = () => {
    if (isLogin) {
      openModalDrawer({
        content: <ModalProcess des={translate('confirm.bill.createBill_Des')} title={translate('confirm.bill.createBill')} />,
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })
    } else {
      openModalAdmin({
        body: <ModalProcess des={translate('confirm.bill.createBill_Des')} title={translate('confirm.bill.createBill')} />,
        showBtnClose: false,
        overClickClose: false,
      })
    }
  }

  const callbackSuccess = async () => {
    if (!isLogin) {
      const dataLocal = getDataLocal(COOKIE_KEY.MyCart) as IItemInfoBill[]
      const arrFilter = dataLocal.filter((item: IItemInfoBill) => {
        return !data.some((e) => e.idProduct === item.idProduct)
      })

      saveDataLocal(COOKIE_KEY.MyCart, arrFilter)
      await delayTime(1000)
    }
    await refreshListQuery([QUERY_KEY.LengthCartUser, QUERY_KEY.MyCartUser, QUERY_KEY.GetAllNests, QUERY_KEY.GetAllProduct, QUERY_KEY.GetShoesShop])
    closeModalAdmin()
    if (isLogin) {
      openModalDrawer({
        content: (
          <ModalSuccess
            showClose
            callback={() => {
              route.push('/my-page/bill')
              closeModalDrawer()
            }}
            des={translate('productDetail.modalBuy.successDes')}
            title={translate('productDetail.modalBuy.success')}
            titleClose={translate('common.ok')}
            titleSubmit={translate('common.viewBill')}
          />
        ),
        configModal: {
          width: '500px',
        },
      })
    } else {
      showNotificationSuccess(translate('productDetail.modalBuy.success'))
      closeModalDrawer()
      closeModalAdmin()
    }
  }

  const handleSubmitBuy = async (idBanking?: string, mess?: string, bodyAPI?: BodyAddBill) => {
    callbackProcessing()
    let res: any = null

    if (idBanking) {
      bodyAPI!.infoBanking = {
        id: idBanking,
        messages: mess,
      }
    }

    if (isLogin) {
      res = await ClientApi.buy(bodyAPI!)
    } else {
      res = await ClientApi.buyNoLogin(bodyAPI!)
    }

    if (res?.data) {
      await callbackSuccess()
      clickBack && clickBack()
    } else {
      showNotificationError(translate('productDetail.modalBuy.error'))
      closeModalAdmin()
      closeModalDrawer()
    }
  }

  const handleSubmit = async (valueForm: IFormPayment) => {
    const callBack = async () => {
      setLoading(true)
      closeModalAdmin()
      const listBill: any[] = []
      let totalBill = 0

      data.forEach((e) => {
        if (e.selected) {
          totalBill += e.amountBuy! * e.moreData?.price!
          const itemBill: { [key: string]: any } = {
            idProduct: e.moreData?._id || e.idProduct,
            amountBuy: e.amountBuy,

            price: e.moreData?.price,
            models: {
              ...e?.configCart,
              ...e?.configBill,
            },
          }

          if (e.configCart && e._id) {
            itemBill.idCart = e._id
          }

          listBill.push(itemBill)
        }
      })

      const bodyAPI: BodyAddBill = {
        addressShip: valueForm?.addressShip,
        discount: 0,
        idUser: userData?._id || ID_USER_NO_LOGIN,
        listBill,
        name: userData?.name || 'no-name',
        sdt: valueForm?.sdt!,
        status: FILTER_BILL.Processing,
      }

      if (optionSelected.value === OPTIONS_PAYMENT.banking) {
        if (isLogin) {
          openModalDrawer({
            content: (
              <InfoBanking
                amount={Number(totalBill) + DEFAULT_FEE_SHIP}
                callback={(id, mess) => handleSubmitBuy(id, mess, bodyAPI)}
                callbackError={() => {
                  setLoading(false)
                }}
              />
            ),
            useDrawer: true,
            configModal: {
              width: '700px',
              onClose: () => setLoading(false),
              overClickClose: false,
              showBtnClose: true,
            },
            configDrawer: {
              afterClose: () => setLoading(false),
              overClickOutside: false,
            },
            title: translate('banking.title'),
          })
        } else {
          openModalAdmin({
            body: (
              <InfoBanking
                amount={Number(totalBill) + DEFAULT_FEE_SHIP}
                callback={(id, mess) => handleSubmitBuy(id, mess, bodyAPI)}
                callbackError={() => {
                  setLoading(false)
                }}
              />
            ),
            className: 'md:w-[700px]',
            onClose: () => setLoading(false),
            overClickClose: false,
            title: translate('banking.title'),
          })
        }
      } else {
        handleSubmitBuy('', '', bodyAPI)
      }
    }

    if (isLogin) {
      openModalDrawer({
        content: (
          <ModalDelete
            autoClose={false}
            callback={callBack}
            des={translate('confirm.bill.confirm_des')}
            title={translate('confirm.bill.confirm')}
            titleConfirm={translate('common.submit')}
          />
        ),
      })
    } else {
      openModalAdmin({
        body: (
          <ModalDelete
            isModalAdmin
            autoClose={false}
            callback={callBack}
            des={translate('confirm.bill.confirm_des')}
            title={translate('confirm.bill.confirm')}
            titleConfirm={translate('common.submit')}
          />
        ),
        overClickClose: false,
      })
    }
  }

  return (
    <div className='w-full mb-7 mt-1'>
      {showBack && <BtnBackUI clickBack={clickBack} />}

      <div className='flex flex-col gap-3 w-full mt-1'>
        <MyForm className='flex lg:flex-row flex-col lg:gap-6 gap-5' form={formData} submit={handleSubmit}>
          <div className='flex flex-1 h-full overflow-y-auto  flex-col lg:max-w-[calc(100%-300px)]'>
            <ContentFormPayment form={formData} onChange={onChangeAddressShip} />
            <InfoBill data={data} />
          </div>
          <div className='lg:w-[350px] flex flex-col md:gap-6 gap-5'>
            <OptionsPayment listOptions={listOptions} optionSelected={optionSelected} onChangeOptions={onChangeOptions} />
            <BillFinal disabledSubmit={!isValidSubmit} loading={loading} totalBill={getTotalPayBill()} totalBillFeeShip={getTotalPayBill(true)} />
          </div>
        </MyForm>
      </div>
    </div>
  )
}

export default Payment
