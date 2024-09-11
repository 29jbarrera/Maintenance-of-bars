import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const share = router({
  select_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const categories = await prisma.product_category.findMany({
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
    }),
});
