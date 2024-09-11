"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coffe = void 0;
const tslib_1 = require("tslib");
const server_1 = require("@trpc/server");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.coffe = (0, serverTRPC_1.router)({
    get_product_coffe: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const { coffe_product_id } = yield prisma_1.prisma.organization.findUniqueOrThrow({
            where: {
                id: input.organization_id,
            },
            select: {
                coffe_product_id: true,
            },
        });
        if (!coffe_product_id) {
            return { coffe_product_id };
        }
        const product = yield prisma_1.prisma.product.findFirst({
            where: {
                id: coffe_product_id,
                organization_id: input.organization_id,
            },
            include: {
                product_modification: {
                    include: {
                        app_product_modification: {
                            // TODO: Comprobar si realmente hace falta
                            include: {
                                app_product_modification_group: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            coffe_product_id,
            product,
        };
    })),
    get_products_to_select_coffe: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const products = yield prisma_1.prisma.product.findMany({
            where: {
                organization_id: input.organization_id,
            },
            select: {
                id: true,
                name: true,
            },
        });
        return { products };
    })),
    set_product_coffe: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        product_id: z.string().uuid().nullable(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        // Set to null
        if (!input.product_id) {
            yield prisma_1.prisma.organization.update({
                where: {
                    id: input.organization_id,
                },
                data: {
                    coffe_product_id: null,
                },
            });
            return true;
        }
        // Check if product exists
        // Search if exist product
        const product = yield prisma_1.prisma.product.findUnique({
            where: {
                id: input.product_id,
                organization_id: input.organization_id,
            },
        });
        if (!product) {
            throw new server_1.TRPCError({
                code: 'CONFLICT',
                message: 'Product not found',
            });
        }
        yield prisma_1.prisma.organization.update({
            where: {
                id: input.organization_id,
            },
            data: {
                coffe_product_id: input.product_id,
            },
        });
        return true;
    })),
});
//# sourceMappingURL=index.js.map