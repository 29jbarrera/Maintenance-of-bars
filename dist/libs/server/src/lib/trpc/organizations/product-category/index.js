"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_category = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.product_category = (0, serverTRPC_1.router)({
    get_by_id: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const category = yield prisma_1.prisma.product_category.findUniqueOrThrow({
            where: {
                id: input.id,
            },
            include: {
                product: true,
                product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category: {
                    include: {
                        product_category_product_category_has_other_product_category_pc_idToproduct_category: true,
                    },
                },
                product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category: {
                    include: {
                        product_category_product_category_has_other_product_category_idToproduct_category: true,
                    },
                },
            },
        });
        return { category };
    })),
    add_categories_that_modify: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        categories_ids: z.array(z.string().uuid()),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { id, categories_ids } = input;
        let add_categories_that_modify = [];
        for (const pc_id of categories_ids) {
            const add = yield prisma_1.prisma.product_category_has_other_product_category.create({
                data: {
                    pc_id,
                    id,
                },
            });
            add_categories_that_modify.push(add);
        }
        return { add_categories_that_modify };
    })),
    delete_categories_that_modify: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        category_id: z.string().uuid(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { id, category_id } = input;
        const removed_categories_that_modify = yield prisma_1.prisma.product_category_has_other_product_category.delete({
            where: {
                id_pc_id: {
                    id,
                    pc_id: category_id,
                },
            },
        });
        return { removed_categories_that_modify };
    })),
    edit_category_that_modify: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        category_id: z.string().uuid(),
        o: z.number(),
        pi: z.number(),
        not_add_princing: z.boolean(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const { id, category_id } = input, dataToUpdate = tslib_1.__rest(input, ["id", "category_id"]);
        const update_category = yield prisma_1.prisma.product_category_has_other_product_category.update({
            where: {
                id_pc_id: {
                    id: id,
                    pc_id: category_id,
                },
            },
            data: dataToUpdate,
        });
        return { update_category };
    })),
    add_categories_that_use: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        categories_ids: z.array(z.string().uuid()),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { id, categories_ids } = input;
        let add_categories_that_use = [];
        for (const pc_id of categories_ids) {
            const add = yield prisma_1.prisma.product_category_has_other_product_category.create({
                data: {
                    pc_id: id,
                    id: pc_id,
                },
            });
            add_categories_that_use.push(add);
        }
        return { add_categories_that_use };
    })),
    delete_categories_that_use: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        category_id: z.string().uuid(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const { id, category_id } = input;
        const delete_categories_that_use = yield prisma_1.prisma.product_category_has_other_product_category.delete({
            where: {
                id_pc_id: {
                    id: category_id,
                    pc_id: id,
                },
            },
        });
        return { delete_categories_that_use };
    })),
    edit_category_that_use: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        category_id: z.string().uuid(),
        o: z.number(),
        pi: z.number(),
        not_add_princing: z.boolean(),
    }))
        .mutation((_g) => tslib_1.__awaiter(void 0, [_g], void 0, function* ({ ctx, input }) {
        const { id, category_id } = input, dataToUpdate = tslib_1.__rest(input, ["id", "category_id"]);
        const update_category = yield prisma_1.prisma.product_category_has_other_product_category.update({
            where: {
                id_pc_id: {
                    id: category_id,
                    pc_id: id,
                },
            },
            data: dataToUpdate,
        });
        return { update_category };
    })),
});
//# sourceMappingURL=index.js.map