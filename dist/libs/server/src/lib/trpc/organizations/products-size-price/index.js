"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_size = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.product_size = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const product_sizes = yield prisma_1.prisma.product_size.findMany({
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
        qr_o: z.number().int().min(0),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const product_size = yield prisma_1.prisma.product_size.create({
            data: {
                organization_id: input.organization_id,
                qr_o: input.qr_o,
                name: input.name,
            },
        });
        return { product_size };
    })),
    edit: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(1).max(20),
        qr_o: z.number(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { id, organization_id, name, qr_o } = input;
        yield prisma_1.prisma.product_size.update({
            where: {
                id,
                organization_id,
            },
            data: {
                name,
                qr_o,
            },
        });
        return {};
    })),
    // edit_price: publicProcedure
    // .input(
    //   z.object({
    //     id: z.string().uuid(),
    //     organization_id: z.string().uuid(),
    //     price: z.number(),
    //   })
    // )
    // .mutation(async ({ ctx, input }) => {
    //   const { id, organization_id, price } = input;
    //   await prisma.product_size_price.update({
    //     where: {
    //       id,
    //       organization_id,
    //     },
    //     data: {
    //       price,
    //     },
    //   });
    //   return {};
    // }),
    delete: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const product = yield prisma_1.prisma.product_size.delete({
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
        product_size: z.array(z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
        })),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { organization_id, product_size } = input;
        for (let _product_size of product_size) {
            const { id, qr_o } = _product_size;
            yield prisma_1.prisma.product_size.update({
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
});
//# sourceMappingURL=index.js.map