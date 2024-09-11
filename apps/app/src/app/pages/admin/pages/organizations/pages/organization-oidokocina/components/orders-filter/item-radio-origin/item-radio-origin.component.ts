import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioCommonClass } from '../input-radio-common-class';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-radio-origin',
  standalone: true,
  imports: [CommonModule, RadioButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './item-radio-origin.component.html',
  styleUrl: './item-radio-origin.component.scss',
})
export class ItemRadioOriginComponent extends InputRadioCommonClass {


}
