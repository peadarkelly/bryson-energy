import { Context, BaseModel } from '../../src/api/models/firestore.models'

export const CTX: Context = { firestore: null }

export function toBaseModel<T>(id: string, model: T): BaseModel<T> {
  return {
    id: id,
    data: model
  }
}