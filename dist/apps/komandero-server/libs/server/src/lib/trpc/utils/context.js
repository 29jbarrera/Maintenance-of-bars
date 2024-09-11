var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var context_exports = {};
__export(context_exports, {
  createContext: () => createContext,
  getUserFromContext: () => getUserFromContext,
  getUserIdFormContext: () => getUserIdFormContext
});
module.exports = __toCommonJS(context_exports);
var trpc = __toESM(require("@trpc/server"));
var import_decoke_and_verify_token = require("./decoke-and-verify-token");
var import_prisma = require("@komandero/prisma");
async function createContext({
  req,
  res
}) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1] ?? "";
      return await (0, import_decoke_and_verify_token.decoke_and_verify_token)(token);
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user
  };
}
function getUserIdFormContext(ctx) {
  if (!ctx || !ctx.user || !ctx.user.id) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this"
    });
  }
  return ctx.user.id;
}
async function getUserFromContext(ctx) {
  if (!ctx || !ctx.user || !ctx.user.id) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this"
    });
  }
  const user_id = ctx.user.id;
  const user = await import_prisma.prisma.user_data.findFirst({
    where: {
      id: user_id
    }
  });
  if (!user) {
    throw new trpc.TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this"
    });
  }
  return user;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContext,
  getUserFromContext,
  getUserIdFormContext
});
//# sourceMappingURL=context.js.map
