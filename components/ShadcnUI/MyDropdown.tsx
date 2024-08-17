import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import MyButton from './MyButton'

const MyDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MyButton typeBtn="outline">Open</MyButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MyDropdown
