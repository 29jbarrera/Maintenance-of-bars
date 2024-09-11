import { Telegraf } from 'telegraf';

const NOTIFICATION_GROUP_ID = '295276478';
const bot = new Telegraf('6862903033:AAEtOz95S8R3VbZKXpw0xck1V4sqZwtpy80');

export function sendMessageMarkdown(message: string) {
  bot.telegram
    .sendMessage(NOTIFICATION_GROUP_ID, message, {
      parse_mode: 'Markdown',
    })
    .then()
    .catch();
}
