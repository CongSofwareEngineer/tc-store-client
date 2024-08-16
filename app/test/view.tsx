'use client'
import FormComobox from '@/components/ShadcnUI/FormComobox'
import MyButton from '@/components/ShadcnUI/MyButton'
import MyCombobox from '@/components/ShadcnUI/MyCombobox'
import { MyDrawer } from '@/components/ShadcnUI/MyDrawer'
import MyForm from '@/components/ShadcnUI/MyForm'
import MyInput from '@/components/ShadcnUI/MyInput'
import MySelect from '@/components/ShadcnUI/MySelect'
import { Button } from '@/components/ui/button'
import useMyDrawer from '@/hook/useMyDrawer'
import { delayTime } from '@/utils/functions'
import { EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import Select from 'react-select'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

const PageTestClient = () => {
  const arr: any[] = []
  for (let index = 0; index < 100; index++) {
    arr.push(index)
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const [isLoading, setisLoading] = useState(false)
  const [isOpenLeft, setIsOpenLeft] = useState(false)
  const [isOpenBottom, setIsOpenBottom] = useState(false)
  const [position, setposition] = useState<'top' | 'bottom' | 'left' | 'right'>(
    'bottom'
  )
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const { openModalDrawer, closeModalDrawer } = useMyDrawer()

  const onClick = () => {
    setisLoading(true)
    setTimeout(() => {
      setisLoading(false)
    }, 2000)
  }
  const onClickLeft = () => {
    openModalDrawer({
      title: 'New data',
      content: (
        <div className="flex flex-col w-full">
          {arr.map((e) => {
            return (
              <>
                <div>{`dsara : ${e}`}</div>
                <br />
              </>
            )
          })}
        </div>
      ),
      onlyDrawer: true,
      configDrawer: {
        position: 'right',
        width: '70vw',
      },
    })
  }

  const onClickBottom = () => {
    openModalDrawer({
      content: (
        <div className="flex flex-col w-full">
          {/* {arr.map((e) => {
            return (
              <>
                <div>{`dsara : ${e}`}</div>
                <br />
              </>
            )
          })} */}
          new content
        </div>
      ),
      onlyDrawer: true,
      title: 'New data',
      configDrawer: {
        // maxHeight: '70vh',
        configFooter: {
          showSubmit: true,
          callBackSubmit: async () => {
            await delayTime(2000)
          },
        },
      },
    })
  }

  return (
    <div>
      <MyButton typeBtn={'secondary'} onClick={onClick} loading={isLoading}>
        <div className="flex gap-2 items-center">
          <EditOutlined />
          <div> on Cliick</div>
        </div>
      </MyButton>

      <MyButton typeBtn={'dangerus'} onClick={onClickLeft}>
        open left
      </MyButton>
      <MyButton onClick={onClickBottom}>open bottom</MyButton>
      <MyInput className="w-full my-3" type="email" />
      <MyInput className="w-full my-3" type="number" />
      <MyInput className="w-full my-3" type="password" />
      <MyForm />
      <MySelect />
      <MyCombobox options={frameworks} loading={isLoading} />
      {/* <FormComobox /> */}
    </div>
  )
}

export default PageTestClient
