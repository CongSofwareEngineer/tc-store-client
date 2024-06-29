import MyImage from '@/components/MyImage'
import SubAndPlus from '@/components/SubAndPlus'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { formatPrice } from '@/utils/functions'
import { Col, Row } from 'antd'
import React from 'react'

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
  const { isMobile } = useMedia()

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
      <div className="w-full flex flex-col gap-3 mt-2 overflow-y-hidden">
        <Row className="bg-slate-100">
          <Col span={3}>
            <div className="">{translate('textPopular.image')}</div>
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
        <Row>
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
            <SubAndPlus
              value={amount}
              callBackPlus={setAmount}
              callBackSub={setAmount}
              isSquare
            />
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
              <SubAndPlus
                value={amount}
                callBackPlus={setAmount}
                callBackSub={setAmount}
                isSquare
              />
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

  return isMobile ? renderMobile() : renderDesktop()
}

export default ViewItem
