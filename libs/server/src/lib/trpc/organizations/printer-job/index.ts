import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const printer_job = router({
  get_all: publicProcedure
    .input(
      z.object({
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organization_id = input.organization_id;
      const printer_jobs = await prisma.printer_job.findMany({
        where: { organization_id },
      });
      return { printer_jobs };
    }),
  reprint: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const printer_job = await prisma.printer_job.update({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
        data: {
          done: false,
        },
      });
      return { printer_job };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const printer_job = await prisma.printer_job.delete({
        where: {
          id: input.id,
          organization_id: input.organization_id,
        },
      });
      return { printer_job };
    }),
});
