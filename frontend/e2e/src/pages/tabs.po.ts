import { by, element, browser } from 'protractor'
import BasePage from './basePage.po'

class TabsPage extends BasePage {
  navigateTo() {
    return browser.get('/')
  }

  waitForPageToLoad() {
    return super.waitForElement('tab-button-account')
  }

  clickAccount() {
    return element(by.id('tab-button-account')).click()
  }
}

export default new TabsPage()
