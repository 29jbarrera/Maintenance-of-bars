import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  GroupsModifications,
  ItemsModifications,
  productModificationForm,
} from '../../types';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-add-modifiers-product',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    InputTextModule,
  ],
  templateUrl: './modal-add-modifiers-product.component.html',
  styleUrl: './modal-add-modifiers-product.component.scss',
})
export class ModalAddModifiersProductComponent {
  @Input() groups: GroupsModifications[] = [];
  @Input() items: ItemsModifications[] = [];

  public product_modification_form = productModificationForm();
  public selecteds_groups: GroupsModifications['value'][] = [];
  public selecteds_items: ItemsModifications[] = [];

  constructor(private _modalController: ModalController) {}

  close() {
    this._modalController.dismiss();
  }

  get_items_for_group() {
    if (!this.selecteds_groups) return [];

    return this.items.filter((item) =>
      this.selecteds_groups.includes(item.apmg)
    );
  }

  confirm_add_modifiers() {
    this._modalController.dismiss(
      this.product_modification_form.value,
      'create'
    );
  }
}
