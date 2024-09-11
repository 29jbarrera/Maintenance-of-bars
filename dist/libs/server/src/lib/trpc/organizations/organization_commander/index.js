"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organization_commander = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.organization_commander = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        o_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const { o_id } = input;
        const organizations_commanders = yield prisma_1.prisma.organization_commander.findMany({
            where: {
                o_id,
            },
        });
        return organizations_commanders;
    })),
    get_categories_and_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { organization_id } = input;
        const categories_and_products = yield prisma_1.prisma.product_category.findMany({
            where: { organization_id },
            orderBy: {
                qr_o: 'asc',
            },
            include: {
                product: true,
            },
        });
        return { categories_and_products };
    })),
    update: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        form: z.object({
            name: z.string(),
            order: z.number(),
            print_available: z.boolean(),
            print_name: z.string(),
            status_selected: z.array(z.string()),
            max_time: z.number(),
            name_internals: z.boolean(),
            notifications: z.boolean(),
        }),
        product_categories_blocked: z.array(z.string()),
        product_ids_blocked: z.array(z.string()),
        product_ids_allowed: z.array(z.string()),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { form, id, product_categories_blocked, product_ids_blocked, product_ids_allowed, } = input;
        const { name, order, print_available, print_name, status_selected, max_time, name_internals, notifications, } = form;
        const organization_commander = yield prisma_1.prisma.organization_commander.findFirstOrThrow({
            where: { id },
        });
        const update = yield prisma_1.prisma.organization_commander.update({
            where: {
                id,
            },
            data: {
                name,
                order,
                print_available,
                print_name,
                conf: Object.assign(Object.assign({}, organization_commander.conf), { status_selected,
                    product_categories_blocked,
                    product_ids_blocked,
                    product_ids_allowed,
                    max_time,
                    name_internals,
                    notifications }),
            },
        });
        return update;
    })),
});
//# sourceMappingURL=index.js.map