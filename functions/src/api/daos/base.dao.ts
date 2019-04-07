import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { BaseModel } from '../models/firestore.models'

@injectable()
export default abstract class BaseDao<T> {

  protected mapToResult(snap: fire.DocumentSnapshot): BaseModel<T> {
    return {
      id: snap.ref.id,
      data: <T>snap.data()
    }
  }

  protected mapToCollectionResult(snap: fire.QuerySnapshot): BaseModel<T>[] {
    return snap.docs.map(doc => this.mapToResult(doc))
  }
}
