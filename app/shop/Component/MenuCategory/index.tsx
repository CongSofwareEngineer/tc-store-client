import { FilterAPI } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useQueryUrl from '@/hook/useQueryUrl'
import { useAppSelector } from '@/redux/store'
import { cloneData } from '@/utils/functions'
import { Checkbox } from 'antd'
import React from 'react'
import Media from 'react-media'
import { AlignLeftOutlined } from '@ant-design/icons'

const MenuCategory = () => {
  const { translate } = useLanguage()
  const { queries, updateQuery } = useQueryUrl()

  const { CategoryMenu } = useAppSelector((state) => state.app)

  // const [tabMenu, setTabMenu] = useState(['category'])

  const onChangeCategory = (keyType: string, value: boolean) => {
    console.log('====================================')
    console.log({ keyType, value })
    console.log('====================================')
    let dataClone = cloneData(queries?.[FilterAPI.TypeProduct] || [])
    if (value) {
      dataClone = [...dataClone, keyType]
    } else {
      dataClone = dataClone.filter((type: string) => type !== keyType)
    }
    updateQuery(FilterAPI.TypeProduct, dataClone)
  }

  const renderCategory = () => {
    return (
      <div className="w-full flex gap-1 md:gap-3 md:flex-col md:mt-2 flex-wrap">
        {CategoryMenu?.CategoryMenu &&
          CategoryMenu?.CategoryMenu?.map((menu, index) => {
            return (
              <div
                className={`md:w-full px-4 py-2 md:border-b-lime-200 ${
                  index !== CategoryMenu?.CategoryMenu.length - 1 &&
                  'md:border-b-[1px]'
                }`}
                key={`menu_${index}`}
              >
                <Checkbox
                  checked={queries?.[FilterAPI.TypeProduct]?.includes(menu.key)}
                  onChange={(e) => onChangeCategory(menu.key, e.target.checked)}
                >
                  <div className="whitespace-nowrap">{menu.name}</div>
                </Checkbox>
              </div>
            )
          })}
      </div>
    )
  }

  const renderMenuDesktop = () => {
    return (
      <div className="bg-white border-black border-[1px] w-full gap-2 flex flex-col rounded-xl overflow-hidden ">
        <div
          className={`border-b-[1px] border-black w-full flex justify-between items-center  p-3 bg-green-200 `}
        >
          <div className="flex items-center gap-2">
            <AlignLeftOutlined style={{ fontSize: 20 }} />
            <div className="text-medium ">
              {translate('menuProduct.category')}
            </div>
          </div>
          <div
            onClick={() => updateQuery(FilterAPI.TypeProduct, [])}
            className="hover:underline hover:font-medium cursor-pointer"
          >
            {`${translate('common.clearAll')} (${
              queries?.[FilterAPI.TypeProduct]?.length || 0
            })`}
          </div>
        </div>
        <div className="w-full flex md:flex-col gap-2 pb-3">
          {renderCategory()}
        </div>
      </div>
    )
    // const items = [
    //   {
    //     key: 'category',
    //     expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
    //     label: (
    //       <div className="flex justify-between items-center">
    //         <div className="text-medium ">
    //           {translate('menuProduct.category')}
    //         </div>
    //         <div
    //           onClick={() => updateQuery(FilterAPI.TypeProduct, [])}
    //           className="hover:underline hover:font-medium cursor-pointer"
    //         >
    //           {`${translate('common.clearAll')} (${
    //             queries?.[FilterAPI.TypeProduct]?.length || 0
    //           })`}
    //         </div>
    //       </div>
    //     ),
    //     children: renderCategory(),
    //   },
    // ]

    // return (
    //   <MyCollapse
    //     expandIcon={({ isActive }: { isActive: boolean }) => (
    //       <CaretRightOutlined rotate={isActive ? 90 : 0} />
    //     )}
    //     defaultActiveKey={tabMenu}
    //     items={items}
    //   />
    // )
  }

  const renderMenuMobile = () => {
    return <>renderMenuMobile</>
  }

  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderMenuDesktop()
        }
        return renderMenuMobile()
      }}
    </Media>
  )
}

export default MenuCategory
