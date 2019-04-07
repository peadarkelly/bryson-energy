import { by, element } from 'protractor'
import BasePage from './basePage.po'

class OrderDetailsPage extends BasePage {
  waitForPageToLoad() {
    return super.waitForElement('join-order')
  }

  clickJoinOrder() {
    return element(by.id('join-order')).click()
  }
}

export default new OrderDetailsPage()
