import loginPage from './pages/login.po'
import ordersPage from './pages/orders.po'
import accountPage from './pages/account.po'
import tabsPage from './pages/tabs.po'
import orderDetailsPage from './pages/order-details.po'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './cnvironment'

describe('Initiate order', () => {
  it('should allow an admin to initiate order', () => {
    loginPage.navigateTo()
    loginPage.waitForPageToLoad()

    loginPage.enterEmail(ADMIN_EMAIL)
    loginPage.enterPassword(ADMIN_PASSWORD)
    loginPage.clickLogin()

    ordersPage.waitForPageToLoad()
    ordersPage.clickInitiateOrder()
    ordersPage.clickConfirmInitiateOrder()
    ordersPage.clickInitiateOrderOk()

    orderDetailsPage.waitForPageToLoad()

    tabsPage.navigateTo()
    tabsPage.waitForPageToLoad()
    tabsPage.clickAccount()

    accountPage.waitForPageToLoad()
    accountPage.clickSignOut()

    loginPage.waitForPageToLoad()
  })
})
