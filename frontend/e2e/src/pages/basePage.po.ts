import { browser, by, element, protractor } from 'protractor'

export default abstract class BasePage {

  protected waitForElement(id: string) {
    const until = protractor.ExpectedConditions
    return browser.wait(until.presenceOf(element(by.id(id))), 10000, 'Element taking too long to appear in the DOM')
  }

  protected enterValue(id: string, value: number | string) {
    const el = element(by.id(id))
    el.click()
    return el.sendKeys(value)
  }

}
