import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { organizations } from '..';

export const clients = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const clients = await prisma.organization_client.findMany({
        where: {
          organization_id: input.organization_id,
        },
      });
      return { clients };
    }),
  create: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
        nif: z.string().length(9),
        phone: z.string(),
        email: z.string().min(3).max(20).email(),
        address: z.string(),
        cp: z.string(),
        locality: z.string(),
        province: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const clients = await prisma.organization_client.create({
        data: {
          organization_id: input.organization_id,
          name: input.name,
          nif: input.nif,
          phone: input.phone,
          email: input.email,
          address: input.address,
          cp: input.cp,
          locality: input.locality,
          province: input.province,
        },
      });
      return [clients];
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
        name: z.string().min(3).max(20),
        nif: z.string().length(9),
        phone: z.string(),
        email: z.string().min(3).max(20).email(),
        address: z.string(),
        cp: z.string(),
        locality: z.string(),
        province: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organization_id, name, nif, phone, email, address, id, cp, locality, province } = input;

      await prisma.organization_client.update({
        where: {
          id,
          organization_id,
        },
        data: {
          name,
          nif,
          phone,
          email,
          address,
          cp,
          locality,
          province
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
      const cliente = await prisma.organization_client.delete({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
      });
      return { cliente };
    }),
});
