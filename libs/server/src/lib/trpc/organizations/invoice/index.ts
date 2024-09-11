import { TRPCError } from '@trpc/server';
import {
  getUserIdFormContext,
  publicProcedure,
  router,
} from '@komandero/serverTRPC';
import * as z from 'zod';
import { prisma } from '@komandero/prisma';

export const invoice = router({
  get_invoices_between_dates: publicProcedure
    .input(
      z.object({
        from: z.string(),
        to: z.string(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { from, to, organization_id } = input;
      const invoices = await prisma.invoice.findMany({
        where: {
          organization_id,
          created_at: {
            gte: new Date(from),
            lte: new Date(to),
          },
        },
      });
      return { invoices };
    }),
  get_invoice_by_id: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, organization_id } = input;

      const invoice = await prisma.invoice.findUniqueOrThrow({
        where: {
          organization_id,
          id,
        },
        include: { invoice_line: true, organization_client: true },
      });
      return { invoice };
    }),

  //  PETICIÓN PARA AÑADIR CLIENTE A FACTURA REVISAR
  add_client_to_invoice: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        organization_client_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, organization_client_id } = input;

      const update_invoice = await prisma.invoice.update({
        where: { id },
        data: {
          organization_client_id: organization_client_id,
        },
        include: {
          invoice_line: true,
          organization_client: true,
        },
      });

      return { update_invoice };
    }),
});
