"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizations = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
const utils_1 = require("../utils");
exports.organizations = (0, serverTRPC_1.router)({
    create: serverTRPC_1.publicProcedure
        .input(z.object({
        name: z.string(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const users_admin = yield (0, utils_1.get_users_admin_ids)();
        const organization = yield prisma_1.prisma.organization.create({
            data: {
                name: input.name,
                user_has_access_to_organization: {
                    createMany: {
                        data: users_admin.map((user_id) => ({
                            u_id: user_id,
                        })),
                    },
                },
                // TODO: poner roles por defecto
                user_has_role_in_organization: {
                    createMany: {
                        data: users_admin.map((user_id) => ({
                            role: 'user_manager',
                            u_id: user_id,
                        })),
                    },
                },
            },
        });
        return organization;
    })),
    edit_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string(),
        billing_identifier: z.string(),
        billing_name: z.string(),
        billing_address: z.string(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { id, billing_identifier, billing_name, billing_address } = input;
        const update = yield prisma_1.prisma.organization.update({
            data: {
                billing_identifier,
                billing_address,
                billing_name,
            },
            where: {
                id
            }
        });
        return update;
    })),
});
//# sourceMappingURL=index.js.map