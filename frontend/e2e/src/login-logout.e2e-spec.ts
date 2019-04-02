import loginPage from './pages/login.po'
import accountPage from './pages/account.po'
import tabsPage from './pages/tabs.po'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './cnvironment'

describe('Login and ogout', () => {
  it('should allow the user to log in and log out of the app', () => {
    loginPage.navigateTo()
    loginPage.waitForPageToLoad()
    loginPage.enterEmail(ADMIN_EMAIL)
    loginPage.enterPassword(ADMIN_PASSWORD)
    loginPage.clickLogin()

    tabsPage.waitForPageToLoad()
    tabsPage.clickAccount()

    accountPage.waitForPageToLoad()
    accountPage.clickSignOut()

    loginPage.waitForPageToLoad()
  })
})
