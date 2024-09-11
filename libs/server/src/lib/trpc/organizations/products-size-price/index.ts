import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { organizations } from '..';

export const product_size = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organization_id = input.organization_id;
      const product_sizes = await prisma.product_size.findMany({
        where: { organization_id },
        orderBy: {
          qr_o: 'asc',
        },
      });
      return { product_sizes };
    }),
  create: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
        qr_o: z.number().int().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product_size = await prisma.product_size.create({
        data: {
          organization_id: input.organization_id,
          qr_o: input.qr_o,
          name: input.name,
        },
      });
      return { product_size };
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(1).max(20),
        qr_o: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, organization_id, name, qr_o } = input;

      await prisma.product_size.update({
        where: {
          id,
          organization_id,
        },
        data: {
          name,
          qr_o,
        },
      });
      return {};
    }),
    // edit_price: publicProcedure
    // .input(
    //   z.object({
    //     id: z.string().uuid(),
    //     organization_id: z.string().uuid(),
    //     price: z.number(),
    //   })
    // )
    // .mutation(async ({ ctx, input }) => {
    //   const { id, organization_id, price } = input;

    //   await prisma.product_size_price.update({
    //     where: {
    //       id,
    //       organization_id,
    //     },
    //     data: {
    //       price,
    //     },
    //   });
    //   return {};
    // }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await prisma.product_size.delete({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
      });
      return { product };
    }),
  save_order_category: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        product_size: z.array(
          z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, product_size } = input;

      for (let _product_size of product_size) {
        const { id, qr_o } = _product_size;

        await prisma.product_size.update({
          where: {
            organization_id,
            id,
          },
          data: {
            qr_o,
          },
        });
      }
      return true;
    }),
});
