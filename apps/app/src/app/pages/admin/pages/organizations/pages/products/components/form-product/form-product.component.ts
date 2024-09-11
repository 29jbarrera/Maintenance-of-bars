import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Categories, productForm } from '../../type';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent {
  @Input() form_product = productForm();
  @Input() categories!: Categories;

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_product);
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_product);
  }
}
