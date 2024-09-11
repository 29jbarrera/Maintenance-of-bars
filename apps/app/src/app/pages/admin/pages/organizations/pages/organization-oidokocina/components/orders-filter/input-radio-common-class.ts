import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FILTER_PEDIDOS } from '@komandero/commons';

@Component({
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class InputRadioCommonClass {
  @Input() name: string = '';
  @Input() value!: number | '' | 'APP' | 'ES' | 'IN';
  @Input() filters!: FILTER_PEDIDOS;
}
