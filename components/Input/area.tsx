import { Textarea, TextareaProps } from '@mantine/core'
import React from 'react'

type IInputArea = {
  showCount?: boolean
  error?: React.ReactNode
} & TextareaProps
const InputArea = ({ showCount = false, error = null, ...props }: IInputArea) => {
  const getLengthText = () => {
    if (props?.value?.toString()?.length) {
      return props?.value?.toString().length
    }
    return 0
  }

  return (
    <div className='flex flex-col gap-1 w-full'>
      <Textarea {...props} />
      {showCount && (
        <div className='flex justify-between gap-1'>
          <div className='flex flex-1'>{error}</div>
          <div className='flex text-xs justify-end'>{`${getLengthText()}/${props?.maxLength}`}</div>
        </div>
      )}
    </div>
  )
}

export default InputArea
