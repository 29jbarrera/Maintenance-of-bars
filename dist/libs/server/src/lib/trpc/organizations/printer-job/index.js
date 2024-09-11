"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printer_job = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.printer_job = (0, serverTRPC_1.router)({
    get_all: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const organization_id = input.organization_id;
        const printer_jobs = yield prisma_1.prisma.printer_job.findMany({
            where: { organization_id },
        });
        return { printer_jobs };
    })),
    reprint: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const printer_job = yield prisma_1.prisma.printer_job.update({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
            data: {
                done: false,
            },
        });
        return { printer_job };
    })),
    delete: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const printer_job = yield prisma_1.prisma.printer_job.delete({
            where: {
                id: input.id,
                organization_id: input.organization_id,
            },
        });
        return { printer_job };
    })),
});
//# sourceMappingURL=index.js.map