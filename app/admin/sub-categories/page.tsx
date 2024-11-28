import React, { Suspense } from 'react'
import SubCategoriesScreen from './view'

const SubCategoriesLayout = () => {
  return (
    <Suspense>
      <SubCategoriesScreen />
    </Suspense>
  )
}

export default SubCategoriesLayout
