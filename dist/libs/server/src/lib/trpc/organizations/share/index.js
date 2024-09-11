"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.share = (0, serverTRPC_1.router)({
    select_products: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ input }) {
        const categories = yield prisma_1.prisma.product_category.findMany({
            where: {
                organization_id: input.organization_id,
            },
            include: {
                product: true,
            },
        });
        return {
            categories,
        };
    })),
});
//# sourceMappingURL=index.js.map