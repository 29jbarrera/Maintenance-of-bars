import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const oidokocina = router({
  get_my_config: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let config = await prisma.oidokocina_configuration.findFirst({
        where: {
          o_id: input.organization_id,
        },
      });

      if (!config) {
        config = await prisma.oidokocina_configuration.create({
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
    }),
  save_my_config: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        a: z.number(),
        p: z.string(),
        version: z.string(),
        modeloImpresora: z.number(),
        numconfig: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const config = await prisma.oidokocina_configuration.update({
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
    }),
  get_pedidos: publicProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const origen = input.origen as OK_TYPE_OF_ORIGIN;
      return obtener_pedidos({
        estado: input.estado,
        fechaini: input.fechaini,
        fechafin: input.fechafin,
        formaPago: input.formaPago,
        formaEntrega: input.formaEntrega,
        origen,
      });
    }),
  get_un_pedido: publicProcedure
    .input(
      z.object({
        // ID del pedido
        id: z.string(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return obtener_un_pedido(input.id);
    }),
});
import './integration';
import { obtener_pedidos, obtener_un_pedido } from './integration';
import { OK_ORIGIN_ARRAY, OK_TYPE_OF_ORIGIN } from '@komandero/commons';
