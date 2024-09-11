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
var share_exports = {};
__export(share_exports, {
  share: () => share
});
module.exports = __toCommonJS(share_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const share = (0, import_serverTRPC.router)({
  select_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string()
    })
  ).mutation(async ({ input }) => {
    const categories = await import_prisma.prisma.product_category.findMany({
      where: {
        organization_id: input.organization_id
      },
      include: {
        product: true
      }
    });
    return {
      categories
    };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  share
});
//# sourceMappingURL=index.js.map
