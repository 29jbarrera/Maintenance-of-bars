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
var organizations_exports = {};
__export(organizations_exports, {
  organizations: () => organizations
});
module.exports = __toCommonJS(organizations_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
var import_products = require("./products");
var import_products_size_price = require("./products-size-price");
var import_printer_job = require("./printer-job");
var import_access = require("./access");
var import_products_categories = require("./products_categories");
var import_oidokocina = require("./oidokocina");
var import_orders = require("./orders");
var import_qr = require("./qr");
var import_organization_commander = require("./organization_commander");
var import_ingredients = require("./ingredients");
var import_share = require("./share");
var import_clients = require("./clients");
var import_product_category = require("./product-category");
var import_invoice = require("./invoice");
const organizations = (0, import_serverTRPC.router)({
  create_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      name: z.string(),
      billing_identifier: z.string(),
      billing_name: z.string(),
      billing_address: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization = await import_prisma.prisma.organization.create({
      data: {
        name: input.name,
        billing_identifier: input.billing_identifier,
        billing_name: input.billing_name,
        billing_address: input.billing_address
      }
    });
    return { organization };
  }),
  get_all: import_serverTRPC.publicProcedure.query(async ({ ctx }) => {
    const organizations2 = await import_prisma.prisma.organization.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return { organizations: organizations2 };
  }),
  view_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid()
    })
  ).query(async ({ ctx, input }) => {
    const organization = await import_prisma.prisma.organization.findUnique({
      where: {
        id: input.id
      },
      select: {
        id: true,
        name: true,
        billing_identifier: true,
        billing_name: true,
        billing_address: true
      }
    });
    const users_have_access = await import_prisma.prisma.user_has_access_to_organization.findMany({
      where: {
        o_id: input.id
      },
      include: {
        user: true
      }
    });
    return {
      organization,
      users_have_access
    };
  }),
  get_organization_name: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid()
    })
  ).query(async ({ ctx, input }) => {
    const organization = await import_prisma.prisma.organization.findUnique({
      where: {
        id: input.id
      },
      select: {
        name: true
      }
    });
    return organization;
  }),
  get_letterhead: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { letterhead } = await import_prisma.prisma.organization.findUniqueOrThrow({
      where: {
        id: input.id
      },
      select: {
        letterhead: true
      }
    });
    return { letterhead };
  }),
  update_letterhead: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      letterhead: z.any()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization = await import_prisma.prisma.organization.update({
      where: {
        id: input.id
      },
      data: {
        letterhead: input.letterhead
      }
    });
    return { organization };
  }),
  access: import_access.access,
  clients: import_clients.clients,
  ingredients: import_ingredients.ingredients,
  invoice: import_invoice.invoice,
  products: import_products.products,
  product_size: import_products_size_price.product_size,
  products_categories: import_products_categories.products_categories,
  product_category: import_product_category.product_category,
  printer_job: import_printer_job.printer_job,
  oidokocina: import_oidokocina.oidokocina,
  orders: import_orders.orders,
  qr: import_qr.qr,
  organization_commander: import_organization_commander.organization_commander,
  share: import_share.share
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizations
});
//# sourceMappingURL=index.js.map
