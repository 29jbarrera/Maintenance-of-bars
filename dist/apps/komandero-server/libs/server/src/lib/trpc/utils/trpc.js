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
var trpc_exports = {};
__export(trpc_exports, {
  publicProcedure: () => publicProcedure,
  router: () => router,
  t: () => t
});
module.exports = __toCommonJS(trpc_exports);
var import_server = require("@trpc/server");
const t = import_server.initTRPC.context().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    const { code, message } = error;
    return {
      ...shape,
      data: {
        code,
        message
      }
    };
  }
});
const router = t.router;
const publicProcedure = t.procedure;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  publicProcedure,
  router,
  t
});
//# sourceMappingURL=trpc.js.map
