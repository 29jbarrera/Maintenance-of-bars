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
var organization_commander_exports = {};
__export(organization_commander_exports, {
  organization_commander: () => organization_commander
});
module.exports = __toCommonJS(organization_commander_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const organization_commander = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      o_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { o_id } = input;
    const organizations_commanders = await import_prisma.prisma.organization_commander.findMany({
      where: {
        o_id
      }
    });
    return organizations_commanders;
  }),
  get_categories_and_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id } = input;
    const categories_and_products = await import_prisma.prisma.product_category.findMany({
      where: { organization_id },
      orderBy: {
        qr_o: "asc"
      },
      include: {
        product: true
      }
    });
    return { categories_and_products };
  }),
  update: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      form: z.object({
        name: z.string(),
        order: z.number(),
        print_available: z.boolean(),
        print_name: z.string(),
        status_selected: z.array(z.string()),
        max_time: z.number(),
        name_internals: z.boolean(),
        notifications: z.boolean()
      }),
      product_categories_blocked: z.array(z.string()),
      product_ids_blocked: z.array(z.string()),
      product_ids_allowed: z.array(z.string())
    })
  ).mutation(async ({ ctx, input }) => {
    const {
      form,
      id,
      product_categories_blocked,
      product_ids_blocked,
      product_ids_allowed
    } = input;
    const {
      name,
      order,
      print_available,
      print_name,
      status_selected,
      max_time,
      name_internals,
      notifications
    } = form;
    const organization_commander2 = await import_prisma.prisma.organization_commander.findFirstOrThrow({
      where: { id }
    });
    const update = await import_prisma.prisma.organization_commander.update({
      where: {
        id
      },
      data: {
        name,
        order,
        print_available,
        print_name,
        conf: {
          ...organization_commander2.conf,
          status_selected,
          product_categories_blocked,
          product_ids_blocked,
          product_ids_allowed,
          max_time,
          name_internals,
          notifications
        }
      }
    });
    return update;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organization_commander
});
//# sourceMappingURL=index.js.map
