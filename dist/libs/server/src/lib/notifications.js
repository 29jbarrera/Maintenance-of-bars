"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageMarkdown = void 0;
const telegraf_1 = require("telegraf");
const NOTIFICATION_GROUP_ID = '295276478';
const bot = new telegraf_1.Telegraf('6862903033:AAEtOz95S8R3VbZKXpw0xck1V4sqZwtpy80');
function sendMessageMarkdown(message) {
    bot.telegram
        .sendMessage(NOTIFICATION_GROUP_ID, message, {
        parse_mode: 'Markdown',
    })
        .then()
        .catch();
}
exports.sendMessageMarkdown = sendMessageMarkdown;
//# sourceMappingURL=notifications.js.map