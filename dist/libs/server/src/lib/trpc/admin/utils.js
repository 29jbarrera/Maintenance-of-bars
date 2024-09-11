"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_users_admin_ids = exports.is_admin_user = void 0;
const tslib_1 = require("tslib");
const prisma_1 = require("@komandero/prisma");
const USERS_ADMIN = ['damian@kissandcode.com'];
function is_admin_user(user_id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return true;
        //   TODO: Implementar
        //   const user = await prisma.user.findFirst({
        //     where: { email: { in: USERS_ADMIN }, id: user_id },
        //   });
        //   if (user) {
        //     return true;
        //   }
        //   return false;
    });
}
exports.is_admin_user = is_admin_user;
function get_users_admin_ids() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield prisma_1.prisma.user.findMany({
            where: { email: { in: USERS_ADMIN } },
        });
        return users.map((user) => user.id);
    });
}
exports.get_users_admin_ids = get_users_admin_ids;
//# sourceMappingURL=utils.js.map