"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app_configs = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
BigInt.prototype['toJson'] = function () {
    return this.toString();
};
exports.app_configs = (0, serverTRPC_1.router)({
    product_modification_group: serverTRPC_1.publicProcedure.query((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx }) {
        const app_product_modifications_groups = yield prisma_1.prisma.app_product_modification_group.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        return {
            app_product_modifications_groups: app_product_modifications_groups.map((r) => {
                return Object.assign(Object.assign({}, r), { id: r.id.toString() });
            }),
        };
    })),
    update_product_modification_group: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.number(),
        name: z.string(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const { id, name } = input;
        const _id = BigInt(id);
        const updated = yield prisma_1.prisma.app_product_modification_group.update({
            where: {
                id: _id,
            },
            data: {
                name,
            },
        });
        const updated_group = {
            id: updated.id.toString(),
            name: updated.name,
        };
        return { updated_group };
    })),
    product_modifications_of_group: serverTRPC_1.publicProcedure
        .input(z.object({
        apmg: z.number(),
    }))
        .query((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const app_product_modifications = yield prisma_1.prisma.app_product_modification.findMany({
            where: {
                apmg: BigInt(String(input.apmg)),
            },
        });
        return {
            app_product_modifications: app_product_modifications.map((r) => {
                return Object.assign(Object.assign({}, r), { id: r.id.toString(), apmg: (r.apmg || '').toString() });
            }),
        };
    })),
    check_if_exist_product_id: serverTRPC_1.publicProcedure
        .input(z.number())
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const id = input;
        const _id = BigInt(id);
        const exist = yield prisma_1.prisma.app_product_modification.findUnique({
            where: {
                id: _id,
            },
        });
        return !!exist;
    })),
    add_product_modification_to_group: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.number(),
        apmg: z.number(),
        name: z.string(),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { id, apmg, name } = input;
        const _id = BigInt(id);
        const _apmg = BigInt(apmg);
        const create = yield prisma_1.prisma.app_product_modification.create({
            data: {
                id: _id,
                apmg: _apmg,
                name,
            },
        });
        const app_product_modification = {
            id: create.id.toString(),
            apmg: (create.apmg || '').toString(),
            name: create.name,
        };
        return { app_product_modification };
    })),
    update_product_modification_in_group: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.number(),
        apmg: z.number(),
        name: z.string(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const { id, apmg, name } = input;
        const _id = BigInt(id);
        const _apmg = BigInt(apmg);
        const update = yield prisma_1.prisma.app_product_modification.update({
            where: {
                id: _id,
            },
            data: {
                apmg: _apmg,
                name,
            },
        });
        const update_product_modification = {
            id: update.id.toString(),
            apmg: (update.apmg || '').toString(),
            name: update.name,
        };
        return { update_product_modification };
    })),
    delete_product_modification_in_group: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.number(),
    }))
        .mutation((_g) => tslib_1.__awaiter(void 0, [_g], void 0, function* ({ ctx, input }) {
        const { id } = input;
        const _id = BigInt(id);
        const deleted = yield prisma_1.prisma.app_product_modification.delete({
            where: {
                id: _id,
            },
        });
        const deleted_product_modification = {
            id: deleted.id.toString(),
        };
        return { deleted_product_modification };
    })),
});
//# sourceMappingURL=index.js.map