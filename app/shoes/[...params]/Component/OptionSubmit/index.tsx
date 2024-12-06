import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import React from 'react'

const OptionSubmit = () => {
  const {isMobile}=useMedia()
  const {translate}=useLanguage()
  return (
    <div>OptionSubmit</div>
  )
}

export default OptionSubmit