import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MyInput from '../MyInput'

const MySelect = () => {
  const [isOpen, setisOpen] = useState(false)
  const [value, setvalue] = useState('')
  console.log({ isOpen, value })

  return (
    <Select
      value={value}
      onValueChange={(e) => setvalue(e)}
      onOpenChange={(e) => setisOpen(e)}
    >
      <SelectTrigger className="w-[180px]">
        {isOpen ? <MyInput /> : <SelectValue placeholder="Select a fruit" />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default MySelect
