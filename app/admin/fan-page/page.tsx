import { NextPage } from 'next'
import React, { Suspense } from 'react'
import FanPageScreen from './view'

const FanPageLayout: NextPage = () => {
  return (
    <Suspense>
      <FanPageScreen />
    </Suspense>
  )
}

export default FanPageLayout
