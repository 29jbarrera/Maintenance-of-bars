"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const serverTRPC_1 = require("@komandero/serverTRPC");
const users_1 = require("./users");
const organizations_1 = require("./organizations");
const app_configs_1 = require("./app-configs");
exports.admin = (0, serverTRPC_1.router)({
    users: users_1.users,
    organizations: organizations_1.organizations,
    app_configs: app_configs_1.app_configs
});
//# sourceMappingURL=index.js.map