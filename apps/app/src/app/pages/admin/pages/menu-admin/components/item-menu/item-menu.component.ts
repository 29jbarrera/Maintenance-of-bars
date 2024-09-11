import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss',
})
export class ItemMenuComponent {

  @Input() item: any;
  @Output() go_to = new EventEmitter<string>();


  constructor(private _router: Router) {}

  checkRoute(item: any) {
    return item.routerLink === this._router.url;
  }

}
