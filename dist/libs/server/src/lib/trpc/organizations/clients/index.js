"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.clients = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ input }) {
        const clients = yield prisma_1.prisma.organization_client.findMany({
            where: {
                organization_id: input.organization_id,
            },
        });
        return { clients };
    })),
    create: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
        nif: z.string().length(9),
        phone: z.string(),
        email: z.string().min(3).max(20).email(),
        address: z.string(),
        cp: z.string(),
        locality: z.string(),
        province: z.string(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const clients = yield prisma_1.prisma.organization_client.create({
            data: {
                organization_id: input.organization_id,
                name: input.name,
                nif: input.nif,
                phone: input.phone,
                email: input.email,
                address: input.address,
                cp: input.cp,
                locality: input.locality,
                province: input.province,
            },
        });
        return [clients];
    })),
    edit: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
        nif: z.string().length(9),
        phone: z.string(),
        email: z.string().min(3).max(20).email(),
        address: z.string(),
        cp: z.string(),
        locality: z.string(),
        province: z.string(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const { organization_id, name, nif, phone, email, address, id, cp, locality, province } = input;
        yield prisma_1.prisma.organization_client.update({
            where: {
                id,
                organization_id,
            },
            data: {
                name,
                nif,
                phone,
                email,
                address,
                cp,
                locality,
                province
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
        const cliente = yield prisma_1.prisma.organization_client.delete({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
        });
        return { cliente };
    })),
});
//# sourceMappingURL=index.js.map