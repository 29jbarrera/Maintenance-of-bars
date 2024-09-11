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
var oidokocina_exports = {};
__export(oidokocina_exports, {
  oidokocina: () => oidokocina
});
module.exports = __toCommonJS(oidokocina_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
var import_integration = require("./integration");
var import_integration2 = require("./integration");
const oidokocina = (0, import_serverTRPC.router)({
  get_my_config: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    let config = await import_prisma.prisma.oidokocina_configuration.findFirst({
      where: {
        o_id: input.organization_id
      }
    });
    if (!config) {
      config = await import_prisma.prisma.oidokocina_configuration.create({
        data: {
          o_id: input.organization_id,
          a: 0,
          p: "",
          version: "1",
          modeloImpresora: 1,
          numconfig: 1
        }
      });
    }
    return config;
  }),
  save_my_config: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid(),
      a: z.number(),
      p: z.string(),
      version: z.string(),
      modeloImpresora: z.number(),
      numconfig: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const config = await import_prisma.prisma.oidokocina_configuration.update({
      where: {
        id: input.id
      },
      data: {
        a: input.a,
        p: input.p,
        version: input.version,
        modeloImpresora: input.modeloImpresora,
        numconfig: input.numconfig
      }
    });
    return config;
  }),
  get_pedidos: import_serverTRPC.publicProcedure.input(
    z.object({
      fechaini: z.string(),
      fechafin: z.string(),
      estado: z.array(z.number()),
      formaPago: z.number(),
      formaEntrega: z.number(),
      // Origin is enum
      origen: z.string()
      // .refine((val) => OK_ORIGIN_ARRAY.includes(val as OK_TYPE_OF_ORIGIN), {
      //   message: `El valor debe ser uno de los siguientes: ${OK_ORIGIN_ARRAY.join(
      //     ', '
      //   )}`,
      // }),
    })
  ).mutation(async ({ ctx, input }) => {
    const origen = input.origen;
    return (0, import_integration2.obtener_pedidos)({
      estado: input.estado,
      fechaini: input.fechaini,
      fechafin: input.fechafin,
      formaPago: input.formaPago,
      formaEntrega: input.formaEntrega,
      origen
    });
  }),
  get_un_pedido: import_serverTRPC.publicProcedure.input(
    z.object({
      // ID del pedido
      id: z.string(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    return (0, import_integration2.obtener_un_pedido)(input.id);
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  oidokocina
});
//# sourceMappingURL=index.js.map
