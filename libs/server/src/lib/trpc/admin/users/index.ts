import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';
import { create_user } from '../../../firebase';

export const users = router({
  get_users: publicProcedure.query(async ({ ctx }) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        displayName: true,
        uid: true,
        email: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return { users };
  }),
  view_user: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      const organizations_have_access =
        await prisma.user_has_access_to_organization.findMany({
          where: {
            u_id: input.id,
          },
          include: {
            organization: true,
          },
        });

      return {
        user,
        organizations_have_access,
      };
    }),
  edit_display_name: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        displayName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          displayName: input.displayName,
        },
      });

      return true;
    }),
  get_organizations_to_add_user: publicProcedure.query(async ({ ctx }) => {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return { organizations };
  }),
  add_user_to_organization: publicProcedure
    .input(
      z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const add_organization_to_user =
        await prisma.user_has_access_to_organization.create({
          data: {
            u_id: input.u_id,
            o_id: input.o_id,
          },
          include: {
            organization: true,
          }
        });

      return { add_organization_to_user };
    }),
  remove_user_to_organization: publicProcedure
    .input(
      z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { u_id, o_id } = input;

      const remove_organization =
        await prisma.user_has_access_to_organization.delete({
          where: {
            u_id_o_id: {
              u_id,
              o_id,
            },
          },
        });

      return true;
    }),
  toggle_user_on_organization: publicProcedure
    .input(
      z.object({
        u_id: z.string().uuid(),
        o_id: z.string().uuid(),
        disabled: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await prisma.user_has_access_to_organization.update({
        where: {
          u_id_o_id: {
            o_id: input.o_id,
            u_id: input.u_id,
          },
        },
        data: {
          disabled: input.disabled,
        },
      });

      return { success: !!updated };
    }),
  create_user: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        displayName: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, displayName, password } = input;
      const _email = email.toLowerCase().trim();

      await create_user({
        displayName,
        email: _email,
        password,
      });

      return { success: true };
    }),
});
