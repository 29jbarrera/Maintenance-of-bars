import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const orders = router({
  order_of_organization: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const orders = await prisma.orders.findMany({
        where: {
          organization_id: input.organization_id,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
      const eating_tables = await prisma.eating_tables.findMany({
        where: {
          organization_id: input.organization_id,
        },
      });

      const eating_tables_groups = await prisma.eating_table_group.findMany({
        where: {
          organization_id: input.organization_id,
        },
        include: {
          eating_tables: true
        },
      });

      const users = await prisma.user.findMany({
        where: {
          user_has_access_to_organization: {
            some: {
              o_id: input.organization_id,
            },
          },
        },
        select: {
          id: true,
          displayName: true,
          email: true,
        },
      });
      return { orders, eating_tables, users, eating_tables_groups };
    }),
});
