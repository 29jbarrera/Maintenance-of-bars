"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products_categories = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.products_categories = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const product_sizes = yield prisma_1.prisma.product_category.findMany({
            where: { organization_id },
            orderBy: {
                qr_o: 'asc',
            },
        });
        return { product_sizes };
    })),
    create: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const product_category = yield prisma_1.prisma.product_category.create({
            data: {
                organization_id: input.organization_id,
                name: input.name,
            },
        });
        return { product_category };
    })),
    edit: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        yield prisma_1.prisma.product_category.update({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
            data: {
                name: input.name,
            },
        });
        return {};
    })),
    delete: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const product = yield prisma_1.prisma.product_category.delete({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
        });
        return { product };
    })),
    save_order_category: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        categories: z.array(z.object({
            id: z.string().uuid(),
            priority_u: z.number(),
        })),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { organization_id, categories } = input;
        for (let _category of categories) {
            const { id, priority_u } = _category;
            yield prisma_1.prisma.product_category.update({
                where: {
                    organization_id,
                    id,
                },
                data: {
                    priority_u,
                },
            });
        }
        return true;
    })),
});
//# sourceMappingURL=index.js.map