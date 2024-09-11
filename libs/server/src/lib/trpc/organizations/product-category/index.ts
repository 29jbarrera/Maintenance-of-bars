import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const product_category = router({
  get_by_id: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await prisma.product_category.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          product: true,
          product_category_has_other_product_category_product_category_has_other_product_category_idToproduct_category:
            {
              include: {
                product_category_product_category_has_other_product_category_pc_idToproduct_category:
                  true,
              },
            },
          product_category_has_other_product_category_product_category_has_other_product_category_pc_idToproduct_category:
            {
              include: {
                product_category_product_category_has_other_product_category_idToproduct_category:
                  true,
              },
            },
        },
      });
      return { category };
    }),

  add_categories_that_modify: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        categories_ids: z.array(z.string().uuid()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categories_ids } = input;

      let add_categories_that_modify = [];

      for (const pc_id of categories_ids) {
        const add =
          await prisma.product_category_has_other_product_category.create({
            data: {
              pc_id,
              id,
            },
          });

        add_categories_that_modify.push(add);
      }

      return { add_categories_that_modify };
    }),

  delete_categories_that_modify: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        category_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, category_id } = input;

      const removed_categories_that_modify =
        await prisma.product_category_has_other_product_category.delete({
          where: {
            id_pc_id: {
              id,
              pc_id: category_id,
            },
          },
        });

      return { removed_categories_that_modify };
    }),

  edit_category_that_modify: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        category_id: z.string().uuid(),
        o: z.number(),
        pi: z.number(),
        not_add_princing: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, category_id, ...dataToUpdate } = input;

      const update_category =
        await prisma.product_category_has_other_product_category.update({
          where: {
            id_pc_id: {
              id: id,
              pc_id: category_id,
            },
          },
          data: dataToUpdate,
        });
      return { update_category };
    }),

  add_categories_that_use: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        categories_ids: z.array(z.string().uuid()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categories_ids } = input;

      let add_categories_that_use = [];

      for (const pc_id of categories_ids) {
        const add =
          await prisma.product_category_has_other_product_category.create({
            data: {
              pc_id: id,
              id: pc_id,
            },
          });

        add_categories_that_use.push(add);
      }

      return { add_categories_that_use };
    }),

  delete_categories_that_use: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        category_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, category_id } = input;

      const delete_categories_that_use =
        await prisma.product_category_has_other_product_category.delete({
          where: {
            id_pc_id: {
              id: category_id,
              pc_id: id,
            },
          },
        });

      return { delete_categories_that_use };
    }),

  edit_category_that_use: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        category_id: z.string().uuid(),
        o: z.number(),
        pi: z.number(),
        not_add_princing: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, category_id, ...dataToUpdate } = input;

      const update_category =
        await prisma.product_category_has_other_product_category.update({
          where: {
            id_pc_id: {
              id: category_id,
              pc_id: id,
            },
          },
          data: dataToUpdate,
        });
      return { update_category };
    }),
});
