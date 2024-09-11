"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromContext = exports.getUserIdFormContext = exports.createContext = void 0;
const tslib_1 = require("tslib");
const trpc = require("@trpc/server");
const decoke_and_verify_token_1 = require("./decoke-and-verify-token");
const prisma_1 = require("@komandero/prisma");
function createContext(_a) {
    return tslib_1.__awaiter(this, arguments, void 0, function* ({ req, res, }) {
        // Create your context based on the request object
        // Will be available as `ctx` in all your resolvers
        // This is just an example of something you might want to do in your ctx fn
        function getUserFromHeader() {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                if (req.headers.authorization) {
                    const token = (_a = req.headers.authorization.split(' ')[1]) !== null && _a !== void 0 ? _a : '';
                    return yield (0, decoke_and_verify_token_1.decoke_and_verify_token)(token);
                }
                return null;
            });
        }
        const user = yield getUserFromHeader();
        return {
            user,
        };
    });
}
exports.createContext = createContext;
function getUserIdFormContext(ctx) {
    if (!ctx || !ctx.user || !ctx.user.id) {
        throw new trpc.TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this',
        });
    }
    return ctx.user.id;
}
exports.getUserIdFormContext = getUserIdFormContext;
function getUserFromContext(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!ctx || !ctx.user || !ctx.user.id) {
            throw new trpc.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You must be logged in to do this',
            });
        }
        const user_id = ctx.user.id;
        // TODO: modificar por user y user data y lanzar errr si el usuario está eliminado.
        const user = yield prisma_1.prisma.user_data.findFirst({
            where: {
                id: user_id,
            },
        });
        if (!user) {
            throw new trpc.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You must be logged in to do this',
            });
        }
        return user;
    });
}
exports.getUserFromContext = getUserFromContext;
//# sourceMappingURL=context.js.map