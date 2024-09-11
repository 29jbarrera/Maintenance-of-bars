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
var admin_exports = {};
__export(admin_exports, {
  admin: () => admin
});
module.exports = __toCommonJS(admin_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var import_users = require("./users");
var import_organizations = require("./organizations");
var import_app_configs = require("./app-configs");
const admin = (0, import_serverTRPC.router)({
  users: import_users.users,
  organizations: import_organizations.organizations,
  app_configs: import_app_configs.app_configs
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  admin
});
//# sourceMappingURL=index.js.map
