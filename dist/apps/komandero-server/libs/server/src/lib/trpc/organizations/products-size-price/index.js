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
var products_size_price_exports = {};
__export(products_size_price_exports, {
  product_size: () => product_size
});
module.exports = __toCommonJS(products_size_price_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const product_size = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const product_sizes = await import_prisma.prisma.product_size.findMany({
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
      name: z.string().min(3).max(20),
      qr_o: z.number().int().min(0)
    })
  ).mutation(async ({ ctx, input }) => {
    const product_size2 = await import_prisma.prisma.product_size.create({
      data: {
        organization_id: input.organization_id,
        qr_o: input.qr_o,
        name: input.name
      }
    });
    return { product_size: product_size2 };
  }),
  edit: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      name: z.string().min(1).max(20),
      qr_o: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, organization_id, name, qr_o } = input;
    await import_prisma.prisma.product_size.update({
      where: {
        id,
        organization_id
      },
      data: {
        name,
        qr_o
      }
    });
    return {};
  }),
  // edit_price: publicProcedure
  // .input(
  //   z.object({
  //     id: z.string().uuid(),
  //     organization_id: z.string().uuid(),
  //     price: z.number(),
  //   })
  // )
  // .mutation(async ({ ctx, input }) => {
  //   const { id, organization_id, price } = input;
  //   await prisma.product_size_price.update({
  //     where: {
  //       id,
  //       organization_id,
  //     },
  //     data: {
  //       price,
  //     },
  //   });
  //   return {};
  // }),
  delete: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const product = await import_prisma.prisma.product_size.delete({
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
      product_size: z.array(
        z.object({
          id: z.string().uuid(),
          qr_o: z.number()
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, product_size: product_size2 } = input;
    for (let _product_size of product_size2) {
      const { id, qr_o } = _product_size;
      await import_prisma.prisma.product_size.update({
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
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  product_size
});
//# sourceMappingURL=index.js.map
