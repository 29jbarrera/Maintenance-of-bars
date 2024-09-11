import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { editCommanderForm } from '../../commander.type';
import {
  STATUS_TYPE,
  checkStatus,
} from '@komandero/commons';
import { AccordionModule } from 'primeng/accordion';
import { FilterCategory } from './modal-commander-filter-category.pipe';
import { FilterProduct } from './modal-commander-filter-product.pipe';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';

@Component({
  selector: 'app-modal-commander',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AccordionModule,
    FilterCategory,
    FilterProduct
  ],
  templateUrl: './modal-commander.components.html',
  styleUrl: './modal-commander.components.scss',
})
export class ModalCommanderComponents {
  @Input() public form_edit_commander = editCommanderForm();
  @Input() public commander: any;
  @Input() public categories_and_products: any;

  @Input() public categories_block: string[] = [];
  @Input() public products_block: string[] = [];
  @Input() public products_allow: string[] = [];

  public search_term: string = '';

  public segment_selected:
    | 'data'
    | 'categories_blocked'
    | 'products_blocked'
    | 'products_allowed' = 'data';

  public status_types: string[] = STATUS_TYPE;

  constructor(private _modalController: ModalController) {}

  search(event: any) {
    this.search_term = event.target.value.toLowerCase();
  }

  checkStatus(status: string, exist: boolean) {
    return checkStatus(status, exist);
  }

  change_segment(event: any) {
    this.segment_selected = event.detail.value;
    this.search_term = '';
  }

  isActive(status: string) {
    const form_status = this.form_edit_commander.get(
      'status_selected'
    ) as FormArray;

    const exist = !!form_status.controls.find(
      (control) => control.value === status
    );

    return this.checkStatus(status, exist);
  }

  activeStatus(status: string) {
    const form_status = this.form_edit_commander.get(
      'status_selected'
    ) as FormArray;

    const exist = !!form_status.controls.find(
      (control) => control.value === status
    );

    if (exist) {
      const index = form_status.controls.findIndex(
        (control) => control.value === status
      );

      form_status.removeAt(index);
      return;
    }

    form_status.push(this.new_status(status));
  }

  private new_status(status: string) {
    return new FormControl(status);
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_edit_commander);
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_edit_commander);
  }

  isCategoryBlock(category_id: string) {
    const isActive = !!this.categories_block.find(
      (id: string) => id === category_id
    );
    return isActive;
  }

  addRemoveCategory(event: any, category_id: string) {
    const shouldAdd = event.detail.checked;

    if (shouldAdd) {
      this.categories_block.push(category_id);
    } else {
      this.categories_block = this.categories_block.filter(
        (c: string) => c !== category_id
      );
    }
  }

  isProductBlock(product_id: string) {
    const isActive = !!this.products_block.find(
      (id: string) => id === product_id
    );
    return isActive;
  }

  addRemoveProductBlock(event: any, category_id: string) {
    const shouldAdd = event.detail.checked;

    if (shouldAdd) {
      this.products_block.push(category_id);
    } else {
      this.products_block = this.products_block.filter(
        (c: string) => c !== category_id
      );
    }
  }

  isProductAllow(product_id: string) {
    const isActive = !!this.products_allow.find(
      (id: string) => id === product_id
    );
    return isActive;
  }

  addRemoveProductsAllow(event: any, category_id: string) {
    const shouldAdd = event.detail.checked;

    if (shouldAdd) {
      this.products_allow.push(category_id);
    } else {
      this.products_allow = this.products_allow.filter(
        (c: string) => c !== category_id
      );
    }
  }

  getProducts(category: any) {
    return category.product;
  }

  close() {
    this._modalController.dismiss();
  }

  updateCommander() {
    if (!this.form_edit_commander.valid) {
      Object.keys(this.form_edit_commander.controls).forEach((key: string) => {
        const control = this.form_edit_commander.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      return;
    }

    // console.log('Formulario:', this.form_edit_commander.value);
    // console.log('Categorias Bloqueadas:', this.categories_block);
    // console.log('Productos Bloqueados', this.products_block);
    // console.log('Productos Permitidos', this.products_allow);

    const data = {
      id: this.commander.id,
      form: this.form_edit_commander.value,
      product_categories_blocked: this.categories_block,
      product_ids_blocked: this.products_block,
      product_ids_allowed: this.products_allow,
    };

    this._modalController.dismiss(data, 'update');
  }
}
