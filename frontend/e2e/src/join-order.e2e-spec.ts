import loginPage from './pages/login.po'
import ordersPage from './pages/orders.po'
import accountPage from './pages/account.po'
import tabsPage from './pages/tabs.po'
import orderDetailsPage from './pages/order-details.po'
import joinOrderPage from './pages/join-order.po'
import { USER_EMAIL, USER_PASSWORD } from './cnvironment'

describe('Join order', () => {
  it('should allow a user to join an order', () => {
    loginPage.navigateTo()
    loginPage.waitForPageToLoad()

    loginPage.enterEmail(USER_EMAIL)
    loginPage.enterPassword(USER_PASSWORD)
    loginPage.clickLogin()

    ordersPage.waitForOrderToLoad()
    ordersPage.clickViewOrder()

    orderDetailsPage.waitForPageToLoad()
    orderDetailsPage.clickJoinOrder()

    joinOrderPage.waitForPageToLoad()
    joinOrderPage.enterOrderVolume(500)
    joinOrderPage.clickJoinOrder()
    joinOrderPage.clickConfirmJoinOrder()
    joinOrderPage.clickJoinOrderOk()

    tabsPage.navigateTo()
    tabsPage.waitForPageToLoad()
    tabsPage.clickAccount()

    accountPage.waitForPageToLoad()
    accountPage.clickSignOut()

    loginPage.waitForPageToLoad()
  })
})
