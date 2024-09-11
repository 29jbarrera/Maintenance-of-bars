"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.invoice = (0, serverTRPC_1.router)({
    get_invoices_between_dates: serverTRPC_1.publicProcedure
        .input(z.object({
        from: z.string(),
        to: z.string(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ input }) {
        const { from, to, organization_id } = input;
        const invoices = yield prisma_1.prisma.invoice.findMany({
            where: {
                organization_id,
                created_at: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
            },
        });
        return { invoices };
    })),
    get_invoice_by_id: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ input }) {
        const { id, organization_id } = input;
        const invoice = yield prisma_1.prisma.invoice.findUniqueOrThrow({
            where: {
                organization_id,
                id,
            },
            include: { invoice_line: true, organization_client: true },
        });
        return { invoice };
    })),
    //  PETICIÓN PARA AÑADIR CLIENTE A FACTURA REVISAR
    add_client_to_invoice: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_client_id: z.string().uuid(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ input }) {
        const { id, organization_client_id } = input;
        const update_invoice = yield prisma_1.prisma.invoice.update({
            where: { id },
            data: {
                organization_client_id: organization_client_id,
            },
            include: {
                invoice_line: true,
                organization_client: true,
            },
        });
        return { update_invoice };
    })),
});
//# sourceMappingURL=index.js.map