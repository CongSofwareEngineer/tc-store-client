
import type { NextApiResponse } from 'next'



export async function POST(req: any, res: NextApiResponse<any>) {
  console.log('====================================');
  console.log({ req: req.body });
  console.log('====================================');

  res.status(200).json({ name: 'John Doe' })

  // try {
  //   const dataReq = await req.
  //   let bodyDecode = decryptData(dataReq.data)
  //   bodyDecode = JSON.parse(bodyDecode)

  //   if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
  //     return Response.json(
  //       {
  //         data: null,
  //         message: 'bad request',
  //         error: 'your is hacker'
  //       },
  //       {
  //         status: 500
  //       }
  //     )
  //   }

  //   const bodyData = bodyDecode.body
  //   let dataRequest = ''

  //   const config = {
  //     url: bodyDecode.url,
  //     method: bodyDecode.method || REQUEST_TYPE.GET,
  //     isCache: false
  //   }
  //   switch (bodyData?.method) {
  //     case REQUEST_TYPE.POST:
  //     case REQUEST_TYPE.PUT:
  //       config.body = bodyData.body
  //       break;
  //   }
  //   if (bodyData?.isAThu) {
  //     config.isAThu = true
  //   }
  //   dataRequest = await fetchConfig(config)

  //   if (bodyDecode?.encode) {
  //     return Response.json({
  //       data: encryptData(JSON.stringify(dataRequest)),
  //       message: 'success'
  //     })
  //   }

  //   return Response.json({
  //     data: dataRequest,
  //     message: 'success'
  //   })
  // } catch (error) {
  //   return Response.json(
  //     {
  //       data: null,
  //       message: 'bad request',
  //       error: 'your is hacker'
  //     },
  //     {
  //       status: 500
  //     }
  //   )
  // }
}
