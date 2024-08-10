import React from 'react'
import useLanguage from '@/hook/useLanguage'
import MyButton from '../MyButton'

type Props = {
  hasLoadMore?: boolean
  title?: string
  callback?: () => any
  loading?: boolean
}
const MyLoadMore = ({
  loading = false,
  hasLoadMore = false,
  title = '',
  callback,
}: Props) => {
  const { translate } = useLanguage()
  return hasLoadMore ? (
    <div className="mt-4 w-full flex justify-center items-center">
      <MyButton onClick={callback} loading={loading}>
        {title || translate('textPopular.loadMore')}
      </MyButton>
    </div>
  ) : (
    <div className="w-full text-center my-3">
      {translate('textPopular.fullData')}
    </div>
  )
}

export default MyLoadMore
