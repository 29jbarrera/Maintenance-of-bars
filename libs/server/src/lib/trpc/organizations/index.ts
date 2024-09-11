import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { products } from './products';
import { product_size } from './products-size-price';
import { printer_job } from './printer-job';
import { access } from './access';
import { products_categories } from './products_categories';
import { oidokocina } from './oidokocina';
import { LetterHead } from '@komandero/commons';
import { orders } from './orders';
import { qr } from './qr';
import { organization_commander } from './organization_commander';
import { ingredients } from './ingredients';
import { share } from './share';
import { clients } from './clients';
import { product_category } from './product-category';
import { invoice } from './invoice';

export const organizations = router({
  create_organization: publicProcedure
    .input(
      z.object({
        name: z.string(),
        billing_identifier: z.string(),
        billing_name: z.string(),
        billing_address: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organization = await prisma.organization.create({
        data: {
          name: input.name,
          billing_identifier: input.billing_identifier,
          billing_name: input.billing_name,
          billing_address: input.billing_address,
        },
      });
      return { organization };
    }),
  get_all: publicProcedure.query(async ({ ctx }) => {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return { organizations };
  }),
  view_organization: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const organization = await prisma.organization.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          billing_identifier: true,
          billing_name: true,
          billing_address: true,
        },
      });

      const users_have_access =
        await prisma.user_has_access_to_organization.findMany({
          where: {
            o_id: input.id,
          },
          include: {
            user: true,
          },
        });

      return {
        organization,
        users_have_access,
      };
    }),
  get_organization_name: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const organization = await prisma.organization.findUnique({
        where: {
          id: input.id,
        },
        select: {
          name: true,
        },
      });

      return organization;
    }),
  get_letterhead: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { letterhead } = await prisma.organization.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        select: {
          letterhead: true,
        },
      });
      return { letterhead: letterhead as LetterHead[] };
    }),
  update_letterhead: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        letterhead: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organization = await prisma.organization.update({
        where: {
          id: input.id,
        },
        data: {
          letterhead: input.letterhead,
        },
      });
      return { organization };
    }),
  access,
  clients,
  ingredients,
  invoice,
  products,
  product_size,
  products_categories,
  product_category,
  printer_job,
  oidokocina,
  orders,
  qr,
  organization_commander,
  share,
});
