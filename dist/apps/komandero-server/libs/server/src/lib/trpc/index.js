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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trpc_exports = {};
__export(trpc_exports, {
  appRouter: () => appRouter
});
module.exports = __toCommonJS(trpc_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var import_admin = require("./admin");
var import_organizations = require("./organizations");
__reExport(trpc_exports, require("./utils"), module.exports);
const appRouter = (0, import_serverTRPC.router)({
  version: import_serverTRPC.publicProcedure.query(({ ctx }) => {
    return "1.0.0";
  }),
  admin: import_admin.admin,
  organizations: import_organizations.organizations
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appRouter,
  ...require("./utils")
});
//# sourceMappingURL=index.js.map
