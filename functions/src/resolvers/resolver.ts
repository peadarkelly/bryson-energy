import { Context } from '../models/firestore.models'

export default interface Resolver {
  resolve(parent: any, args: any, ctx: Context): Promise<any>
}
