import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const ingredients = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ingredients = await prisma.ingredient.findMany({
        where: { organization_id: input.organization_id },
        orderBy: {
          name: 'asc',
        },
      });

      return { ingredients };
    }),
  create: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ingredient_created = await prisma.ingredient.create({
        data: {
          organization_id: input.organization_id,
          name: input.name,
        },
      });

      return { ingredient_created };
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, organization_id, name } = input;

      const ingredient_updated = await prisma.ingredient.update({
        where: {
          id,
          organization_id,
        },
        data: {
          name,
        },
      });

      return { ingredient_updated };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const igredient_deleted = await prisma.ingredient.delete({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
      });

      return { igredient_deleted };
    }),
  update_ingredient_product_price: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        price: z.number(),
        products_ids: z.array(z.string()),
        ingredients_ids: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, price, products_ids, ingredients_ids } = input;

      for (const product_id of products_ids) {
        for (const ingredient_id of ingredients_ids) {
          const updated = await prisma.ingredient_product.upsert({
            create: {
              default: false,
              ingredient_id,
              organization_id,
              price,
              product_id,
            },
            update: {
              price,
            },
            where: {
              ingredient_id_product_id: {
                ingredient_id,
                product_id,
              },
            },
          });
        }
      }

      return true;
    }),
});
