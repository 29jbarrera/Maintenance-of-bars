import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderAppComponent } from '@komandero/web-share';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { Commander, Commanders, editCommanderForm } from './commander.type';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ModalCommanderComponents } from './components/modal-commander/modal-commander.components';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-commander',
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderAppComponent, ToastModule],
  templateUrl: './commander.page.html',
  styleUrl: './commander.page.scss',
  providers: [MessageService],
})
export class CommanderPage {
  public form_edit_commander = editCommanderForm();
  commanders: Commanders = [];
  categories_and_products: any = [];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private _modalController: ModalController,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.load_list_commanders();
    this.load_categories_and_products();
  }

  async load_list_commanders() {
    const o_id = this.get_organization_id();

    try {
      const response =
        await clientOrganizationTrpc.organization_commander.get_all.mutate({
          o_id,
        });

      this.commanders = response;
    } catch (error) {}
  }

  async load_categories_and_products() {
    const organization_id = this.get_organization_id();

    try {
      const { categories_and_products } =
        await clientOrganizationTrpc.organization_commander.get_categories_and_products.mutate(
          {
            organization_id,
          }
        );

      this.categories_and_products = categories_and_products;
    } catch (error) {}
  }

  get_organization_id() {
    return get_organization_id(this._route);
  }

  async modal_edit_commander(commander: any) {
    this.set_form_edit_commander(commander);

    const modal = await this._modalController.create({
      component: ModalCommanderComponents,
      backdropDismiss: false,
      componentProps: {
        form_edit_commander: this.form_edit_commander,
        commander,
        categories_and_products: this.categories_and_products,
        categories_block: commander.conf.product_categories_blocked,
        products_block: commander.conf.product_ids_blocked,
        products_allow: commander.conf.product_ids_allowed,
      },
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    console.log('data:', data);

    try {
      const response =
        await clientOrganizationTrpc.organization_commander.update.mutate(data);

      if (!response) return;

      this.commanders = this.commanders.map((_commander: any) => {
        if (_commander.id === response.id) {
          return { ..._commander, ...response };
        }
        return _commander;
      });

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  private set_form_edit_commander(commander: any) {
    const { name, order, print_available, print_name } = commander;
    const { max_time, name_internals, notifications } = commander.conf;

    const status = commander.conf.status_selected;

    this.form_edit_commander.patchValue({
      name,
      order,
      print_available,
      print_name,
      status_selected: this.set_form_status_selected(status),
      max_time,
      name_internals,
      notifications,
    });
  }

  private set_form_status_selected(status: string[]) {
    const form_status = this.form_edit_commander.get(
      'status_selected'
    ) as FormArray;
    form_status.clear();

    status.forEach((status: string) => {
      form_status.push(this.new_status(status));
    });
  }

  private new_status(status: string) {
    return new FormControl(status);
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }
}
