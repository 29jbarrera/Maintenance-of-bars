import { TRPCOutput } from '@komandero/clientTRPC';

export type Invoices =
  TRPCOutput['organizations']['invoice']['get_invoices_between_dates']['invoices'];
export type Invoice = Invoices[0];

export type InvoiceById =
  TRPCOutput['organizations']['invoice']['get_invoice_by_id']['invoice'];

export interface InvoiceTypePipe {
  total_amount: number;
  description: string;
}
