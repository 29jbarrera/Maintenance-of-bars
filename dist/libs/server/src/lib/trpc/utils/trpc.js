"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.router = exports.t = void 0;
const server_1 = require("@trpc/server");
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
exports.t = server_1.initTRPC.context().create({
    errorFormatter(opts) {
        const { shape, error } = opts;
        const { code, message } = error;
        return Object.assign(Object.assign({}, shape), { data: {
                code,
                message,
            } });
    },
});
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = exports.t.router;
exports.publicProcedure = exports.t.procedure;
//# sourceMappingURL=trpc.js.map