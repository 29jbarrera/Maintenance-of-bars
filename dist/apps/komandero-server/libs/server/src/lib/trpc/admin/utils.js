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
var utils_exports = {};
__export(utils_exports, {
  get_users_admin_ids: () => get_users_admin_ids,
  is_admin_user: () => is_admin_user
});
module.exports = __toCommonJS(utils_exports);
var import_prisma = require("@komandero/prisma");
const USERS_ADMIN = ["damian@kissandcode.com"];
async function is_admin_user(user_id) {
  return true;
}
async function get_users_admin_ids() {
  const users = await import_prisma.prisma.user.findMany({
    where: { email: { in: USERS_ADMIN } }
  });
  return users.map((user) => user.id);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get_users_admin_ids,
  is_admin_user
});
//# sourceMappingURL=utils.js.map
