import {click, find, get, input, text, wait} from "./helper.mjs";

/**
 * 1. Проверить, что страница загружена `data-test-id="main-page"`.
 * 2. Ввести адрес _ws://localhost:3000/backend/ws_ в `data-test-id="address"`.
 * 3. Ввести логин _test1_ в `data-test-id="login"`.
 * 4. Нажать на кнопу `data-test-id="connect"` _Connect_.
 * 5. Подождать 3 секунды.
 * 6. Проверить, что в статусе `data-test-id="connection-status"` _Connected_.
 * 7. Проверить, что список пользователей `data-test-id="user"` длиной 1 и пользователь _test1_.
 * 8. Проверить, что список сообщений пустой `data-test-id="message-container"`.
 * 9. Ввести в поле `data-test-id="message-field"` текст _Hello, world_.
 * 10. Нажать на кнопку `data-test-id="send-message"`.
 * 11. Подождать 5 секунд.
 * 12. Проверить, что список сообщений `data-test-id="message-container"` длиной 1.
 * 13. Проверить, что сообщение `data-test-id="message-data"` равно _Hello, world_.
 * 14. Проверить, что пользователь `data-test-id="message-user"` соотвествует _@test1_.
 */
export default async function run(page) {
    const login = "test1";
    const address = "ws://localhost:3000/backend/ws";
    const messageText = "Hello, world";

    await input(page, "address", address)
    await input(page, "login", login)
    await click(page, "connect")
    await wait(3)

    const status = await text(page, "connection-status")
    if (status !== "Connected") {
        throw new Error(`Wrong connection status [${status}], expected 'Connected'`)
    }

    const users = await get(page, "user", true)
    if (users.length !== 1) {
        throw new Error("Expected only one user")
    }

    const user = users[0]
    const userName = await page.evaluate(element => element.textContent, user);
    if (userName !== login) {
        throw new Error(`Wrong userName [${userName}], expected ${login}`)
    }

    let messages = await find(page, "message-container", true)
    const messageCount = messages?.length ?? 0

    await input(page, "message-field", messageText)
    await click(page, "send-message")
    await wait(3)

    messages = await find(page, "message-container", true)
    if (!messages || messages?.length !== messageCount + 1) {
        throw new Error(`Expected one message [${messageText}]`)
    }

    const messageData = await text(page, "message-data")
    if (messageData !== messageText) {
        throw new Error(`Wrong message text [${messageData}], expected ${messageText}`)
    }
    const messageUser = await text(page, "message-user")
    if (messageUser !== `@${login}`) {
        throw new Error(`Wrong message user [${messageUser}], expected @${login}`)
    }
}