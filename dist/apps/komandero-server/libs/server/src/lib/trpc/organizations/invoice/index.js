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
var invoice_exports = {};
__export(invoice_exports, {
  invoice: () => invoice
});
module.exports = __toCommonJS(invoice_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const invoice = (0, import_serverTRPC.router)({
  get_invoices_between_dates: import_serverTRPC.publicProcedure.input(
    z.object({
      from: z.string(),
      to: z.string(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ input }) => {
    const { from, to, organization_id } = input;
    const invoices = await import_prisma.prisma.invoice.findMany({
      where: {
        organization_id,
        created_at: {
          gte: new Date(from),
          lte: new Date(to)
        }
      }
    });
    return { invoices };
  }),
  get_invoice_by_id: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ input }) => {
    const { id, organization_id } = input;
    const invoice2 = await import_prisma.prisma.invoice.findUniqueOrThrow({
      where: {
        organization_id,
        id
      },
      include: { invoice_line: true, organization_client: true }
    });
    return { invoice: invoice2 };
  }),
  //  PETICIÓN PARA AÑADIR CLIENTE A FACTURA REVISAR
  add_client_to_invoice: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_client_id: z.string().uuid()
    })
  ).mutation(async ({ input }) => {
    const { id, organization_client_id } = input;
    const update_invoice = await import_prisma.prisma.invoice.update({
      where: { id },
      data: {
        organization_client_id
      },
      include: {
        invoice_line: true,
        organization_client: true
      }
    });
    return { update_invoice };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  invoice
});
//# sourceMappingURL=index.js.map
