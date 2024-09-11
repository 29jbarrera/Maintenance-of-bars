import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { localConfigurationPrinterForm } from '../../local-configuration-printers.type';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-configuration-printer',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, ButtonModule, ToggleButtonModule, InputTextModule],
  templateUrl: './form-configuration-printer.component.html',
  styleUrl: './form-configuration-printer.component.scss',
})
export class FormConfigurationPrinterComponent {

  @Input() form = localConfigurationPrinterForm();
  @Output() remove_printer = new EventEmitter<number>()
  @Output() add_printer = new EventEmitter();

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form);
  }
  

  printers_controls() {
    const form_printer = this.form.get(
      'printers'
    ) as FormArray;
    return form_printer.controls as FormGroup[];
  }

}
