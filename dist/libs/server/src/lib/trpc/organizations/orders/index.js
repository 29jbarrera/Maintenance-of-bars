"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.orders = (0, serverTRPC_1.router)({
    order_of_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const orders = yield prisma_1.prisma.orders.findMany({
            where: {
                organization_id: input.organization_id,
            },
            orderBy: {
                created_at: 'asc',
            },
        });
        const eating_tables = yield prisma_1.prisma.eating_tables.findMany({
            where: {
                organization_id: input.organization_id,
            },
        });
        const eating_tables_groups = yield prisma_1.prisma.eating_table_group.findMany({
            where: {
                organization_id: input.organization_id,
            },
            include: {
                eating_tables: true
            },
        });
        const users = yield prisma_1.prisma.user.findMany({
            where: {
                user_has_access_to_organization: {
                    some: {
                        o_id: input.organization_id,
                    },
                },
            },
            select: {
                id: true,
                displayName: true,
                email: true,
            },
        });
        return { orders, eating_tables, users, eating_tables_groups };
    })),
});
//# sourceMappingURL=index.js.map