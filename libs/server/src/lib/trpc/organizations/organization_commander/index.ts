import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const organization_commander = router({
  get_all: publicProcedure
    .input(
      z.object({
        o_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { o_id } = input;

      const organizations_commanders =
        await prisma.organization_commander.findMany({
          where: {
            o_id,
          },
        });

      return organizations_commanders;
    }),
  get_categories_and_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id } = input;

      const categories_and_products = await prisma.product_category.findMany({
        where: { organization_id },
        orderBy: {
          qr_o: 'asc',
        },
        include: {
          product: true,
        },
      });

      return { categories_and_products };
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        form: z.object({
          name: z.string(),
          order: z.number(),
          print_available: z.boolean(),
          print_name: z.string(),
          status_selected: z.array(z.string()),
          max_time: z.number(),
          name_internals: z.boolean(),
          notifications: z.boolean(),
        }),
        product_categories_blocked: z.array(z.string()),
        product_ids_blocked: z.array(z.string()),
        product_ids_allowed: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        form,
        id,
        product_categories_blocked,
        product_ids_blocked,
        product_ids_allowed,
      } = input;

      const {
        name,
        order,
        print_available,
        print_name,
        status_selected,
        max_time,
        name_internals,
        notifications,
      } = form;

      const organization_commander =
        await prisma.organization_commander.findFirstOrThrow({
          where: { id },
        });

      const update = await prisma.organization_commander.update({
        where: {
          id,
        },
        data: {
          name,
          order,
          print_available,
          print_name,
          conf: {
            ...(organization_commander.conf as any),
            status_selected,
            product_categories_blocked,
            product_ids_blocked,
            product_ids_allowed,
            max_time,
            name_internals,
            notifications
          },
        },
      });

      return update;
    }),
});
