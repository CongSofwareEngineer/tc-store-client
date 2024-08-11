export type DataAddCart = {
  amount: number
  date?: string
  idProduct?: string
  idUser?: string
  moreConfig?: { [key: string]: any };
}

export type DataAddComment = {
  idProduct?: string
  sdt?: string
  listImg?: {[key:string]:any}[];
  name?:string
  rate?:number
  note:string
}