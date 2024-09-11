import { Pipe, PipeTransform } from '@angular/core';
import { Invoices, InvoiceTypePipe } from './type';
import { stringOneIncludeInStringTwo } from '@komandero/commons';

@Pipe({
  name: 'invoices',
  standalone: true,
})
export class InvoicesPipe implements PipeTransform {
  transform(invoices: Invoices, search_term: string): Invoices {
    if (!invoices) return [];

    if (!search_term) return invoices;

    const multiple_searches = search_term.split(/[\n,]+/).map((term) => term.trim()).filter((term) => term !== '');

    return invoices.filter((invoice: InvoiceTypePipe) => {
      const total_amount = invoice.total_amount.toString();
      const description = invoice.description;

      return multiple_searches.some((term) => {
        return (
          stringOneIncludeInStringTwo(term, total_amount) ||
          stringOneIncludeInStringTwo(term, description)
        );
      });
    });
  }
}
