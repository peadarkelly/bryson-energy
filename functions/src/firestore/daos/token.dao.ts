import { injectable } from 'inversify'
import { firestore as fire } from 'firebase-admin'
import { Context, BaseModel, TokenModel } from '../firestore.models'
import BaseDao from './base.dao'

@injectable()
export default class TokenDao extends BaseDao<TokenModel> {

  public async createToken(ctx: Context, token: TokenModel): Promise<void> {
    await ctx.firestore.collection('tokens').doc(token.token).set(token)
  }

  public async getTokens(ctx: Context): Promise<BaseModel<TokenModel>[]> {
    const tokensSnap: fire.QuerySnapshot = await ctx.firestore.collection('tokens').get()

    return super.mapToCollectionResult(tokensSnap)
  }
}
