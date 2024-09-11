import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from './organization-oidokocina.type';
import { FILTER_PEDIDOS } from '@komandero/commons';

@Pipe({
  name: 'filterorganizationOidokocina',
  standalone: true,
})
export class FilterOrganizationOidokocina implements PipeTransform {
  transform(orders: Pedido[], filters: any): Pedido[] {
    if (!orders || !filters) {
      return orders;
    }

    return orders;
  }

  // private filterOrder(order: Pedido, filters: FILTER_PEDIDOS): boolean {
  //   const { from, to, origin, payment_method, status, types_of_delivery } =
  //     filters;

  //   return (
  //     this.date_between(order.createdAt, from, to) &&
  //     this.status(order.estado.id, status)
  //     // this.payment_method(order.formapago, filters._payment_method) &&
  //     // this.delivery_type(
  //     //   this.get_delivery_type(order),
  //     //   filters._types_of_delivery
  //     // ) &&
  //     // this.origin(order.entrada, filters._origin)
  //   );
  // }

  private date_between(
    date: string,
    from: number | null,
    to: number | null
  ): boolean {
    const orderDate = new Date(date).getTime();
    return (!from || orderDate >= from) && (!to || orderDate <= to);
  }

  private status(state: number, status: number[]): boolean {
    return !status.length || status.includes(state);
  }

  private payment_method(
    payment_method: string,
    filter_payment_method: string | null
  ): boolean {
    return (
      !filter_payment_method ||
      filter_payment_method === 'Todas' ||
      payment_method === filter_payment_method
    );
  }

  private delivery_type(
    delivery_type: string,
    filter_delivery_type: string | null
  ): boolean {
    return (
      !filter_delivery_type ||
      filter_delivery_type === 'Todas' ||
      delivery_type === filter_delivery_type
    );
  }

  private origin(origin: string, filter_origin: string | null): boolean {
    return (
      !filter_origin || filter_origin === 'Todos' || origin === filter_origin
    );
  }

  private get_delivery_type(order: Pedido): string {
    return order.establecimiento.arecoger ? 'R' : 'E';
  }
}
