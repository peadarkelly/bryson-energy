import { browser, by, element, protractor } from 'protractor'
import BasePage from './basePage.po'

class OrdersPage extends BasePage {
  waitForPageToLoad() {
    return super.waitForElement('initiate-order')
  }

  waitForOrderToLoad() {
    return super.waitForElement('view-order')
  }

  clickInitiateOrder() {
    const scrollToScript = 'document.getElementById("initiate-order").scrollIntoView();'

    browser.driver.executeScript(scrollToScript).then(function() {
      browser.sleep(500)
      return element(by.id('initiate-order')).click()
    })
  }

  clickConfirmInitiateOrder() {
    const until = protractor.ExpectedConditions
    browser.wait(until.presenceOf(element(by.className('initiate-order-confirm'))), 10000, 'Element taking too long to appear in the DOM')
    return element(by.className('initiate-order-confirm')).click()
  }

  clickInitiateOrderOk() {
    const until = protractor.ExpectedConditions
    browser.wait(until.presenceOf(element(by.className('initiate-order-ok'))), 10000, 'Element taking too long to appear in the DOM')
    browser.sleep(500)
    return element(by.className('initiate-order-ok')).click()
  }

  clickViewOrder() {
    return element(by.id('view-order')).click()
  }
}

export default new OrdersPage()
