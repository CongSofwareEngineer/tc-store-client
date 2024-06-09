import { ColorConfig } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import React, { AriaAttributes } from 'react'
import styled from 'styled-components'
const ContainerMySliderSell = styled.div`
  position: relative;
  background-color: rgba(6, 191, 123, 0.2);
  border-radius: 8px;
  width: 100%;
`
const SellMySliderSell = styled.div<{ width: any }>`
  width: ${(props) => props.width}%;
  position: absolute;
  z-index: 1;
  background-color: ${ColorConfig.green1};
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 8px;
`
const TextMySliderSell = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

type MySliderSellType = {
  total?: number
  sell?: number
  text?: string
  className?: string
} & AriaAttributes
const MySliderSell = ({
  total = 1,
  sell = 1,
  text,
  className,
  ...props
}: MySliderSellType) => {
  const width = (sell / total) * 100
  const { translate } = useLanguage()

  return (
    <ContainerMySliderSell className={className} {...props}>
      <TextMySliderSell>
        {text || translate('productDetail.sold')}
      </TextMySliderSell>
      <SellMySliderSell width={width} />
    </ContainerMySliderSell>
  )
}

export default MySliderSell
