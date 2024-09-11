"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidokocina = void 0;
const tslib_1 = require("tslib");
const serverTRPC_1 = require("@komandero/serverTRPC");
const z = require("zod");
const prisma_1 = require("@komandero/prisma");
exports.oidokocina = (0, serverTRPC_1.router)({
    get_my_config: serverTRPC_1.publicProcedure
        .input(z.object({
        organization_id: z.string().uuid(),
    }))
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        let config = yield prisma_1.prisma.oidokocina_configuration.findFirst({
            where: {
                o_id: input.organization_id,
            },
        });
        if (!config) {
            config = yield prisma_1.prisma.oidokocina_configuration.create({
                data: {
                    o_id: input.organization_id,
                    a: 0,
                    p: '',
                    version: '1',
                    modeloImpresora: 1,
                    numconfig: 1,
                },
            });
        }
        return config;
    })),
    save_my_config: serverTRPC_1.publicProcedure
        .input(z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        a: z.number(),
        p: z.string(),
        version: z.string(),
        modeloImpresora: z.number(),
        numconfig: z.number(),
    }))
        .mutation((_b) => tslib_1.__awaiter(void 0, [_b], void 0, function* ({ ctx, input }) {
        const config = yield prisma_1.prisma.oidokocina_configuration.update({
            where: {
                id: input.id,
            },
            data: {
                a: input.a,
                p: input.p,
                version: input.version,
                modeloImpresora: input.modeloImpresora,
                numconfig: input.numconfig,
            },
        });
        return config;
    })),
    get_pedidos: serverTRPC_1.publicProcedure
        .input(z.object({
        fechaini: z.string(),
        fechafin: z.string(),
        estado: z.array(z.number()),
        formaPago: z.number(),
        formaEntrega: z.number(),
        // Origin is enum
        origen: z.string(),
        // .refine((val) => OK_ORIGIN_ARRAY.includes(val as OK_TYPE_OF_ORIGIN), {
        //   message: `El valor debe ser uno de los siguientes: ${OK_ORIGIN_ARRAY.join(
        //     ', '
        //   )}`,
        // }),
    }))
        .mutation((_c) => tslib_1.__awaiter(void 0, [_c], void 0, function* ({ ctx, input }) {
        const origen = input.origen;
        return (0, integration_1.obtener_pedidos)({
            estado: input.estado,
            fechaini: input.fechaini,
            fechafin: input.fechafin,
            formaPago: input.formaPago,
            formaEntrega: input.formaEntrega,
            origen,
        });
    })),
    get_un_pedido: serverTRPC_1.publicProcedure
        .input(z.object({
        // ID del pedido
        id: z.string(),
        organization_id: z.string().uuid(),
    }))
        .mutation((_d) => tslib_1.__awaiter(void 0, [_d], void 0, function* ({ ctx, input }) {
        return (0, integration_1.obtener_un_pedido)(input.id);
    })),
});
require("./integration");
const integration_1 = require("./integration");
//# sourceMappingURL=index.js.map