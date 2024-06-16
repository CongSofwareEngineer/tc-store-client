import MyImage from '@/components/MyImage'
import useLanguage from '@/hook/useLanguage'
import { formatPrice } from '@/utils/functions'
import { Col, Row } from 'antd'
import React from 'react'
import Media from 'react-media'

const ViewItem = ({
  data,
  amount,
  setAmount,
}: {
  data: any
  amount: number
  setAmount: (amount: number) => void
}) => {
  const { translate } = useLanguage()

  const handleChangeAmount = (isPlus = false) => {
    if (isPlus) {
      setAmount(amount + 1)
    } else {
      if (amount > 1) {
        setAmount(amount - 1)
      }
    }
  }

  const renderTextMobile = (title: string, value: string | number) => {
    return (
      <div className="flex gap-1">
        <span className="font-bold">{title} : </span>
        <span>{value}</span>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="w-full flex flex-col gap-3 mt-2">
        <Row gutter={10} className="bg-slate-100">
          <Col span={3}>
            <div>{translate('textPopular.image')}</div>
          </Col>
          <Col span={9}>
            <div className="w-full ">{translate('header.name')}</div>
          </Col>

          <Col span={5}>
            <div>{translate('productDetail.price')}</div>
          </Col>
          <Col span={3}>
            <div className="text-center">{translate('textPopular.amount')}</div>
          </Col>
          <Col span={4}>
            <div className="text-end">{translate('bill.priceTotal')}</div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={3}>
            <div className="w-[80%] aspect-square overflow-hidden">
              <MyImage
                src={data?.imageMain || ''}
                alt={`img-moal-${data?.name}`}
                widthImage="100%"
                heightImage="auto"
              />
            </div>
          </Col>
          <Col span={9}>
            <div className="w-full flex flex-col gap-2">
              <div>{data?.name}</div>
            </div>
          </Col>

          <Col span={5}>
            <div>{formatPrice(data?.price)} VNĐ</div>
          </Col>
          <Col span={3}>
            <div className="text-center flex justify-center">
              <span
                onClick={() => handleChangeAmount(false)}
                className="w-6 border-[1px] border-black cursor-pointer"
              >
                -
              </span>
              <span className="min-w-6 border-[1px] border-black cursor-pointer">
                {amount}
              </span>
              <span
                onClick={() => handleChangeAmount(true)}
                className="w-6 border-[1px] border-black cursor-pointer"
              >
                +
              </span>
            </div>
          </Col>
          <Col span={4}>
            <div className="text-end">
              {formatPrice(data?.price * amount)} VNĐ
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  const renderMobile = () => {
    return (
      <div className="w-full ">
        <Row gutter={10} className="bg-slate-100 w-full mb-2">
          <Col span={6}>
            <div className="text-center w-full">
              {translate('textPopular.image')}
            </div>
          </Col>
          <Col span={18}>
            <div className="text-center w-full">
              {translate('textPopular.infor')}
            </div>
          </Col>
        </Row>

        <Row gutter={10} className="mb-2">
          <Col span={6}>
            <div className="flex justify-center items-center">
              <div className="w-[80%] aspect-square overflow-hidden">
                <MyImage
                  src={data?.imageMain || ''}
                  alt={`img-moal-${data?.name}`}
                  widthImage="100%"
                  heightImage="auto"
                />
              </div>
            </div>
          </Col>
          <Col span={18}>
            <div className="w-full flex flex-col gap-1">
              {renderTextMobile(translate('header.name'), data?.name)}
              {renderTextMobile(
                translate('productDetail.price'),
                `${formatPrice(data?.price)} VNĐ`
              )}
              <div className="flex gap-1">
                <span className="font-bold">
                  {translate('textPopular.amount')} :{' '}
                </span>
                <div className="text-center flex items-center">
                  <span
                    onClick={() => handleChangeAmount(false)}
                    className="leading-3 h-5 w-6 border-[1px] border-black cursor-pointer"
                  >
                    -
                  </span>
                  <span className="leading-[14px] h-[18px] min-w-6 border-[1px] border-black cursor-pointer">
                    {amount}
                  </span>
                  <span
                    onClick={() => handleChangeAmount(true)}
                    className="leading-3 h-5 w-6 border-[1px] border-black cursor-pointer"
                  >
                    +
                  </span>
                </div>
              </div>
              {renderTextMobile(
                translate('bill.priceTotal'),
                `${formatPrice(data?.price * amount)} VNĐ`
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}
    </Media>
  )
}

export default ViewItem
