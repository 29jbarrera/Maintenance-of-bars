"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
const firebase_1 = require("../../../firebase");
exports.users = (0, serverTRPC_1.router)({
    get_users: serverTRPC_1.publicProcedure.query((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx }) {
        const users = yield prisma_1.prisma.user.findMany({
            select: {
                id: true,
                displayName: true,
                uid: true,
                email: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        return { users };
    })),
    view_user: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
    }))
        .query((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: input.id,
            },
        });
        const organizations_have_access = yield prisma_1.prisma.user_has_access_to_organization.findMany({
            where: {
                u_id: input.id,
            },
            include: {
                organization: true,
            },
        });
        return {
            user,
            organizations_have_access,
        };
    })),
    edit_display_name: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        displayName: z.string(),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const user = yield prisma_1.prisma.user.update({
            where: {
                id: input.id,
            },
            data: {
                displayName: input.displayName,
            },
        });
        return true;
    })),
    get_organizations_to_add_user: serverTRPC_1.publicProcedure.query((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx }) {
        const organizations = yield prisma_1.prisma.organization.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return { organizations };
    })),
    add_user_to_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
    }))
        .mutation((_e) => tslib_1.__awaiter(void 0, [_e], void 0, function* ({ ctx, input }) {
        const add_organization_to_user = yield prisma_1.prisma.user_has_access_to_organization.create({
            data: {
                u_id: input.u_id,
                o_id: input.o_id,
            },
            include: {
                organization: true,
            }
        });
        return { add_organization_to_user };
    })),
    remove_user_to_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
    }))
        .mutation((_f) => tslib_1.__awaiter(void 0, [_f], void 0, function* ({ ctx, input }) {
        const { u_id, o_id } = input;
        const remove_organization = yield prisma_1.prisma.user_has_access_to_organization.delete({
            where: {
                u_id_o_id: {
                    u_id,
                    o_id,
                },
            },
        });
        return true;
    })),
    toggle_user_on_organization: serverTRPC_1.publicProcedure
        .input(z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
        disabled: z.boolean(),
    }))
        .mutation((_g) => tslib_1.__awaiter(void 0, [_g], void 0, function* ({ ctx, input }) {
        const updated = yield prisma_1.prisma.user_has_access_to_organization.update({
            where: {
                u_id_o_id: {
                    o_id: input.o_id,
                    u_id: input.u_id,
                },
            },
            data: {
                disabled: input.disabled,
            },
        });
        return { success: !!updated };
    })),
    create_user: serverTRPC_1.publicProcedure
        .input(z.object({
        email: z.string().email(),
        displayName: z.string(),
        password: z.string(),
    }))
        .mutation((_h) => tslib_1.__awaiter(void 0, [_h], void 0, function* ({ ctx, input }) {
        const { email, displayName, password } = input;
        const _email = email.toLowerCase().trim();
        yield (0, firebase_1.create_user)({
            displayName,
            email: _email,
            password,
        });
        return { success: true };
    })),
});
//# sourceMappingURL=index.js.map