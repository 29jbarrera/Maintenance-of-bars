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
var access_exports = {};
__export(access_exports, {
  access: () => access
});
module.exports = __toCommonJS(access_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
const access = (0, import_serverTRPC.router)({
  get_all: import_serverTRPC.publicProcedure.input(
    z.object({
      organization_id: z.string().uuid()
    })
  ).mutation(async ({ input }) => {
    const users_has_access = await import_prisma.prisma.user_has_access_to_organization.findMany({
      where: {
        o_id: input.organization_id
      },
      include: {
        user: {
          include: {
            user_has_role_in_organization: {
              where: {
                o_id: input.organization_id
              }
            }
          }
        }
      },
      orderBy: {
        u_id: "desc"
      }
    });
    const app_roles = await import_prisma.prisma.app_role.findMany();
    const organization_name = await import_prisma.prisma.organization.findUniqueOrThrow({
      where: {
        id: input.organization_id
      },
      select: {
        name: true
      }
    });
    return { users_has_access, app_roles, organization_name };
  }),
  edit_access_role: import_serverTRPC.publicProcedure.input(
    z.object({
      u_id: z.string().uuid(),
      o_id: z.string().uuid(),
      role: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { u_id, o_id, role } = input;
    const ifExists = await import_prisma.prisma.user_has_role_in_organization.findUnique({
      where: {
        u_id_o_id_role: {
          u_id,
          o_id,
          role
        }
      },
      select: {
        disabled: true
      }
    });
    if (!ifExists) {
      const create_role = await import_prisma.prisma.user_has_role_in_organization.create({
        data: {
          o_id,
          u_id,
          role
        }
      });
      return create_role;
    }
    const updated_role = await import_prisma.prisma.user_has_role_in_organization.update({
      where: {
        u_id_o_id_role: {
          u_id,
          o_id,
          role
        }
      },
      data: {
        disabled: !ifExists.disabled
      }
    });
    return updated_role;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  access
});
//# sourceMappingURL=index.js.map
