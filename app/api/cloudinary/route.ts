
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export async function POST(req: any) {
  const dataReq = await req.json()

  const signature = cloudinary.utils.api_sign_request(dataReq.paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string);

  return new Response(JSON.stringify({ signature }), { status: 200, })
}
