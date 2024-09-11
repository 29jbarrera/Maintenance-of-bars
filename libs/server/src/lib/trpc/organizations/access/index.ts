import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { create } from 'domain';

export const access = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const users_has_access =
        await prisma.user_has_access_to_organization.findMany({
          where: {
            o_id: input.organization_id,
          },
          include: {
            user: {
              include: {
                user_has_role_in_organization: {
                  where: {
                    o_id: input.organization_id,
                  },
                },
              },
            },
          },
          orderBy: {
            u_id: 'desc',
          },
        });

      const app_roles = await prisma.app_role.findMany();

      const organization_name = await prisma.organization.findUniqueOrThrow({
        where: {
          id: input.organization_id,
        },
        select: {
          name: true,
        },
      });

      return { users_has_access, app_roles, organization_name };
    }),

  edit_access_role: publicProcedure
    .input(
      z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
        role: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { u_id, o_id, role } = input;

      const ifExists = await prisma.user_has_role_in_organization.findUnique({
        where: {
          u_id_o_id_role: {
            u_id,
            o_id,
            role,
          },
        },
        select: {
          disabled: true,
        },
      });

      if (!ifExists) {
        const create_role = await prisma.user_has_role_in_organization.create({
          data: {
            o_id,
            u_id,
            role,
          },
        });

        return create_role;
      }

      const updated_role = await prisma.user_has_role_in_organization.update({
        where: {
          u_id_o_id_role: {
            u_id,
            o_id,
            role,
          },
        },
        data: {
          disabled: !ifExists.disabled,
        },
      });

      return updated_role;
    }),
});
