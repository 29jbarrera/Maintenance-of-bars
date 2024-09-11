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
var orders_exports = {};
__export(orders_exports, {
  orders: () => orders
});
module.exports = __toCommonJS(orders_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const orders = (0, import_serverTRPC.router)({
  order_of_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const orders2 = await import_prisma.prisma.orders.findMany({
      where: {
        organization_id: input.organization_id
      },
      orderBy: {
        created_at: "asc"
      }
    });
    const eating_tables = await import_prisma.prisma.eating_tables.findMany({
      where: {
        organization_id: input.organization_id
      }
    });
    const eating_tables_groups = await import_prisma.prisma.eating_table_group.findMany({
      where: {
        organization_id: input.organization_id
      },
      include: {
        eating_tables: true
      }
    });
    const users = await import_prisma.prisma.user.findMany({
      where: {
        user_has_access_to_organization: {
          some: {
            o_id: input.organization_id
          }
        }
      },
      select: {
        id: true,
        displayName: true,
        email: true
      }
    });
    return { orders: orders2, eating_tables, users, eating_tables_groups };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orders
});
//# sourceMappingURL=index.js.map
