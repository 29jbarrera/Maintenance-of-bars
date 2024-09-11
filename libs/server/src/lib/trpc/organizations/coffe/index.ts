import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const coffe = router({
  get_product_coffe: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { coffe_product_id } = await prisma.organization.findUniqueOrThrow({
        where: {
          id: input.organization_id,
        },
        select: {
          coffe_product_id: true,
        },
      });

      if (!coffe_product_id) {
        return { coffe_product_id };
      }

      const product = await prisma.product.findFirst({
        where: {
          id: coffe_product_id,
          organization_id: input.organization_id,
        },
        include: {
          product_modification: {
            include: {
              app_product_modification: {
                // TODO: Comprobar si realmente hace falta
                include: {
                  app_product_modification_group: true,
                },
              },
            },
          },
        },
      });

      return {
        coffe_product_id,
        product,
      };
    }),
  get_products_to_select_coffe: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await prisma.product.findMany({
        where: {
          organization_id: input.organization_id,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return { products };
    }),
  set_product_coffe: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        product_id: z.string().uuid().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Set to null
      if (!input.product_id) {
        await prisma.organization.update({
          where: {
            id: input.organization_id,
          },
          data: {
            coffe_product_id: null,
          },
        });

        return true;
      }

      // Check if product exists
      // Search if exist product
      const product = await prisma.product.findUnique({
        where: {
          id: input.product_id,
          organization_id: input.organization_id,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Product not found',
        });
      }

      await prisma.organization.update({
        where: {
          id: input.organization_id,
        },
        data: {
          coffe_product_id: input.product_id,
        },
      });

      return true;
    }),
});
