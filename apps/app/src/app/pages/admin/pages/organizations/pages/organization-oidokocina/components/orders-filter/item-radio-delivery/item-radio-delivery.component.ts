import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FILTER_PEDIDOS } from '@komandero/commons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputRadioCommonClass } from '../input-radio-common-class';

@Component({
  selector: 'app-item-radio-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RadioButtonModule],
  templateUrl: './item-radio-delivery.component.html',
  styleUrl: './item-radio-delivery.component.scss',
})
export class ItemRadioDeliveryComponent extends InputRadioCommonClass {}
