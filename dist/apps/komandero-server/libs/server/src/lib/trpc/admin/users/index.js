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
var users_exports = {};
__export(users_exports, {
  users: () => users
});
module.exports = __toCommonJS(users_exports);
var import_serverTRPC = require("@komandero/serverTRPC");
var z = __toESM(require("zod"));
var import_prisma = require("@komandero/prisma");
var import_firebase = require("../../../firebase");
const users = (0, import_serverTRPC.router)({
  get_users: import_serverTRPC.publicProcedure.query(async ({ ctx }) => {
    const users2 = await import_prisma.prisma.user.findMany({
      select: {
        id: true,
        displayName: true,
        uid: true,
        email: true
      },
      orderBy: {
        created_at: "desc"
      }
    });
    return { users: users2 };
  }),
  view_user: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid()
    })
  ).query(async ({ ctx, input }) => {
    const user = await import_prisma.prisma.user.findUnique({
      where: {
        id: input.id
      }
    });
    const organizations_have_access = await import_prisma.prisma.user_has_access_to_organization.findMany({
      where: {
        u_id: input.id
      },
      include: {
        organization: true
      }
    });
    return {
      user,
      organizations_have_access
    };
  }),
  edit_display_name: import_serverTRPC.publicProcedure.input(
    z.object({
      id: z.string().uuid(),
      displayName: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const user = await import_prisma.prisma.user.update({
      where: {
        id: input.id
      },
      data: {
        displayName: input.displayName
      }
    });
    return true;
  }),
  get_organizations_to_add_user: import_serverTRPC.publicProcedure.query(async ({ ctx }) => {
    const organizations = await import_prisma.prisma.organization.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return { organizations };
  }),
  add_user_to_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      u_id: z.string().uuid(),
      o_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const add_organization_to_user = await import_prisma.prisma.user_has_access_to_organization.create({
      data: {
        u_id: input.u_id,
        o_id: input.o_id
      },
      include: {
        organization: true
      }
    });
    return { add_organization_to_user };
  }),
  remove_user_to_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      u_id: z.string().uuid(),
      o_id: z.string().uuid()
    })
  ).mutation(async ({ ctx, input }) => {
    const { u_id, o_id } = input;
    const remove_organization = await import_prisma.prisma.user_has_access_to_organization.delete({
      where: {
        u_id_o_id: {
          u_id,
          o_id
        }
      }
    });
    return true;
  }),
  toggle_user_on_organization: import_serverTRPC.publicProcedure.input(
    z.object({
      u_id: z.string().uuid(),
      o_id: z.string().uuid(),
      disabled: z.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const updated = await import_prisma.prisma.user_has_access_to_organization.update({
      where: {
        u_id_o_id: {
          o_id: input.o_id,
          u_id: input.u_id
        }
      },
      data: {
        disabled: input.disabled
      }
    });
    return { success: !!updated };
  }),
  create_user: import_serverTRPC.publicProcedure.input(
    z.object({
      email: z.string().email(),
      displayName: z.string(),
      password: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const { email, displayName, password } = input;
    const _email = email.toLowerCase().trim();
    await (0, import_firebase.create_user)({
      displayName,
      email: _email,
      password
    });
    return { success: true };
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  users
});
//# sourceMappingURL=index.js.map
