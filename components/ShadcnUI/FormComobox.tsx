import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useLanguage from '@/hook/useLanguage'
type Props = {
  label?: string
  name: string
  form?: any
  options: { label: string | undefined; value: string | undefined }[]
}
const FormComobox = ({ label, form, name, options = [] }: Props) => {
  const { translate } = useLanguage()
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? options.find((language) => language.value === field.value)
                        ?.label
                    : 'Select language'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandList>
                  <CommandEmpty>
                    {translate('textPopular.notData')}
                  </CommandEmpty>
                  <CommandGroup>
                    {options.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          form.setValue(name, language.value)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            language.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormComobox
