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
var clients_exports = {};
__export(clients_exports, {
  clients: () => clients
});
module.exports = __toCommonJS(clients_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const clients = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ input }) => {
    const clients2 = await import_prisma.prisma.organization_client.findMany({
      where: {
        organization_id: input.organization_id
      }
    });
    return { clients: clients2 };
  }),
  create: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid(),
      name: z.string().min(3).max(20),
      nif: z.string().length(9),
      phone: z.string(),
      email: z.string().min(3).max(20).email(),
      address: z.string(),
      cp: z.string(),
      locality: z.string(),
      province: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const clients2 = await import_prisma.prisma.organization_client.create({
      data: {
        organization_id: input.organization_id,
        name: input.name,
        nif: input.nif,
        phone: input.phone,
        email: input.email,
        address: input.address,
        cp: input.cp,
        locality: input.locality,
        province: input.province
      }
    });
    return [clients2];
  }),
  edit: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      name: z.string().min(3).max(20),
      nif: z.string().length(9),
      phone: z.string(),
      email: z.string().min(3).max(20).email(),
      address: z.string(),
      cp: z.string(),
      locality: z.string(),
      province: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { organization_id, name, nif, phone, email, address, id, cp, locality, province } = input;
    await import_prisma.prisma.organization_client.update({
      where: {
        id,
        organization_id
      },
      data: {
        name,
        nif,
        phone,
        email,
        address,
        cp,
        locality,
        province
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
    const cliente = await import_prisma.prisma.organization_client.delete({
      where: {
        id: input.id,
        organization_id: input.organization_id
      }
    });
    return { cliente };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clients
});
//# sourceMappingURL=index.js.map
