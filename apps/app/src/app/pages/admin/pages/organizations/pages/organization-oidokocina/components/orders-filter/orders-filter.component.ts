import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  FILTER_PEDIDOS,
  initialization_filters,
  OK_TYPE_OF_DELIVERY_SELECTION,
  OK_TYPE_OF_ORIGIN_SELECTION,
  OK_TYPE_OF_PAYMENT_SELECTION,
  OK_TYPE_OF_STATE_SELECTION,
  origins,
  payment_methods,
  state,
  types_of_delivery,
} from '@komandero/commons';
import { ItemCheckboxStatusComponent } from './item-checkbox-status/item-checkbox-status.component';
import { ItemRadioPaymentMethodComponent } from './item-radio-payment-method/item-radio-payment-method.component';
import { ItemRadioDeliveryComponent } from './item-radio-delivery/item-radio-delivery.component';
import { ItemRadioOriginComponent } from './item-radio-origin/item-radio-origin.component';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    IonicModule,
    CalendarModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
    ItemCheckboxStatusComponent,
    ItemRadioPaymentMethodComponent,
    ItemRadioDeliveryComponent,
    ItemRadioOriginComponent
  ],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
})
export class OrderFilterComponent {
  
  @Input() filters!: FILTER_PEDIDOS;
  @Output() filter_data: EventEmitter<FILTER_PEDIDOS> = new EventEmitter<FILTER_PEDIDOS>();

  constructor() {}

  public status: OK_TYPE_OF_STATE_SELECTION[] = state;
  public types_of_delivery: OK_TYPE_OF_DELIVERY_SELECTION[] = types_of_delivery;
  public origins: OK_TYPE_OF_ORIGIN_SELECTION[] = origins;
  public payment_methods: OK_TYPE_OF_PAYMENT_SELECTION[] = payment_methods;

  selectAllStatus(event: any) {
    if (event.detail.checked) {
      this.filters.status = this.status.map((_state: any) => _state.value);
    } else {
      this.filters.status = [];
    }
  }

  selectStatus(select: any) {

    const {event, value} = select

    const shouldAdd = event.detail.checked;

    if (shouldAdd) {
      this.filters.status.push(value);
    } else {
      this.filters.status = this.filters.status.filter(
        (_status) => _status !== value
      );
    }
  }

  get_if_checked_all_status() {
    return this.filters.status.length === this.status.length;
  }

  get_if_checked_status(status: number) {
    return this.filters.status.includes(status);
  }

  cleanFilters() {
    const { from, to, origin, payment_method, status, types_of_delivery } =
      initialization_filters();

    this.filters = {
      from,
      to,
      origin,
      payment_method,
      status,
      types_of_delivery,
    };
  }

  apply_filters() {
    const { from, to, payment_method, types_of_delivery, origin, status } =
      this.filters;

    const filter = {
      from,
      to,
      status,
      payment_method,
      types_of_delivery,
      origin,
    };

    this.filter_data.emit(filter);
  }
}
