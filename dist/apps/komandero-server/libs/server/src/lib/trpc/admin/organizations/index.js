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
var import_utils = require("../utils");
const organizations = (0, import_serverTRPC.router)({
  create: import_serverTRPC.publicProcedure.input(
    z.object({
      name: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const users_admin = await (0, import_utils.get_users_admin_ids)();
    const organization = await import_prisma.prisma.organization.create({
      data: {
        name: input.name,
        user_has_access_to_organization: {
          createMany: {
            data: users_admin.map((user_id) => ({
              u_id: user_id
            }))
          }
        },
        // TODO: poner roles por defecto
        user_has_role_in_organization: {
          createMany: {
            data: users_admin.map((user_id) => ({
              role: "user_manager",
              u_id: user_id
            }))
          }
        }
      }
    });
    return organization;
  }),
  edit_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string(),
      billing_identifier: z.string(),
      billing_name: z.string(),
      billing_address: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { id, billing_identifier, billing_name, billing_address } = input;
    const update = await import_prisma.prisma.organization.update({
      data: {
        billing_identifier,
        billing_address,
        billing_name
      },
      where: {
        id
      }
    });
    return update;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizations
});
//# sourceMappingURL=index.js.map
