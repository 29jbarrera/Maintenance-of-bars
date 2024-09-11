import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FILTER_PEDIDOS, OK_TYPE_OF_PAYMENT } from '@komandero/commons';
import { InputRadioCommonClass } from '../input-radio-common-class';

@Component({
  selector: 'app-item-radio-payment-method',
  standalone: true,
  imports: [CommonModule, RadioButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './item-radio-payment-method.component.html',
  styleUrl: './item-radio-payment-method.component.scss',
})
export class ItemRadioPaymentMethodComponent extends InputRadioCommonClass {
}
