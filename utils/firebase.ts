import { DatabaseType, QueryData } from "@/constant/firebase";
import { WhereFilterOp, getDocs, query, where } from "firebase/firestore/lite";

export default class FirebaseFun {
  db: DatabaseType
  path = ''
  constructor(db: DatabaseType, path = '') {
    this.db = db
    this.path = path
  }

  formatData(data: any) {
    const dataTemp = data.data();
    dataTemp.id = data.id;
    return dataTemp;
  }

  async getAllData() {
    const data = await getDocs(this.db)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })
  }


  async queryData(key: string, match: WhereFilterOp, value: string) {
    const docDetail = query(this.db, where(key, match, value));
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })
  }

  async listQueryData(listQuery: QueryData[] = []) {

    let docDetail: DatabaseType = query(this.db)
    listQuery.forEach(e => {
      docDetail = query(docDetail, where(e.key, e.match, e.value))
    })

    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })

  }
}