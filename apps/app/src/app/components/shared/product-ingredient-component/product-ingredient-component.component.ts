import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PillCheckboxComponent } from '../pill-checkbox-component/pill-checkbox-component.component';

@Component({
  selector: 'app-product-ingredient-component',
  standalone: true,
  imports: [CommonModule, IonicModule, PillCheckboxComponent],
  templateUrl: './product-ingredient-component.component.html',
  styleUrl: './product-ingredient-component.component.scss',
})
export class ProductIngredientComponentComponent {
  @Input() product: any;
  @Output() add_or_remove: EventEmitter<any> = new EventEmitter<any>();
}
