import { by, element, browser, protractor } from 'protractor'

class TabsPage {
  navigateTo() {
    return browser.get('/')
  }

  waitForPageToLoad() {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id('tab-button-account'))), 10000, 'Element taking too long to appear in the DOM')
  }

  clickAccount() {
    return element(by.id('tab-button-account')).click()
  }
}

export default new TabsPage()
