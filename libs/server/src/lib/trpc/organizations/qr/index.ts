import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const qr = router({
  //Categorias de productos
  get_categories_of_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id } = input;
      const categories = await prisma.product_category.findMany({
        where: { organization_id },
        orderBy: {
          qr_o: 'asc',
        },
        select: {
          id: true,
          name: true,
          qr_o: true,
          qr_v: true,
        },
      });

      return categories;
    }),
  // Cambiar orden de las categorias de productso
  change_order_categories_of_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
        qr_v: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, id, qr_v } = input;

      const update_view_category = await prisma.product_category.update({
        where: {
          organization_id,
          id,
        },
        data: {
          qr_v: !qr_v,
        },
      });

      return update_view_category;
    }),

  // Guardar orden de categorias
  save_order_category: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        categories: z.array(
          z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, categories } = input;

      for (let _category of categories) {
        const { id, qr_o } = _category;

        await prisma.product_category.update({
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

  // Ver productos dentro de una categoría
  get_products_within_category: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        product_category_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, product_category_id } = input;

      const products = await prisma.product.findMany({
        where: {
          organization_id,
          product_category_id,
        },
        select: {
          id: true,
          name: true,
          qr_o: true,
          qr_v: true,
          product_allergen: true,
        },
        orderBy: {
          qr_o: 'asc',
        },
      });

      return products;
    }),

  // Ver nombre de una categoría
  get_name_of_category: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, id } = input;

      const category = await prisma.product_category.findFirst({
        where: {
          organization_id,
          id,
        },
        select: {
          name: true,
        },
      });

      return category;
    }),

  // Cambiar orden de productos de una categoría
  change_order_of_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        id: z.string().uuid(),
        qr_v: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, id, qr_v } = input;

      const update_view_category = await prisma.product.update({
        where: {
          organization_id,
          id,
        },
        data: {
          qr_v: !qr_v,
        },
      });

      return update_view_category;
    }),
  // Guardar orden de productos de una categoría
  save_order_products: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        products: z.array(
          z.object({
            id: z.string().uuid(),
            qr_o: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, products } = input;

      for (let _product of products) {
        const { id, qr_o } = _product;

        await prisma.product.update({
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

  change_allergen: publicProcedure
    .input(
      z.object({
        product_id: z.string().uuid(),
        a_id: z.number(),
        active: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { product_id, a_id, active } = input;

      let allergen;

      if (active) {
        allergen = await prisma.product_allergen.delete({
          where: {
            product_id_a_id: {
              product_id,
              a_id,
            },
          },
        });

        return allergen;
      }

      allergen = await prisma.product_allergen.create({
        data: {
          product_id,
          a_id,
        },
      });

      return allergen;
    }),

  // Ver todos los alergenos
  getAllAllergen: publicProcedure.mutation(async ({ ctx }) => {
    const allergens = await prisma.allergen.findMany({});

    return { allergens };
  }),
});
