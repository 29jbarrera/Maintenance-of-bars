"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredients = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.ingredients = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const ingredients = yield prisma_1.prisma.ingredient.findMany({
            where: { organization_id: input.organization_id },
            orderBy: {
                name: 'asc',
            },
        });
        return { ingredients };
    })),
    create: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        name: z.string(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const ingredient_created = yield prisma_1.prisma.ingredient.create({
            data: {
                organization_id: input.organization_id,
                name: input.name,
            },
        });
        return { ingredient_created };
    })),
    update: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { id, organization_id, name } = input;
        const ingredient_updated = yield prisma_1.prisma.ingredient.update({
            where: {
                id,
                organization_id,
            },
            data: {
                name,
            },
        });
        return { ingredient_updated };
    })),
    delete: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const igredient_deleted = yield prisma_1.prisma.ingredient.delete({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
        });
        return { igredient_deleted };
    })),
    update_ingredient_product_price: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        price: z.number(),
        products_ids: z.array(z.string()),
        ingredients_ids: z.array(z.string()),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { organization_id, price, products_ids, ingredients_ids } = input;
        for (const product_id of products_ids) {
            for (const ingredient_id of ingredients_ids) {
                const updated = yield prisma_1.prisma.ingredient_product.upsert({
                    create: {
                        default: false,
                        ingredient_id,
                        organization_id,
                        price,
                        product_id,
                    },
                    update: {
                        price,
                    },
                    where: {
                        ingredient_id_product_id: {
                            ingredient_id,
                            product_id,
                        },
                    },
                });
            }
        }
        return true;
    })),
});
//# sourceMappingURL=index.js.map