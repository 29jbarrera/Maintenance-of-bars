"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.products = (0, serverTRPC_1.router)({
    get_product_by_id: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const { organization_id, id } = input;
        const product = yield prisma_1.prisma.product.findUniqueOrThrow({
            where: {
                organization_id,
                id,
            },
            include: {
                product_size_price: {
                    include: {
                        product_size: true,
                    },
                },
                ingredient_product: {
                    include: {
                        ingredient: true,
                    },
                    orderBy: {
                        ingredient: {
                            name: 'asc',
                        },
                    },
                },
                product_modification: {
                    include: {
                        app_product_modification: true,
                    },
                    orderBy: {
                        app_product_modification: {
                            name: 'asc',
                        },
                    },
                },
            },
        });
        const categories = yield prisma_1.prisma.product_category.findMany({
            where: {
                organization_id,
            },
            orderBy: {
                priority_u: 'asc',
            },
        });
        const _product = Object.assign(Object.assign({}, product), { product_modification: product.product_modification.map((m) => {
                var _a;
                return Object.assign(Object.assign({}, m), { apm: m.apm.toString(), app_product_modification: Object.assign(Object.assign({}, m.app_product_modification), { id: m.app_product_modification.id.toString(), apmg: (_a = m.app_product_modification.apmg) === null || _a === void 0 ? void 0 : _a.toString() }) });
            }) });
        return {
            _product,
            categories,
            product_size_price: product.product_size_price,
        };
    })),
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const _products = yield prisma_1.prisma.product.findMany({
            where: { organization_id },
            // select: {
            //   id: true,
            //   name: true,
            //   name_i: true,
            //   priority: true,
            //   priority_ko: true,
            //   priority_u: true,
            //   product_category_id: true,
            //   price_pick_up: true,
            //   price_delivery: true,
            //   price_take_away: true,
            // },
            include: {
                product_size_price: {
                    include: {
                        product_size: true,
                    },
                },
                product_modification: {
                    include: {
                        app_product_modification: true,
                    },
                },
                ingredient_product: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        const categories = yield prisma_1.prisma.product_category.findMany({
            where: {
                organization_id,
            },
            orderBy: {
                priority_u: 'asc',
            },
        });
        const products = _products.map((product) => {
            return Object.assign(Object.assign({}, product), { product_modification: product.product_modification.map((pm) => {
                    return Object.assign(Object.assign({}, pm), { apm: (pm.apm || '').toString(), app_product_modification: Object.assign(Object.assign({}, pm.app_product_modification), { id: pm.app_product_modification.id.toString(), apmg: (pm.app_product_modification.apmg || '').toString() }) });
                }) });
        });
        return { products, categories };
    })),
    get_all_to_reorder: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        products_ids: z.array(z.string().uuid()),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const products = yield prisma_1.prisma.product.findMany({
            where: {
                organization_id,
                id: {
                    in: input.products_ids,
                },
            },
            select: {
                id: true,
                name: true,
                priority: true,
                priority_ko: true,
                priority_u: true,
            },
        });
        return products;
    })),
    delete: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const product_deleted = yield prisma_1.prisma.product.delete({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
        });
        return { product_deleted };
    })),
    saver_order_waiter: serverTRPC_1.publicProcedure
        .input(z.object({
        products_to_save: z.array(z.object({
            id: z.string().uuid(),
            priority_u: z.number(),
        })),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const products = input.products_to_save;
        let i = -1;
        for (const product of products) {
            const priority = products.slice(i)[0].priority_u;
            i--;
            yield prisma_1.prisma.product.update({
                where: { id: product.id },
                data: { priority, priority_u: priority, priority_ko: priority },
            });
        }
        return { products };
    })),
    create_product: serverTRPC_1.publicProcedure
        .input(z.object({
        name: z.string(),
        name_i: z.string(),
        price_take_away: z.number(),
        price_delivery: z.number(),
        price_pick_up: z.number(),
        organization_id: z.string().uuid(),
        product_category_id: z.string().uuid(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const { name, name_i, price_take_away, price_delivery, price_pick_up, organization_id, product_category_id, } = input;
        const product_created = yield prisma_1.prisma.product.create({
            data: {
                name,
                name_i,
                price_take_away,
                price_delivery,
                price_pick_up,
                organization_id,
                product_category_id,
            },
        });
        return product_created;
    })),
    edit_product: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string(),
        name: z.string(),
        name_i: z.string(),
        price_take_away: z.number(),
        price_delivery: z.number(),
        price_pick_up: z.number(),
        organization_id: z.string().uuid(),
        product_category_id: z.string().uuid(),
    }))
        .mutation((_g) => tslib_1.__awaiter(void 0, [_g], void 0, function* ({ ctx, input }) {
        const updated_product = yield prisma_1.prisma.product.update({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
            data: {
                name: input.name,
                name_i: input.name_i,
                price_take_away: input.price_take_away,
                price_delivery: input.price_delivery,
                price_pick_up: input.price_pick_up,
                organization_id: input.organization_id,
                product_category_id: input.product_category_id,
            },
        });
        return updated_product;
    })),
    get_by_id: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_h) => tslib_1.__awaiter(void 0, [_h], void 0, function* ({ ctx, input }) {
        const product = yield prisma_1.prisma.product.findFirst({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
            include: {
                product_size_price: {
                    include: {
                        product_size: true,
                    },
                },
                product_modification: {
                    include: {
                        app_product_modification: true,
                    },
                },
                ingredient_product: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return product;
    })),
    get_products_with_ingredients: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_j) => tslib_1.__awaiter(void 0, [_j], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const products = yield prisma_1.prisma.product.findMany({
            where: { organization_id },
            orderBy: { name: 'desc' },
            include: {
                ingredient_product: {
                    orderBy: {
                        ingredient: {
                            name: 'asc',
                        },
                    },
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return products;
    })),
    update_ingredient_product_active_or_desactive: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        ingredient_id: z.string().uuid(),
        product_id: z.string().uuid(),
        active: z.boolean(),
    }))
        .mutation((_k) => tslib_1.__awaiter(void 0, [_k], void 0, function* ({ ctx, input }) {
        const { organization_id, ingredient_id, product_id, active } = input;
        const update = yield prisma_1.prisma.ingredient_product.update({
            data: {
                default: !active,
            },
            where: {
                ingredient_id_product_id: {
                    ingredient_id,
                    product_id,
                },
            },
        });
        return update;
    })),
    add_ingredient_to_product: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        ingredients_ids: z.array(z.string()),
        product_id: z.string().uuid(),
    }))
        .mutation((_l) => tslib_1.__awaiter(void 0, [_l], void 0, function* ({ ctx, input }) {
        const { organization_id, ingredients_ids, product_id } = input;
        let created_ingredients_to_product = [];
        for (const ingredient_id of ingredients_ids) {
            const created = yield prisma_1.prisma.ingredient_product.create({
                data: {
                    ingredient_id,
                    organization_id,
                    product_id,
                },
                include: {
                    ingredient: true,
                },
            });
            created_ingredients_to_product.push(created);
        }
        return { created_ingredients_to_product };
    })),
    remove_ingredient_to_product: serverTRPC_1.publicProcedure
        .input(z.object({
        ingredient_id: z.string().uuid(),
        product_id: z.string().uuid(),
    }))
        .mutation((_m) => tslib_1.__awaiter(void 0, [_m], void 0, function* ({ ctx, input }) {
        const { ingredient_id, product_id } = input;
        yield prisma_1.prisma.ingredient_product.delete({
            where: {
                ingredient_id_product_id: {
                    ingredient_id,
                    product_id,
                },
            },
        });
        return true;
    })),
    edit_ingredient_to_product: serverTRPC_1.publicProcedure
        .input(z.object({
        ingredient_id: z.string().uuid(),
        product_id: z.string().uuid(),
        price: z.number(),
    }))
        .mutation((_o) => tslib_1.__awaiter(void 0, [_o], void 0, function* ({ ctx, input }) {
        const { ingredient_id, product_id, price } = input;
        const ingredient_updated = yield prisma_1.prisma.ingredient_product.update({
            where: {
                ingredient_id_product_id: {
                    ingredient_id,
                    product_id,
                },
            },
            data: {
                price,
            },
        });
        return { ingredient_updated };
    })),
    update_priority: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        products: z.array(z.object({
            id: z.string().uuid(),
            num: z.number(),
        })),
        // prior only can 'priority' | 'priority_ko' | 'priority_u';
        prior: z.string(),
    }))
        .mutation((_p) => tslib_1.__awaiter(void 0, [_p], void 0, function* ({ ctx, input }) {
        for (const product of input.products) {
            const { id, num } = product;
            const prior = input.prior;
            yield prisma_1.prisma.product.update({
                where: {
                    id,
                    organization_id: input.organization_id,
                },
                data: {
                    [prior]: num,
                },
            });
        }
        return { success: true };
    })),
    edit_product_size_price: serverTRPC_1.publicProcedure
        .input(z.object({
        product_size_id: z.string().uuid(),
        product_id: z.string().uuid(),
        price: z.number(),
    }))
        .mutation((_q) => tslib_1.__awaiter(void 0, [_q], void 0, function* ({ ctx, input }) {
        const { product_size_id, product_id, price } = input;
        const updated_product_size_price = yield prisma_1.prisma.product_size_price.update({
            where: {
                product_id_product_size_id: {
                    product_size_id,
                    product_id,
                },
            },
            data: {
                price,
            },
            include: {
                product_size: true,
            },
        });
        return { updated_product_size_price };
    })),
    delete_product_size_prices: serverTRPC_1.publicProcedure
        .input(z.object({
        product_size_id: z.string().uuid(),
        product_id: z.string().uuid(),
    }))
        .mutation((_r) => tslib_1.__awaiter(void 0, [_r], void 0, function* ({ ctx, input }) {
        const { product_size_id, product_id } = input;
        const product_size_deleted = yield prisma_1.prisma.product_size_price.delete({
            where: {
                product_id_product_size_id: {
                    product_size_id,
                    product_id,
                },
            },
        });
        return { product_size_deleted };
    })),
    add_product_size_to_product: serverTRPC_1.publicProcedure
        .input(z.object({
        product_id: z.string().uuid(),
        product_size_id: z.string().uuid(),
        price: z.number(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_s) => tslib_1.__awaiter(void 0, [_s], void 0, function* ({ ctx, input }) {
        const { product_id, product_size_id, price, organization_id } = input;
        const add_product_size_price = yield prisma_1.prisma.product_size_price.create({
            data: {
                price,
                organization_id,
                product_id,
                product_size_id,
            },
            include: {
                product_size: true,
            },
        });
        return { add_product_size_price };
    })),
    get_all_modifiers: serverTRPC_1.publicProcedure.mutation((_t) => tslib_1.__awaiter(void 0, [_t], void 0, function* ({ ctx, input }) {
        const modifiers_availables = yield prisma_1.prisma.app_product_modification_group.findMany({
            include: { app_product_modification: true },
        });
        return modifiers_availables.map((modifier) => {
            return {
                id: modifier.id.toString(),
                name: modifier.name,
                app_product_modification: modifier.app_product_modification.map((modification) => ({
                    name: modification.name,
                    id: modification.id.toString(),
                    apmg: modification.apmg.toString(),
                })),
            };
        });
    })),
    create_product_modification: serverTRPC_1.publicProcedure
        .input(z.object({
        p_id: z.string().uuid(),
        apm: z.array(z.string()),
        o: z.number(),
        pi: z.number(),
    }))
        .mutation((_u) => tslib_1.__awaiter(void 0, [_u], void 0, function* ({ ctx, input }) {
        const { p_id, apm, o, pi } = input;
        const _apm_to_bigint = apm.map((a) => BigInt(a));
        let modifiers_created = [];
        for (const _apm of _apm_to_bigint) {
            const create = yield prisma_1.prisma.product_modification.create({
                data: {
                    p_id,
                    apm: _apm,
                    o,
                    pi,
                },
                include: {
                    app_product_modification: true,
                },
            });
            modifiers_created.push(create);
        }
        return modifiers_created.map((m) => {
            var _a;
            return Object.assign(Object.assign({}, m), { apm: m.apm.toString(), app_product_modification: Object.assign(Object.assign({}, m.app_product_modification), { id: m.app_product_modification.id.toString(), apmg: (_a = m.app_product_modification.apmg) === null || _a === void 0 ? void 0 : _a.toString() }) });
        });
    })),
    edit_product_modification_by_id: serverTRPC_1.publicProcedure
        .input(z.object({
        p_id: z.string().uuid(),
        apm: z.string(),
        pi: z.number(),
        o: z.number(),
    }))
        .mutation((_v) => tslib_1.__awaiter(void 0, [_v], void 0, function* ({ ctx, input }) {
        var _w;
        const { p_id, apm, pi, o } = input;
        const _apm_bigint = BigInt(apm);
        const update = yield prisma_1.prisma.product_modification.update({
            where: {
                p_id_apm: {
                    p_id,
                    apm: _apm_bigint,
                },
            },
            data: {
                pi,
                o,
            },
            include: {
                app_product_modification: true,
            },
        });
        const updated_modification = Object.assign(Object.assign({}, update), { apm: update.apm.toString(), app_product_modification: Object.assign(Object.assign({}, update.app_product_modification), { id: update.app_product_modification.id.toString(), apmg: (_w = update.app_product_modification.apmg) === null || _w === void 0 ? void 0 : _w.toString() }) });
        return { updated_modification };
    })),
    remove_product_modification: serverTRPC_1.publicProcedure
        .input(z.object({
        p_id: z.string().uuid(),
        apm: z.number(),
    }))
        .mutation((_x) => tslib_1.__awaiter(void 0, [_x], void 0, function* ({ ctx, input }) {
        const { p_id, apm } = input;
        const _apm = BigInt(apm);
        const removed_product_modification = yield prisma_1.prisma.product_modification.delete({
            where: {
                p_id_apm: {
                    p_id,
                    apm: _apm,
                },
            },
        });
        return true;
    })),
    edit_order_and_visualization: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        product_category_id: z.string().uuid(),
        priority: z.number(),
        priority_ko: z.number(),
        priority_u: z.number(),
        qr_o: z.number(),
        w_v: z.boolean(),
    }))
        .mutation((_y) => tslib_1.__awaiter(void 0, [_y], void 0, function* ({ ctx, input }) {
        const { id, organization_id, product_category_id, priority, priority_ko, priority_u, qr_o, w_v, } = input;
        const edit_order_and_visualization = yield prisma_1.prisma.product.update({
            where: {
                id,
                organization_id,
                product_category_id,
            },
            data: {
                priority,
                priority_ko,
                priority_u,
                qr_o,
                w_v,
            },
        });
        return { edit_order_and_visualization };
    })),
});
//# sourceMappingURL=index.js.map