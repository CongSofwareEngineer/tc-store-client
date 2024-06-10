import useLanguage from '@/hook/useLanguage'
import useQuerySearch from '@/hook/useQuerySearch'
import { AlignLeftOutlined } from '@ant-design/icons'
import React, { useMemo } from 'react'

type MyFilterType = {
  titleHeader?: string
  children?: React.ReactNode | null
  className?: string
  classNameHeader?: string
  classNameContent?: string
  disableShowClear?: boolean
}

const MyFilter = ({
  titleHeader = '',
  children = null,
  className = '',
  classNameHeader = '',
  disableShowClear = false,
  classNameContent = '',
}: MyFilterType) => {
  const { translate } = useLanguage()
  const { clearAll, queries } = useQuerySearch()

  const getNumberQuery = useMemo(() => {
    try {
      let numberQuery = 0
      Object.values(queries).forEach((e) => {
        numberQuery += e.length
      })
      return numberQuery
    } catch (error) {
      console.log({ errorgetNumberQuery: error })

      return 0
    }
  }, [queries])

  return (
    <div
      className={`bg-white border-zinc-500 border-[1px] w-full  flex flex-col md:rounded-xl rounded-lg overflow-hidden ${className}`}
    >
      <div
        className={`border-b-[1px] border-zinc-500 w-full flex justify-between items-center  p-3 bg-green-200  ${classNameHeader}`}
      >
        <div className="flex items-center gap-2">
          <AlignLeftOutlined style={{ fontSize: 20 }} />
          <div className="text-medium ">
            {titleHeader || translate('menuProduct.category')}
          </div>
        </div>
        {!disableShowClear && (
          <div
            onClick={clearAll}
            className="hover:underline hover:font-medium cursor-pointer"
          >
            {`${translate('common.clearAll')} (${getNumberQuery})`}
          </div>
        )}
      </div>
      {children}
      <div className={`w-full  ${classNameContent}`}></div>
    </div>
  )
}

export default React.memo(MyFilter)
