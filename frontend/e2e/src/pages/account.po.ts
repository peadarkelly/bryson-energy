import { by, element, protractor, browser } from 'protractor'

class AccountPage {
  waitForPageToLoad() {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id('sign-out'))), 10000, 'Element taking too long to appear in the DOM')
  }

  clickSignOut() {
    return element(by.id('sign-out')).click()
  }
}

export default new AccountPage()
