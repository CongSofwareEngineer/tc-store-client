import FilterRangePrice from '@/components/FilterRangePrice'
import MyCollapse from '@/components/MyCollapse'
import MyFilter from '@/components/MyFilter'
import MyFilterCheckBox from '@/components/MyFilterCheckBox'
import MyLoading from '@/components/MyLoading'
import { DEFAULT_SIZE, FilterAPI } from '@/constant/app'
import useSubCategories from '@/hook/tank-query/Admin/useSubCategories'
import useLanguage from '@/hook/useLanguage'
import useQuerySearch from '@/hook/useQuerySearch'
import { AlignLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

const MenuShoes = () => {
  const [slider, setSlider] = useState([29, 45])

  const { translate, lang } = useLanguage()
  const { queries, updateQuery } = useQuerySearch()
  const { data, isLoading } = useSubCategories(null)

  const menuShoes = useMemo(() => {
    if (Array.isArray(data?.data)) {
      const listTemp = data?.data
        .filter((e) => {
          return e.keyName.startsWith('shoes') && !e.keyName.includes('Size')
        })
        .map((e) => {
          return {
            value: e.keyName,
            label: e?.lang?.[lang],
            name: e?.lang?.[lang],
          }
        })
      return listTemp
    }
    return []
  }, [data])

  useEffect(() => {
    let minSize = DEFAULT_SIZE.Shoes.minSize
    let maxSize = DEFAULT_SIZE.Shoes.maxSize

    if (queries?.minSize && queries?.minSize[0]) {
      minSize = Number(queries?.minSize[0])
    }
    if (queries?.maxSize && queries?.maxSize[0]) {
      maxSize = Number(queries?.maxSize[0])
    }

    setSlider([minSize, maxSize])
  }, [queries])

  const handleChangeSliderSize = (value: number[]) => {
    if (value[0] !== slider[0]) {
      updateQuery('minSize', value[0])
    }
    if (value[1] !== slider[1]) {
      updateQuery('maxSize', value[1])
    }
    setSlider(value)
  }

  const handleCleanAll = () => {
    setSlider([DEFAULT_SIZE.Shoes.minSize, DEFAULT_SIZE.Shoes.maxSize])
  }

  const renderSlider = () => {
    const itemsRangeSize = [
      {
        key: 'rangeShoesSize',
        expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
        label: <div className='flex text-medium justify-between items-center'>{translate('textPopular.size')}</div>,
        children: (
          <div className='px-4 py-2 flex flex-col gap-1'>
            <div className='flex items-center mt-2 justify-between'>
              <div className='px-5 text-sm py-[2px]  rounded-xl border-[1px] border-gray-400'>{slider[0]}</div>
              <div className='pb-[2px] w-[10px] bg-gray-400' />
              <div className='px-5  py-[2px] text-sm rounded-xl border-[1px] border-gray-400'>{slider[1]}</div>
            </div>
            <Slider
              onChangeComplete={handleChangeSliderSize}
              range
              onChange={setSlider}
              value={slider}
              defaultValue={[Number(queries?.minSize || 29), Number(queries?.maxSize || 45)]}
              min={DEFAULT_SIZE.Shoes.minSize}
              max={DEFAULT_SIZE.Shoes.maxSize}
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

  return (
    <MyFilter callbackCleanAll={handleCleanAll} titleHeader={translate('menuProduct.category')}>
      {isLoading ? (
        <MyLoading />
      ) : (
        <>
          <MyFilterCheckBox
            data={menuShoes}
            titleFilter={translate('menuProduct.product')}
            typeChecked={FilterAPI.SubCategory}
            isReplace={false}
          />
          {renderSlider()}
          <FilterRangePrice stepRange={100000} />
        </>
      )}
    </MyFilter>
  )
}

export default MenuShoes
