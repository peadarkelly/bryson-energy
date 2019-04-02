import { browser, by, element } from 'protractor'
import BasePage from './basePage.po'

class LoginPage extends BasePage {
  navigateTo() {
    return browser.get('/login')
  }

  waitForPageToLoad() {
    return super.waitForElement('email')
  }

  enterEmail(email: string) {
    return super.enterValue('email', email)
  }

  enterPassword(password: string) {
    return super.enterValue('password', password)
  }

  clickLogin() {
    return element(by.id('sign-in')).click()
  }
}

export default new LoginPage()
