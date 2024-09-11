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
var coffe_exports = {};
__export(coffe_exports, {
  coffe: () => coffe
});
module.exports = __toCommonJS(coffe_exports);
var import_server = require("@trpc/server");
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const coffe = (0, import_serverTRPC.router)({
  get_product_coffe: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { coffe_product_id } = await import_prisma.prisma.organization.findUniqueOrThrow({
      where: {
        id: input.organization_id
      },
      select: {
        coffe_product_id: true
      }
    });
    if (!coffe_product_id) {
      return { coffe_product_id };
    }
    const product = await import_prisma.prisma.product.findFirst({
      where: {
        id: coffe_product_id,
        organization_id: input.organization_id
      },
      include: {
        product_modification: {
          include: {
            app_product_modification: {
              // TODO: Comprobar si realmente hace falta
              include: {
                app_product_modification_group: true
              }
            }
          }
        }
      }
    });
    return {
      coffe_product_id,
      product
    };
  }),
  get_products_to_select_coffe: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const products = await import_prisma.prisma.product.findMany({
      where: {
        organization_id: input.organization_id
      },
      select: {
        id: true,
        name: true
      }
    });
    return { products };
  }),
  set_product_coffe: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      product_id: z.string().uuid().nullable()
    })
  ).mutation(async ({ ctx, input }) => {
    if (!input.product_id) {
      await import_prisma.prisma.organization.update({
        where: {
          id: input.organization_id
        },
        data: {
          coffe_product_id: null
        }
      });
      return true;
    }
    const product = await import_prisma.prisma.product.findUnique({
      where: {
        id: input.product_id,
        organization_id: input.organization_id
      }
    });
    if (!product) {
      throw new import_server.TRPCError({
        code: "CONFLICT",
        message: "Product not found"
      });
    }
    await import_prisma.prisma.organization.update({
      where: {
        id: input.organization_id
      },
      data: {
        coffe_product_id: input.product_id
      }
    });
    return true;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  coffe
});
//# sourceMappingURL=index.js.map
