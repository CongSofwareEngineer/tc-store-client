import queryString from 'query-string'
import { decryptData, encryptData } from './crypto'

export const generateMetaBase = ({
  dataBase,
  title = null,
  des = null,
  image = null,
  override = false,
  overrideImage = false,
}: {
  dataBase: Record<string, any>
  title?: string | null
  des?: string | null
  image?: string | null
  override?: boolean
  overrideImage?: boolean
}) => {
  const dataClone = JSON.parse(JSON.stringify(dataBase))
  if (title) {
    dataClone.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.openGraph.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.openGraph.siteName = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.twitter.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.appleWebApp.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
  }

  if (des) {
    dataClone.description = override ? des : `${dataBase.description} - ${des}`
    dataClone.openGraph.description = override ? des : `${dataBase.description} - ${des}`
    dataClone.twitter.description = override ? des : `${dataBase.description} - ${des}`
  }
  if (overrideImage && image) {
    dataClone.openGraph.images = [
      {
        url: image,
      },
    ]
    dataClone.twitter.images = image
  }
  return dataClone
}

export const pareDataClient = async (req: any): Promise<any> => {
  const dataReq = await req.json()
  let bodyDecode: any = decryptData(dataReq.data)
  bodyDecode = JSON.parse(bodyDecode)
  return bodyDecode
}

export const pareResponseDataClient = async (
  param: any,
  req: any
): Promise<{ data: any; message: string }> => {
  if (param.encode) {
    return {
      data: JSON.parse(decryptData(req.data?.data ?? req?.data ?? req ?? '')),
      message: 'success',
    }
  }
  return {
    data: req.data?.data ?? req?.data ?? req ?? '',
    message: 'success',
  }
}

export const formatResponseDataServer = async (data: any, bodyDecode: any): Promise<Response> => {
  const body = {
    data: data,
    message: 'success',
  }
  if (bodyDecode?.encode) {
    body.data = encryptData(JSON.stringify(data))
  }
  return new Response(JSON.stringify(body), { status: 200 })
}

export const formatSearchParams = (param: any) => {
  try {
    if (Object.entries(param).length === 0) {
      return ''
    }
    // let query = '?'
    // Object.entries(param).forEach(([key, value], index) => {
    //   if (index === Object.entries(param).length - 1) {
    //     query += `${key}=${value}`
    //   } else {
    //     query += `${key}=${value}&`

    //   }
    // })
    const searchPare = queryString.stringify(param, { arrayFormat: 'comma' })
    return `?${searchPare}`
  } catch (error) {
    return ''
  }
}
