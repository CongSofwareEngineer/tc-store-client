import { RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import { useRouter } from 'next/navigation'

type BtnBackType = {
  children?: React.ReactNode | undefined
  onClick?: ((param?: any) => void) | null
  url?: string[] | string
  title?: string[] | string
}

const BtnBack = ({ title, url = [], onClick = null }: BtnBackType) => {
  // const BtnBack = ({ title, url = [] }: BtnBackType) => {
  const router = useRouter()

  return (
    <div className="flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 ">
      <MyImage
        onClick={() => (onClick ? onClick() : router.back())}
        src={images.icon.iconBack}
        widthImage={'25px'}
        heightImage={'25px'}
        alt={'TC Store Icon Back page '}
        className="cursor-pointer"
      />
      <div className="ml-2 flex gap-1">
        {typeof title === 'string' ? (
          <div className="md:text-[16px] text-[14px]">{title}</div>
        ) : (
          title?.map((item, index) => {
            if (url[index]) {
              return (
                <Link
                  className="cursor-pointer hover:underline text-[16px] text-blue-700"
                  href={url[index]}
                  key={item}
                >
                  {item} <RightOutlined className="black" />
                </Link>
              )
            }
            return (
              <div className="md:text-[16px] text-[14px]" key={item}>
                {item}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default BtnBack
