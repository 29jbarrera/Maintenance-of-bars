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
var qr_exports = {};
__export(qr_exports, {
  qr: () => qr
});
module.exports = __toCommonJS(qr_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const qr = (0, import_serverTRPC.router)({
  //Categorias de productos
  get_categories_of_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id } = input;
    const categories = await import_prisma.prisma.product_category.findMany({
      where: { organization_id },
      orderBy: {
        qr_o: "asc"
      },
      select: {
        id: true,
        name: true,
        qr_o: true,
        qr_v: true
      }
    });
    return categories;
  }),
  // Cambiar orden de las categorias de productso
  change_order_categories_of_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      id: z.string().uuid(),
      qr_v: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, id, qr_v } = input;
    const update_view_category = await import_prisma.prisma.product_category.update({
      where: {
        organization_id,
        id
      },
      data: {
        qr_v: !qr_v
      }
    });
    return update_view_category;
  }),
  // Guardar orden de categorias
  save_order_category: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      categories: z.array(
        z.object({
          id: z.string().uuid(),
          qr_o: z.number()
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, categories } = input;
    for (let _category of categories) {
      const { id, qr_o } = _category;
      await import_prisma.prisma.product_category.update({
        where: {
          organization_id,
          id
        },
        data: {
          qr_o
        }
      });
    }
    return true;
  }),
  // Ver productos dentro de una categoría
  get_products_within_category: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      product_category_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, product_category_id } = input;
    const products = await import_prisma.prisma.product.findMany({
      where: {
        organization_id,
        product_category_id
      },
      select: {
        id: true,
        name: true,
        qr_o: true,
        qr_v: true,
        product_allergen: true
      },
      orderBy: {
        qr_o: "asc"
      }
    });
    return products;
  }),
  // Ver nombre de una categoría
  get_name_of_category: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, id } = input;
    const category = await import_prisma.prisma.product_category.findFirst({
      where: {
        organization_id,
        id
      },
      select: {
        name: true
      }
    });
    return category;
  }),
  // Cambiar orden de productos de una categoría
  change_order_of_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      id: z.string().uuid(),
      qr_v: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, id, qr_v } = input;
    const update_view_category = await import_prisma.prisma.product.update({
      where: {
        organization_id,
        id
      },
      data: {
        qr_v: !qr_v
      }
    });
    return update_view_category;
  }),
  // Guardar orden de productos de una categoría
  save_order_products: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      products: z.array(
        z.object({
          id: z.string().uuid(),
          qr_o: z.number()
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, products } = input;
    for (let _product of products) {
      const { id, qr_o } = _product;
      await import_prisma.prisma.product.update({
        where: {
          organization_id,
          id
        },
        data: {
          qr_o
        }
      });
    }
    return true;
  }),
  change_allergen: import_serverTRPC.publicProcedure.input(
    z.object({
      product_id: z.string().uuid(),
      a_id: z.number(),
      active: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { product_id, a_id, active } = input;
    let allergen;
    if (active) {
      allergen = await import_prisma.prisma.product_allergen.delete({
        where: {
          product_id_a_id: {
            product_id,
            a_id
          }
        }
      });
      return allergen;
    }
    allergen = await import_prisma.prisma.product_allergen.create({
      data: {
        product_id,
        a_id
      }
    });
    return allergen;
  }),
  // Ver todos los alergenos
  getAllAllergen: import_serverTRPC.publicProcedure.mutation(async ({ ctx }) => {
    const allergens = await import_prisma.prisma.allergen.findMany({});
    return { allergens };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  qr
});
//# sourceMappingURL=index.js.map
