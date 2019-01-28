import { Component, OnInit } from '@angular/core'
import { GetUserAccountGQL, GetUserAccount } from '../graphql/generated'
import { ApolloQueryResult } from 'apollo-client'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {

  public account: GetUserAccount.GetUser

  public constructor(
    private storage: Storage,
    private getUserAccountGQL: GetUserAccountGQL) {}

  public ngOnInit() {
    this.storage.get('user').then(user => {
      this.getUserAccountGQL.fetch({ userId: user }).subscribe(({ data }: ApolloQueryResult<GetUserAccount.Query>) => {
        this.account = data.getUser
      })
    })
  }

}
