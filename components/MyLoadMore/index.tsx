import React from 'react'
import PrimaryButton from '../PrimaryButton'
import useLanguage from '@/hook/useLanguage'

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
  return (
    hasLoadMore && (
      <div className="mt-4 w-full flex justify-center items-center">
        <PrimaryButton onClick={callback} loading={loading}>
          {title || translate('textPopular.loadMore')}
        </PrimaryButton>
      </div>
    )
  )
}

export default MyLoadMore
