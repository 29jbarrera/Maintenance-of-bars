import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { get_users_admin_ids } from '../utils';

export const organizations = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const users_admin = await get_users_admin_ids();
      const organization = await prisma.organization.create({
        data: {
          name: input.name,
          user_has_access_to_organization: {
            createMany: {
              data: users_admin.map((user_id) => ({
                u_id: user_id,
              })),
            },
          },
          // TODO: poner roles por defecto
          user_has_role_in_organization: {
            createMany: {
              data: users_admin.map((user_id) => ({
                role: 'user_manager',
                u_id: user_id,
              })),
            },
          },
        },
      });
      return organization;
    }),
    edit_organization: publicProcedure
    .input(
      z.object({
        id: z.string(),
        billing_identifier: z.string(),
        billing_name: z.string(),
        billing_address: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      
      const {id, billing_identifier, billing_name, billing_address} = input;

      const update = await prisma.organization.update({
        data: {
          billing_identifier,
          billing_address,
          billing_name,
        },
        where: {
          id
        }
      })

      return update;
    }),
});
