'use client'
import React, { useEffect, useState } from 'react'
import { AboutProps } from './type'

import useUserData from '@/hook/useUserData'
import useLanguage from '@/hook/useLanguage'
import { PATH_IMG } from '@/constant/mongoDB'
import dynamic from 'next/dynamic'
import useModalDrawer from '@/hook/useModalDrawer'
import { Button, Input } from 'antd'
import ModalDelete from '@/components/ModalDelete'
import ClientApi from '@/services/clientApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import MyBlog from '@/components/MyBlog'
// const MyBlog = dynamic(() => import('@/components/MyBlog'), { ssr: false })

const INIT_DATA = {
  'b351b4ab-a9af-47a1-8be5-3029325fc9ab': {
    id: 'b351b4ab-a9af-47a1-8be5-3029325fc9ab',
    type: 'Paragraph',
    value: [
      {
        id: '9fed4bba-3182-4b61-8d50-b3ddc2e02279',
        type: 'paragraph',
        children: [
          {
            text: 'New',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 0,
    },
  },
}

const AboutScreen = ({ data }: AboutProps) => {
  const { openModalDrawer } = useModalDrawer()
  const { userData } = useUserData()
  const { translate } = useLanguage()
  const [category, setCategory] = useState(data?.category || '')
  const [loading, setLoading] = useState(false)
  const [dataAbout, setDataAbout] = useState<any>(data?.des ? JSON.parse(data.des) : INIT_DATA)

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)
      let res
      if (data) {
        res = await ClientApi.updateAbout(data._id, { des: JSON.stringify(dataAbout) })
      } else {
        res = await ClientApi.createAbout({ category, des: JSON.stringify(dataAbout) })
      }
      if (res.data) {
        if (data) {
          showNotificationSuccess(translate('success.update'))
        } else {
          showNotificationSuccess(translate('success.create'))
        }
      } else {
        if (data) {
          showNotificationError(translate('error.update'))
        } else {
          showNotificationError(translate('error.create'))
        }
      }
      setLoading(false)
    }

    openModalDrawer({
      content: <ModalDelete title={translate(data ? 'common.update' : 'common.create')} des='' callback={callBack} />,
    })
  }

  if (userData?.isAdmin) {
    return (
      <div className='flex w-full min-h-full flex-col gap-2'>
        <Button loading={loading} onClick={handleSubmit}>
          {translate('common.save')}
        </Button>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder={translate('textPopular.menuCategory')}
        />
        <MyBlog className='w-full h-full' pathFile={PATH_IMG.Products} value={dataAbout} setValue={setDataAbout} />
      </div>
    )
  }

  return (
    <div className='flex w-full  justify-center items-center py-5'>
      {dataAbout ? (
        <MyBlog pathFile={PATH_IMG.Products} value={dataAbout} disabled />
      ) : (
        <span className='text-2xl '>{translate('textPopular.notData')}</span>
      )}
    </div>
  )
}

export default AboutScreen
