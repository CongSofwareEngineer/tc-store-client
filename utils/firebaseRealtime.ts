import { FirebaseServices } from '@/services/firebaseService'
import {
  DatabaseReference,
  endAt,
  get,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  startAfter,
} from 'firebase/database'
import { PAGE_SIZE_LIMIT } from '../constant/app'

class FBRealtimeUtils {
  private db: DatabaseReference
  private lastData?: number | null = null
  constructor(name = 'Chat') {
    const fb = FirebaseServices.initRealtimeData()
    this.db = ref(fb, name)
  }

  listenerOnValue(callback: (value: any) => void) {
    onValue(this.db, (snapshot) => {
      const data = snapshot.val()
      callback(data)
    })
  }

  async getDataByLimit(pagesize = PAGE_SIZE_LIMIT): Promise<{ data: any[]; loadMore: boolean }> {
    try {
      let queryRef

      if (typeof this.lastData === 'number' && this.lastData <= 0) {
        this.lastData = null
        return {
          data: [],
          loadMore: true,
        }
      }
      if (this.lastData) {
        queryRef = query(this.db, orderByChild('date'), endAt(this.lastData), limitToLast(pagesize))
      } else {
        queryRef = query(this.db, limitToLast(pagesize))
      }

      //get data
      const snapshot = await get(queryRef)
      const data: any[] = []

      snapshot.forEach((childSnapshot) => {
        data.push({ id: childSnapshot.key, ...childSnapshot.val() })
      })
      if (data.length === 0) {
        this.lastData = null
        return {
          data: [],
          loadMore: true,
        }
      }
      this.lastData = Number(data[0].date) - 1

      return {
        data,
        loadMore: true,
      }
    } catch (error) {
      console.log({ error })
      this.lastData = null
      return {
        data: [],
        loadMore: true,
      }
    }
  }
}

export default FBRealtimeUtils
