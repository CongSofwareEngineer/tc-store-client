import useMedia from '@/hook/useMedia'
import { CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
type Props = {
  defaultActiveKey?: string[]
  items: Array<{
    key: string
    expandIcon?: React.ReactNode
    label?: React.ReactNode | string
    children?: React.ReactNode | string
    extra?: React.ReactNode | string
  }>
  className?: string
  classNameItem?: string
  classNameMain?: string
}
const MyCollapse = ({
  defaultActiveKey = [],
  items = [],
  className = '',
  classNameItem = '',
  classNameMain = '',
}: Props) => {
  const { isMobile } = useMedia()
  const [listkeySelected, setListKeySelected] =
    useState<string[]>(defaultActiveKey)

  useEffect(() => {
    setListKeySelected(defaultActiveKey)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const checkSelected = (key = '') => {
    try {
      if (Array.isArray(listkeySelected)) {
        const exited = listkeySelected.some((e) => e === key)
        console.log({ exited })

        return !!exited
      }
    } catch (error) {
      return false
    }
  }

  const handleClickItem = (key = '') => {
    if (Array.isArray(listkeySelected)) {
      const exited = listkeySelected.some((e) => e === key)
      if (exited) {
        setListKeySelected(listkeySelected.filter((e) => e !== key))
      } else {
        const arr = [...listkeySelected, key]
        setListKeySelected(arr)
      }
    }
  }
  return (
    <div className={`flex flex-col w-full relative ${classNameMain}`}>
      {items.map((e, index) => {
        return (
          <div
            key={`MyCollapse-item-${e.key || index}`}
            className={`flex flex-col w-full relative `}
          >
            <div
              className={`flex gap-2 items-center cursor-pointer bg-gray-100 px-3 py-2  ${
                checkSelected(e.key) && ' border-b-2 border-gray-200'
              } ${className}`}
              onClick={() => handleClickItem(e.key)}
            >
              <CaretRightOutlined rotate={checkSelected(e.key) ? 90 : 0} />
              <div className="flex flex-1 text-medium">{e.label}</div>
              {e?.extra}
            </div>
            {e?.children && (
              <div
                className={`w-full flex relative px-3 ${
                  !checkSelected(e.key) && 'hidle-content'
                } ${classNameItem}`}
              >
                {e.children}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MyCollapse
