import { DatabaseDocsType, DatabaseQueryType, DatabaseType, QueryData } from "@/constant/firebase";
import { WhereFilterOp, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { encryptData } from "./crypto";

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
    if (dataTemp?.cost) {
      dataTemp.cost = encryptData(dataTemp?.cost)
    }
    return dataTemp;
  }

  async getAllData(): Promise<any> {
    const data = await getDocs(this.db)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })
  }


  async queryData(key: string, match: WhereFilterOp, value: string) {
    const docDetail: DatabaseQueryType = query(this.db, where(key, match, value));
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })
  }

  async listQueryData(listQuery: QueryData[] = []): Promise<any> {
    let docDetail: DatabaseQueryType = query(this.db)
    listQuery.forEach(e => {
      docDetail = query(docDetail, where(e.key, e.match, e.value))
    })
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc);
    })
  }

  async updateData(id: string, data: any): Promise<boolean> {
    try {
      const temp: DatabaseDocsType = await doc(this.db, id);
      await updateDoc(temp, data)
      return true
    } catch (error) {
      console.log('🚀 ~ file: firebase.js:67 ~ FirebaseFun ~ updateData ~ error:', error)
      return false
    }
  }

  async getDataByID(id: string) {
    const temp = doc(this.db, id);
    const data = await getDoc(temp);
    return this.formatData(data);
  }
}