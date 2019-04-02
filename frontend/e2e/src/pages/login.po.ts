import { browser, by, element, protractor, $ } from 'protractor'

class LoginPage {
  navigateTo() {
    return browser.get('/login')
  }

  waitForPageToLoad() {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id('email'))), 10000, 'Element taking too long to appear in the DOM')
  }

  enterEmail(email: string) {
    const el = element(by.id('email'))
    el.click()
    return el.sendKeys(email)
  }

  enterPassword(password: string) {
    const el = element(by.id('password'))
    el.click()
    return el.sendKeys(password)
  }

  clickLogin() {
    return element(by.id('sign-in')).click()
  }
}

export default new LoginPage()
