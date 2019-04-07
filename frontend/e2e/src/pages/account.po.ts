import { by, element } from 'protractor'
import BasePage from './basePage.po'

class AccountPage extends BasePage {
  waitForPageToLoad() {
    return super.waitForElement('sign-out')
  }

  clickSignOut() {
    return element(by.id('sign-out')).click()
  }
}

export default new AccountPage()
