import { IFileImage } from '@/components/UploadImage'

export type IDataWriteComment = {
  idProduct: string
  sdt: string
  name: string
  note: string
  rate: number
  listImg: IFileImage[]
}
