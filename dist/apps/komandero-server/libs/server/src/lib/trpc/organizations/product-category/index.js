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
var product_category_exports = {};
__export(product_category_exports, {
  product_category: () => product_category
});
module.exports = __toCommonJS(product_category_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const product_category = (0, import_serverTRPC.router)({
  get_by_id: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const category = await import_prisma.prisma.product_category.findUniqueOrThrow({
      where: {
        id: input.id
      },
      include: {
        product: true,
        product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category: {
          include: {
            product_category_product_category_has_other_product_category_pc_idToproduct_category: true
          }
        },
        product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category: {
          include: {
            product_category_product_category_has_other_product_category_idToproduct_category: true
          }
        }
      }
    });
    return { category };
  }),
  add_categories_that_modify: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      categories_ids: z.array(z.string().uuid())
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, categories_ids } = input;
    let add_categories_that_modify = [];
    for (const pc_id of categories_ids) {
      const add = await import_prisma.prisma.product_category_has_other_product_category.create({
        data: {
          pc_id,
          id
        }
      });
      add_categories_that_modify.push(add);
    }
    return { add_categories_that_modify };
  }),
  delete_categories_that_modify: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      category_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, category_id } = input;
    const removed_categories_that_modify = await import_prisma.prisma.product_category_has_other_product_category.delete({
      where: {
        id_pc_id: {
          id,
          pc_id: category_id
        }
      }
    });
    return { removed_categories_that_modify };
  }),
  edit_category_that_modify: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      category_id: z.string().uuid(),
      o: z.number(),
      pi: z.number(),
      not_add_princing: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, category_id, ...dataToUpdate } = input;
    const update_category = await import_prisma.prisma.product_category_has_other_product_category.update({
      where: {
        id_pc_id: {
          id,
          pc_id: category_id
        }
      },
      data: dataToUpdate
    });
    return { update_category };
  }),
  add_categories_that_use: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      categories_ids: z.array(z.string().uuid())
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, categories_ids } = input;
    let add_categories_that_use = [];
    for (const pc_id of categories_ids) {
      const add = await import_prisma.prisma.product_category_has_other_product_category.create({
        data: {
          pc_id: id,
          id: pc_id
        }
      });
      add_categories_that_use.push(add);
    }
    return { add_categories_that_use };
  }),
  delete_categories_that_use: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      category_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, category_id } = input;
    const delete_categories_that_use = await import_prisma.prisma.product_category_has_other_product_category.delete({
      where: {
        id_pc_id: {
          id: category_id,
          pc_id: id
        }
      }
    });
    return { delete_categories_that_use };
  }),
  edit_category_that_use: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      category_id: z.string().uuid(),
      o: z.number(),
      pi: z.number(),
      not_add_princing: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, category_id, ...dataToUpdate } = input;
    const update_category = await import_prisma.prisma.product_category_has_other_product_category.update({
      where: {
        id_pc_id: {
          id: category_id,
          pc_id: id
        }
      },
      data: dataToUpdate
    });
    return { update_category };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  product_category
});
//# sourceMappingURL=index.js.map
