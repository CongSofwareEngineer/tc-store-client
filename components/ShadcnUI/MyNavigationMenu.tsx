import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useRouter } from 'next/navigation'
type ItemNavigationMenu = {
  title?: React.ReactNode | string
  url?: string
}

export type NavigationMenuProps = {
  title?: React.ReactNode | string
  link?: string
  content: ItemNavigationMenu[]
}

type Props = {
  data: NavigationMenuProps[]
}
function MyNavigationMenu({ data = [] }: Props) {
  const router = useRouter()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data.map((e, index) => {
          return (
            <NavigationMenuItem key={`MyNavigationMenu-${index}`}>
              <NavigationMenuTrigger>{e.title}</NavigationMenuTrigger>
              {e.content.length > 0 && (
                <NavigationMenuContent>
                  {e.content.map((item, indexContent) => {
                    return (
                      <div
                        key={`MyNavigationMenu-content-${indexContent}`}
                        onClick={() => {
                          item.url && router.push(item.url || '')
                        }}
                        className="px-3 py-1 hover:bg-gray-200 flex flex-nowrap text-nowrap"
                      >
                        {item.title}
                      </div>
                    )
                  })}
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MyNavigationMenu
