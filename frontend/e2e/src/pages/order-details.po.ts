import { browser, by, element, protractor } from 'protractor'

class OrderDetailsPage {
  waitForPageToLoad() {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id('join-order'))), 10000, 'Element taking too long to appear in the DOM')
  }

  clickJoinOrder() {
    return element(by.id('join-order')).click()
  }
}

export default new OrderDetailsPage()
