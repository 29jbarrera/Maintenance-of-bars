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
var products_categories_exports = {};
__export(products_categories_exports, {
  products_categories: () => products_categories
});
module.exports = __toCommonJS(products_categories_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const products_categories = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const product_sizes = await import_prisma.prisma.product_category.findMany({
      where: { organization_id },
      orderBy: {
        qr_o: "asc"
      }
    });
    return { product_sizes };
  }),
  create: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      name: z.string().min(3).max(20)
    })
  ).mutation(async ({ ctx, input }) => {
    const product_category = await import_prisma.prisma.product_category.create({
      data: {
        organization_id: input.organization_id,
        name: input.name
      }
    });
    return { product_category };
  }),
  edit: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      name: z.string().min(3).max(20)
    })
  ).mutation(async ({ ctx, input }) => {
    await import_prisma.prisma.product_category.update({
      where: {
        id: input.id,
        organization_id: input.organization_id
      },
      data: {
        name: input.name
      }
    });
    return {};
  }),
  delete: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const product = await import_prisma.prisma.product_category.delete({
      where: {
        id: input.id,
        organization_id: input.organization_id
      }
    });
    return { product };
  }),
  save_order_category: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      categories: z.array(
        z.object({
          id: z.string().uuid(),
          priority_u: z.number()
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, categories } = input;
    for (let _category of categories) {
      const { id, priority_u } = _category;
      await import_prisma.prisma.product_category.update({
        where: {
          organization_id,
          id
        },
        data: {
          priority_u
        }
      });
    }
    return true;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  products_categories
});
//# sourceMappingURL=index.js.map
