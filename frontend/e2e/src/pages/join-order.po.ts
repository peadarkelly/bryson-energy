import { browser, by, element, protractor } from 'protractor'

class JoinOrderPage {
  waitForPageToLoad() {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id('order-volume'))), 10000, 'Element taking too long to appear in the DOM')
  }

  enterOrderVolume(volume: number) {
    const el = element(by.id('order-volume'))
    el.click()
    return el.sendKeys(volume)
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
