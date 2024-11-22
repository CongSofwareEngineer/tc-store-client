import { PATH_IMG } from '@/constant/app'

const CloudinaryServices = {
  config: {
    cloudName: 'tc-store',
    apiKey: '359654788484534',
    apiSecret: 'vOHwtW8xux5KIzklJ2RgQkbE-Bk',
    CLOUDINARY_URL:
      'cloudinary://359654788484534:vOHwtW8xux5KIzklJ2RgQkbE-Bk@tc-store',
    url: `https://api.cloudinary.com/v1_1/tc-store`,
  },
  uploadFile: async (file: File, path: PATH_IMG) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CloudinaryServices.config.apiSecret)
    console.log('====================================')
    console.log({ path })
    console.log('====================================')
    try {
      const call = await fetch(
        `${CloudinaryServices.config.url}/image/upload`,
        { method: 'POST', body: formData }
      )
      const response = await call.json()

      return {
        secure_url: response.secure_url,
        width: response.width,
        height: response.height,
        url: response.url,
        asset_id: response.asset_id,
        format: response.format,
        public_id: response.public_id,
        version_id: response.version_id,
        name: response.original_filename,
        bytes: response.bytes,
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
export default CloudinaryServices
