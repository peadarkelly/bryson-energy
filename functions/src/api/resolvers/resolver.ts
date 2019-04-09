import { Context } from '../../firestore/firestore.models'

export default interface Resolver {
  resolve(parent: any, args?: any, ctx?: Context): Promise<any>
}
