import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

(BigInt.prototype as any)['toJson'] = function () {
  return this.toString();
};

export const app_configs = router({
  product_modification_group: publicProcedure.query(async ({ ctx }) => {
    const app_product_modifications_groups =
      await prisma.app_product_modification_group.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    return {
      app_product_modifications_groups: app_product_modifications_groups.map(
        (r) => {
          return {
            ...r,
            id: r.id.toString(),
          };
        }
      ),
    };
  }),
  update_product_modification_group: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      const _id = BigInt(id);

      const updated = await prisma.app_product_modification_group.update({
        where: {
          id: _id,
        },
        data: {
          name,
        },
      });

      const updated_group = {
        id: updated.id.toString(),
        name: updated.name,
      };

      return { updated_group };
    }),
  product_modifications_of_group: publicProcedure
    .input(
      z.object({
        apmg: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const app_product_modifications =
        await prisma.app_product_modification.findMany({
          where: {
            apmg: BigInt(String(input.apmg)),
          },
        });

      return {
        app_product_modifications: app_product_modifications.map((r) => {
          return {
            ...r,
            id: r.id.toString(),
            apmg: (r.apmg || '').toString(),
          };
        }),
      };
    }),

  check_if_exist_product_id: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const id = input;
      const _id = BigInt(id);

      const exist = await prisma.app_product_modification.findUnique({
        where: {
          id: _id,
        },
      });

      
      
      return !!exist;
    
    }),
  add_product_modification_to_group: publicProcedure
    .input(
      z.object({
        id: z.number(),
        apmg: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, apmg, name } = input;

      const _id = BigInt(id);
      const _apmg = BigInt(apmg);

      const create = await prisma.app_product_modification.create({
        data: {
          id: _id,
          apmg: _apmg,
          name,
        },
      });

      const app_product_modification = {
        id: create.id.toString(),
        apmg: (create.apmg || '').toString(),
        name: create.name,
      };

      return { app_product_modification };
    }),
  update_product_modification_in_group: publicProcedure
    .input(
      z.object({
        id: z.number(),
        apmg: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, apmg, name } = input;

      const _id = BigInt(id);
      const _apmg = BigInt(apmg);

      const update = await prisma.app_product_modification.update({
        where: {
          id: _id,
        },
        data: {
          apmg: _apmg,
          name,
        },
      });

      const update_product_modification = {
        id: update.id.toString(),
        apmg: (update.apmg || '').toString(),
        name: update.name,
      };

      return { update_product_modification };
    }),
  delete_product_modification_in_group: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const _id = BigInt(id);

      const deleted = await prisma.app_product_modification.delete({
        where: {
          id: _id,
        },
      });

      const deleted_product_modification = {
        id: deleted.id.toString(),
      };

      return { deleted_product_modification };
    }),
});
