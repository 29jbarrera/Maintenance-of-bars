"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const admin_1 = require("./admin");
const organizations_1 = require("./organizations");
tslib_1.__exportStar(require("./utils"), exports);
exports.appRouter = (0, serverTRPC_1.router)({
    version: serverTRPC_1.publicProcedure.query(({ ctx }) => {
        return '1.0.0';
    }),
    admin: admin_1.admin,
    organizations: organizations_1.organizations
});
//# sourceMappingURL=index.js.map