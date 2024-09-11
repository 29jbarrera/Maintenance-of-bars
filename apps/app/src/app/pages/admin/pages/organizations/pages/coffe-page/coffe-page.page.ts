import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './coffe-page.page.html',
  styleUrl: './coffe-page.page.scss',
})
export class CoffePagePage {
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  ionDidViewEnter() {}

  get_organization_id() {
    return get_organization_id(this._route);
  }
}
