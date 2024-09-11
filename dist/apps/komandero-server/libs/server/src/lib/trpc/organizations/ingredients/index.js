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
var ingredients_exports = {};
__export(ingredients_exports, {
  ingredients: () => ingredients
});
module.exports = __toCommonJS(ingredients_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const ingredients = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const ingredients2 = await import_prisma.prisma.ingredient.findMany({
      where: { organization_id: input.organization_id },
      orderBy: {
        name: "asc"
      }
    });
    return { ingredients: ingredients2 };
  }),
  create: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const ingredient_created = await import_prisma.prisma.ingredient.create({
      data: {
        organization_id: input.organization_id,
        name: input.name
      }
    });
    return { ingredient_created };
  }),
  update: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, organization_id, name } = input;
    const ingredient_updated = await import_prisma.prisma.ingredient.update({
      where: {
        id,
        organization_id
      },
      data: {
        name
      }
    });
    return { ingredient_updated };
  }),
  delete: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const igredient_deleted = await import_prisma.prisma.ingredient.delete({
      where: {
        id: input.id,
        organization_id: input.organization_id
      }
    });
    return { igredient_deleted };
  }),
  update_ingredient_product_price: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      price: z.number(),
      products_ids: z.array(z.string()),
      ingredients_ids: z.array(z.string())
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, price, products_ids, ingredients_ids } = input;
    for (const product_id of products_ids) {
      for (const ingredient_id of ingredients_ids) {
        const updated = await import_prisma.prisma.ingredient_product.upsert({
          create: {
            default: false,
            ingredient_id,
            organization_id,
            price,
            product_id
          },
          update: {
            price
          },
          where: {
            ingredient_id_product_id: {
              ingredient_id,
              product_id
            }
          }
        });
      }
    }
    return true;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ingredients
});
//# sourceMappingURL=index.js.map
