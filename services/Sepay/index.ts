import { METHOD_SUPPORT } from '@/constants/sepay'
import axios from 'axios'
import { IBody, IResListPayment } from './type'

class Sepay {
  stk = '0392225405'

  async post(body: IBody) {
    try {
      const data = await axios.post('/api/sepay', body)
      return {
        data: data.data,
        status: 200,
      }
    } catch (error) {
      console.log({ errorPost: error })
      return {
        error: null,
        status: 200,
      }
    }
  }

  async getCountTransactions() {
    return this.post({
      type: METHOD_SUPPORT.getCountPayment,
      body: {
        account_number: this.stk,
      },
    })
  }
  async getListPayment(): Promise<IResListPayment> {
    const data = await this.post({
      type: METHOD_SUPPORT.getListPayment,
      body: {
        account_number: this.stk,
      },
    })
    return data.data
  }
}
const SepayServices = new Sepay()

export default SepayServices
