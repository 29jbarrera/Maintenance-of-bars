"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.access = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ input }) {
        const users_has_access = yield prisma_1.prisma.user_has_access_to_organization.findMany({
            where: {
                o_id: input.organization_id,
            },
            include: {
                user: {
                    include: {
                        user_has_role_in_organization: {
                            where: {
                                o_id: input.organization_id,
                            },
                        },
                    },
                },
            },
            orderBy: {
                u_id: 'desc',
            },
        });
        const app_roles = yield prisma_1.prisma.app_role.findMany();
        const organization_name = yield prisma_1.prisma.organization.findUniqueOrThrow({
            where: {
                id: input.organization_id,
            },
            select: {
                name: true,
            },
        });
        return { users_has_access, app_roles, organization_name };
    })),
    edit_access_role: serverTRPC_1.publicProcedure
        .input(z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
        role: z.string(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { u_id, o_id, role } = input;
        const ifExists = yield prisma_1.prisma.user_has_role_in_organization.findUnique({
            where: {
                u_id_o_id_role: {
                    u_id,
                    o_id,
                    role,
                },
            },
            select: {
                disabled: true,
            },
        });
        if (!ifExists) {
            const create_role = yield prisma_1.prisma.user_has_role_in_organization.create({
                data: {
                    o_id,
                    u_id,
                    role,
                },
            });
            return create_role;
        }
        const updated_role = yield prisma_1.prisma.user_has_role_in_organization.update({
            where: {
                u_id_o_id_role: {
                    u_id,
                    o_id,
                    role,
                },
            },
            data: {
                disabled: !ifExists.disabled,
            },
        });
        return updated_role;
    })),
});
//# sourceMappingURL=index.js.map