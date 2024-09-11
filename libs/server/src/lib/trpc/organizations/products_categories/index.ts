import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const products_categories = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organization_id = input.organization_id;
      const product_sizes = await prisma.product_category.findMany({
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product_category = await prisma.product_category.create({
        data: {
          organization_id: input.organization_id,
          name: input.name,
        },
      });
      return { product_category };
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.product_category.update({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
        data: {
          name: input.name,
        },
      });
      return {};
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await prisma.product_category.delete({
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
        categories: z.array(
          z.object({
            id: z.string().uuid(),
            priority_u: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, categories } = input;

      for (let _category of categories) {
        const { id, priority_u } = _category;

        await prisma.product_category.update({
          where: {
            organization_id,
            id,
          },
          data: {
            priority_u,
          },
        });
      }

      return true;
    }),
});
