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
var printer_job_exports = {};
__export(printer_job_exports, {
  printer_job: () => printer_job
});
module.exports = __toCommonJS(printer_job_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const printer_job = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const organization_id = input.organization_id;
    const printer_jobs = await import_prisma.prisma.printer_job.findMany({
      where: { organization_id }
    });
    return { printer_jobs };
  }),
  reprint: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const printer_job2 = await import_prisma.prisma.printer_job.update({
      where: {
        id: input.id,
        organization_id: input.organization_id
      },
      data: {
        done: false
      }
    });
    return { printer_job: printer_job2 };
  }),
  delete: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const printer_job2 = await import_prisma.prisma.printer_job.delete({
      where: {
        id: input.id,
        organization_id: input.organization_id
      }
    });
    return { printer_job: printer_job2 };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  printer_job
});
//# sourceMappingURL=index.js.map
