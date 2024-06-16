import { DatabaseDocsType, DatabaseQueryType, DatabaseType, QueryData } from "@/constant/firebase";
import { QueryDocumentSnapshot, QuerySnapshot, WhereFilterOp, addDoc, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore/lite";
import { decryptData, encryptData } from "./crypto";
import { PageSizeLimit } from "@/constant/app";

export default class FirebaseFun {
  db: DatabaseType
  path = ''
  constructor(db: DatabaseType, path = '') {
    this.db = db
    this.path = path
  }

  formatData(data: any) {
    if (!data.data()) {
      return null
    }
    const dataTemp = data.data()
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

  async addData(data: any) {
    try {
      await addDoc(this.db, data)
      return true
    } catch (error) {
      console.log('🚀 ~ file: firebase.js:57 ~ FirebaseFun ~ addData ~ error:', error)
      return false
    }
  }

  async deleteData(id: string) {
    try {
      await deleteDoc(doc(this.db, id))
      return true
    } catch (error) {
      return false
    }
  }

  async queryDataOption2(dataLast: any, querySQL: QueryData, keyOderBy: string, limitPage: number = PageSizeLimit) {
    try {
      console.log('====================================');
      console.log({ querySQL });
      console.log('====================================');
      if (dataLast) {
        const docDetail = query(this.db, where(querySQL.key, querySQL.match, querySQL.value));

        const first = query(docDetail, orderBy(keyOderBy), startAfter(dataLast), limit(limitPage))
        const documentSnapshots = await getDocs(first);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc);
          }),
          lastVisible
        }
      } else {
        const first = query(
          this.db,
          where(querySQL.key, querySQL.match, querySQL.value),
          orderBy(keyOderBy),
          limit(limitPage)
        )
        const documentSnapshots = await getDocs(first);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];


        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc);
          }),
          lastVisible
        }
      }

    } catch (error) {
      return {
        data: null,
        lastVisible: null
      }
    }
  }

  async getDataOption2(dataLast: any, keyOderBy: string, limitPage: number = PageSizeLimit) {
    try {
      if (dataLast) {
        // const dataDecode: QueryDocumentSnapshot = JSON.parse(decryptData(dataLast))
        const next = query(this.db, orderBy(keyOderBy), startAfter(dataLast), limit(limitPage))
        const documentSnapshots = await getDocs(next);

        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc);
          }),
          // lastVisible: encryptData(JSON.stringify(lastVisible))
          lastVisible
        }
      } else {
        const first = query(this.db, orderBy(keyOderBy), limit(limitPage))
        const documentSnapshots = await getDocs(first);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc);
          }),
          // lastVisible: encryptData(JSON.stringify(lastVisible)),
          lastVisible
        }
      }


    } catch (error) {
      return {
        data: null,
        lastVisible: null
      }
    }
  }

}