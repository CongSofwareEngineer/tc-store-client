import Link, { LinkProps } from 'next/link'
import React from 'react'
type LinkType = {
  children: React.ReactNode
} & LinkProps
const MyLink = ({ href, children, ...props }: LinkType) => {
  return (
    <Link href={href} className="shadow-lg" {...props}>
      {children}
    </Link>
  )
}

export default MyLink
