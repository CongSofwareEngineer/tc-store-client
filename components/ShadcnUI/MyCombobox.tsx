import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import MyLoading from '../MyLoading'
import useLanguage from '@/hook/useLanguage'

type props = {
  options: { label: string | undefined; value: string | undefined }[]
  loading?: boolean
  titleSearch?: string
  onChange?: (param?: any) => void
  value?: any
  hideSearch?: boolean
}
const MyCombobox = ({
  options = [],
  loading = false,
  titleSearch = '',
  onChange = () => {},
  hideSearch = false,
  value,
}: props) => {
  const [open, setOpen] = React.useState(false)
  const { translate } = useLanguage()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8 font-[400]"
        >
          {loading ? (
            <MyLoading />
          ) : value ? (
            options.find((framework) => framework.value === value)?.label
          ) : (
            titleSearch || 'Select framework...'
          )}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {!hideSearch && (
            <CommandInput placeholder={titleSearch || 'Search framework...'} />
          )}

          <CommandList>
            {!loading && (
              <CommandEmpty>{translate('textPopular.notData')}</CommandEmpty>
            )}
            <CommandGroup>
              {loading ? (
                <MyLoading />
              ) : (
                <>
                  {options.map((framework) => (
                    <CommandItem
                      className="cursor-pointer"
                      key={framework.value}
                      value={framework?.label}
                      onSelect={() => {
                        if (framework?.value !== value) {
                          onChange(framework?.value)
                        }
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === framework.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default MyCombobox
