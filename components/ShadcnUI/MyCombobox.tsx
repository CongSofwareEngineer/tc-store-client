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
}
const MyCombobox = ({
  options = [],
  loading = false,
  titleSearch = '',
}: props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { translate } = useLanguage()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
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
          <CommandInput placeholder={titleSearch || 'Search framework...'} />
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
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue)
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
