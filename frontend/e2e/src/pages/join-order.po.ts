import { browser, by, element, protractor } from 'protractor'
import BasePage from './basePage.po'

class JoinOrderPage extends BasePage {
  waitForPageToLoad() {
    return super.waitForElement('order-volume')
  }

  enterOrderVolume(volume: number) {
    return super.enterValue('order-volume', volume)
  }

  clickJoinOrder() {
    return element(by.id('join-order-submit')).click()
  }

  clickConfirmJoinOrder() {
    const until = protractor.ExpectedConditions
    browser.wait(until.presenceOf(element(by.className('join-order-confirm'))), 10000, 'Element taking too long to appear in the DOM')
    return element(by.className('join-order-confirm')).click()
  }

  clickJoinOrderOk() {
    const until = protractor.ExpectedConditions
    browser.wait(until.presenceOf(element(by.className('join-order-ok'))), 10000, 'Element taking too long to appear in the DOM')
    browser.sleep(500)
    return element(by.className('join-order-ok')).click()
  }
}

export default new JoinOrderPage()
