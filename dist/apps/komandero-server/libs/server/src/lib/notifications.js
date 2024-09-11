var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var notifications_exports = {};
__export(notifications_exports, {
  sendMessageMarkdown: () => sendMessageMarkdown
});
module.exports = __toCommonJS(notifications_exports);
var import_telegraf = require("telegraf");
const NOTIFICATION_GROUP_ID = "295276478";
const bot = new import_telegraf.Telegraf("6862903033:AAEtOz95S8R3VbZKXpw0xck1V4sqZwtpy80");
function sendMessageMarkdown(message) {
  bot.telegram.sendMessage(NOTIFICATION_GROUP_ID, message, {
    parse_mode: "Markdown"
  }).then().catch();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendMessageMarkdown
});
//# sourceMappingURL=notifications.js.map
