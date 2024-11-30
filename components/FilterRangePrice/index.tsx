import { AlignLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import MyCollapse from '../MyCollapse'
import { DEFAULT_SIZE } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useQuerySearch from '@/hook/useQuerySearch'
import { numberWithCommas } from '@/utils/functions'
type FilterRangePriceProps = {
  minPrice?: number
  maxPrice?: number
  onChange?: (value: number[]) => void
  onChangeComplete?: (value: number[]) => void
  stepRange?: number
}
const FilterRangePrice = (props: FilterRangePriceProps) => {
  const [slider, setSlider] = useState([29, 45])

  const { translate } = useLanguage()
  const { queries, updateQuery } = useQuerySearch()

  useEffect(() => {
    let minPrice = props?.minPrice || DEFAULT_SIZE.Price.min
    let maxPrice = props?.maxPrice || DEFAULT_SIZE.Price.max

    if (queries?.minPrice && queries?.minPrice[0]) {
      minPrice = Number(queries?.minPrice[0])
    }
    if (queries?.maxPrice && queries?.maxPrice[0]) {
      maxPrice = Number(queries?.maxPrice[0])
    }
    setSlider([minPrice, maxPrice])
  }, [queries])

  const handleChangeComplete = (value: number[]) => {
    if (value[0] !== slider[0]) {
      updateQuery('minPrice', value[0])
    }
    if (value[1] !== slider[1]) {
      updateQuery('maxPrice', value[1])
    }
    setSlider(value)
    if (props?.onChangeComplete) {
      props.onChangeComplete(value)
    }
  }

  const handleChange = (value: number[]) => {
    setSlider(value)
    if (props?.onChange) {
      props.onChange(value)
    }
  }

  const renderTooltip = (value?: any) => {
    return <div>{numberWithCommas(value)}</div>
  }

  const itemsRangeSize = [
    {
      key: 'rangeSizePrice',
      expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
      label: (
        <div className='flex text-medium justify-between items-center'>{`${translate(
          'productDetail.price',
        )} (VNĐ)`}</div>
      ),
      children: (
        <div className='px-4 py-2 flex flex-col gap-1'>
          <div className='flex items-center mt-2 justify-between'>
            <div className=' px-3 text-sm py-1   rounded-xl border-[1px] border-gray-400'>
              {numberWithCommas(slider[0])}
            </div>
            <div className='pb-[2px] w-[10px] bg-gray-400' />
            <div className='px-3 py-1 text-sm rounded-xl border-[1px] border-gray-400'>
              {numberWithCommas(slider[1])}
            </div>
          </div>
          <Slider
            onChangeComplete={handleChangeComplete}
            range
            onChange={handleChange}
            value={slider}
            defaultValue={[Number(queries?.minSize || 29), Number(queries?.maxSize || 45)]}
            min={DEFAULT_SIZE.Price.min}
            max={DEFAULT_SIZE.Price.max}
            step={props?.stepRange || 1}
            tooltip={{
              formatter: renderTooltip,
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <MyCollapse
      expandIcon={({ isActive }: any) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={itemsRangeSize}
    />
  )
}

export default FilterRangePrice
