"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizations = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
const products_1 = require("./products");
const products_size_price_1 = require("./products-size-price");
const printer_job_1 = require("./printer-job");
const access_1 = require("./access");
const products_categories_1 = require("./products_categories");
const oidokocina_1 = require("./oidokocina");
const orders_1 = require("./orders");
const qr_1 = require("./qr");
const organization_commander_1 = require("./organization_commander");
const ingredients_1 = require("./ingredients");
const share_1 = require("./share");
const clients_1 = require("./clients");
const product_category_1 = require("./product-category");
const invoice_1 = require("./invoice");
exports.organizations = (0, serverTRPC_1.router)({
    create_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        name: z.string(),
        billing_identifier: z.string(),
        billing_name: z.string(),
        billing_address: z.string(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        const organization = yield prisma_1.prisma.organization.create({
            data: {
                name: input.name,
                billing_identifier: input.billing_identifier,
                billing_name: input.billing_name,
                billing_address: input.billing_address,
            },
        });
        return { organization };
    })),
    get_all: serverTRPC_1.publicProcedure.query((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx }) {
        const organizations = yield prisma_1.prisma.organization.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return { organizations };
    })),
    view_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
    }))
        .query((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const organization = yield prisma_1.prisma.organization.findUnique({
            where: {
                id: input.id,
            },
            select: {
                id: true,
                name: true,
                billing_identifier: true,
                billing_name: true,
                billing_address: true,
            },
        });
        const users_have_access = yield prisma_1.prisma.user_has_access_to_organization.findMany({
            where: {
                o_id: input.id,
            },
            include: {
                user: true,
            },
        });
        return {
            organization,
            users_have_access,
        };
    })),
    get_organization_name: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
    }))
        .query((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        const organization = yield prisma_1.prisma.organization.findUnique({
            where: {
                id: input.id,
            },
            select: {
                name: true,
            },
        });
        return organization;
    })),
    get_letterhead: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const { letterhead } = yield prisma_1.prisma.organization.findUniqueOrThrow({
            where: {
                id: input.id,
            },
            select: {
                letterhead: true,
            },
        });
        return { letterhead: letterhead };
    })),
    update_letterhead: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        letterhead: z.any(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const organization = yield prisma_1.prisma.organization.update({
            where: {
                id: input.id,
            },
            data: {
                letterhead: input.letterhead,
            },
        });
        return { organization };
    })),
    access: access_1.access,
    clients: clients_1.clients,
    ingredients: ingredients_1.ingredients,
    invoice: invoice_1.invoice,
    products: products_1.products,
    product_size: products_size_price_1.product_size,
    products_categories: products_categories_1.products_categories,
    product_category: product_category_1.product_category,
    printer_job: printer_job_1.printer_job,
    oidokocina: oidokocina_1.oidokocina,
    orders: orders_1.orders,
    qr: qr_1.qr,
    organization_commander: organization_commander_1.organization_commander,
    share: share_1.share,
});
//# sourceMappingURL=index.js.map