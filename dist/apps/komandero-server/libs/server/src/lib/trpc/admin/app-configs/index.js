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
var app_configs_exports = {};
__export(app_configs_exports, {
  app_configs: () => app_configs
});
module.exports = __toCommonJS(app_configs_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
BigInt.prototype["toJson"] = function() {
  return this.toString();
};
const app_configs = (0, import_serverTRPC.router)({
  product_modification_group: import_serverTRPC.publicProcedure.query(async ({ ctx }) => {
    const app_product_modifications_groups = await import_prisma.prisma.app_product_modification_group.findMany({
      orderBy: {
        id: "asc"
      }
    });
    return {
      app_product_modifications_groups: app_product_modifications_groups.map(
        (r) => {
          return {
            ...r,
            id: r.id.toString()
          };
        }
      )
    };
  }),
  update_product_modification_group: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.number(),
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, name } = input;
    const _id = BigInt(id);
    const updated = await import_prisma.prisma.app_product_modification_group.update({
      where: {
        id: _id
      },
      data: {
        name
      }
    });
    const updated_group = {
      id: updated.id.toString(),
      name: updated.name
    };
    return { updated_group };
  }),
  product_modifications_of_group: import_serverTRPC.publicProcedure.input(
    z.object({
      apmg: z.number()
    })
  ).query(async ({ ctx, input }) => {
    const app_product_modifications = await import_prisma.prisma.app_product_modification.findMany({
      where: {
        apmg: BigInt(String(input.apmg))
      }
    });
    return {
      app_product_modifications: app_product_modifications.map((r) => {
        return {
          ...r,
          id: r.id.toString(),
          apmg: (r.apmg || "").toString()
        };
      })
    };
  }),
  check_if_exist_product_id: import_serverTRPC.publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const id = input;
    const _id = BigInt(id);
    const exist = await import_prisma.prisma.app_product_modification.findUnique({
      where: {
        id: _id
      }
    });
    return !!exist;
  }),
  add_product_modification_to_group: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.number(),
      apmg: z.number(),
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, apmg, name } = input;
    const _id = BigInt(id);
    const _apmg = BigInt(apmg);
    const create = await import_prisma.prisma.app_product_modification.create({
      data: {
        id: _id,
        apmg: _apmg,
        name
      }
    });
    const app_product_modification = {
      id: create.id.toString(),
      apmg: (create.apmg || "").toString(),
      name: create.name
    };
    return { app_product_modification };
  }),
  update_product_modification_in_group: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.number(),
      apmg: z.number(),
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, apmg, name } = input;
    const _id = BigInt(id);
    const _apmg = BigInt(apmg);
    const update = await import_prisma.prisma.app_product_modification.update({
      where: {
        id: _id
      },
      data: {
        apmg: _apmg,
        name
      }
    });
    const update_product_modification = {
      id: update.id.toString(),
      apmg: (update.apmg || "").toString(),
      name: update.name
    };
    return { update_product_modification };
  }),
  delete_product_modification_in_group: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id } = input;
    const _id = BigInt(id);
    const deleted = await import_prisma.prisma.app_product_modification.delete({
      where: {
        id: _id
      }
    });
    const deleted_product_modification = {
      id: deleted.id.toString()
    };
    return { deleted_product_modification };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app_configs
});
//# sourceMappingURL=index.js.map
