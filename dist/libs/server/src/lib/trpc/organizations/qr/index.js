"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qr = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.qr = (0, serverTRPC_1.router)({
    //Categorias de productos
    get_categories_of_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const { organization_id } = input;
        const categories = yield prisma_1.prisma.product_category.findMany({
            where: { organization_id },
            orderBy: {
                qr_o: 'asc',
            },
            select: {
                id: true,
                name: true,
                qr_o: true,
                qr_v: true,
            },
        });
        return categories;
    })),
    // Cambiar orden de las categorias de productso
    change_order_categories_of_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
        qr_v: z.boolean(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { organization_id, id, qr_v } = input;
        const update_view_category = yield prisma_1.prisma.product_category.update({
            where: {
                organization_id,
                id,
            },
            data: {
                qr_v: !qr_v,
            },
        });
        return update_view_category;
    })),
    // Guardar orden de categorias
    save_order_category: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        categories: z.array(z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
        })),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { organization_id, categories } = input;
        for (let _category of categories) {
            const { id, qr_o } = _category;
            yield prisma_1.prisma.product_category.update({
                where: {
                    organization_id,
                    id,
                },
                data: {
                    qr_o,
                },
            });
        }
        return true;
    })),
    // Ver productos dentro de una categoría
    get_products_within_category: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        product_category_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const { organization_id, product_category_id } = input;
        const products = yield prisma_1.prisma.product.findMany({
            where: {
                organization_id,
                product_category_id,
            },
            select: {
                id: true,
                name: true,
                qr_o: true,
                qr_v: true,
                product_allergen: true,
            },
            orderBy: {
                qr_o: 'asc',
            },
        });
        return products;
    })),
    // Ver nombre de una categoría
    get_name_of_category: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { organization_id, id } = input;
        const category = yield prisma_1.prisma.product_category.findFirst({
            where: {
                organization_id,
                id,
            },
            select: {
                name: true,
            },
        });
        return category;
    })),
    // Cambiar orden de productos de una categoría
    change_order_of_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
        qr_v: z.boolean(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const { organization_id, id, qr_v } = input;
        const update_view_category = yield prisma_1.prisma.product.update({
            where: {
                organization_id,
                id,
            },
            data: {
                qr_v: !qr_v,
            },
        });
        return update_view_category;
    })),
    // Guardar orden de productos de una categoría
    save_order_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        products: z.array(z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
        })),
    }))
        .mutation((_g) => tslib_1.__awaiter(void 0, [_g], void 0, function* ({ ctx, input }) {
        const { organization_id, products } = input;
        for (let _product of products) {
            const { id, qr_o } = _product;
            yield prisma_1.prisma.product.update({
                where: {
                    organization_id,
                    id,
                },
                data: {
                    qr_o,
                },
            });
        }
        return true;
    })),
    change_allergen: serverTRPC_1.publicProcedure
        .input(z.object({
        product_id: z.string().uuid(),
        a_id: z.number(),
        active: z.boolean(),
    }))
        .mutation((_h) => tslib_1.__awaiter(void 0, [_h], void 0, function* ({ ctx, input }) {
        const { product_id, a_id, active } = input;
        let allergen;
        if (active) {
            allergen = yield prisma_1.prisma.product_allergen.delete({
                where: {
                    product_id_a_id: {
                        product_id,
                        a_id,
                    },
                },
            });
            return allergen;
        }
        allergen = yield prisma_1.prisma.product_allergen.create({
            data: {
                product_id,
                a_id,
            },
        });
        return allergen;
    })),
    // Ver todos los alergenos
    getAllAllergen: serverTRPC_1.publicProcedure.mutation((_j) => tslib_1.__awaiter(void 0, [_j], void 0, function* ({ ctx }) {
        const allergens = yield prisma_1.prisma.allergen.findMany({});
        return { allergens };
    })),
});
//# sourceMappingURL=index.js.map