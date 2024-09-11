import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import {
  GroupSelected,
  Product,
  ProductModifications,
  ProductModificationsGroups,
  productModifcationForm,
  productModifcationGroupForm,
} from './type';
import { HeaderAppComponent } from '@komandero/web-share';
import {
  FilterModificationGroup,
  FilterModificationProduct,
} from './app-configs.pipe';
import { ModalProductModificationGroupComponent } from './components/modal-product-modification-group/modal-product-modification-group.component';
import { ModalProductModificationComponent } from './components/modal-product-modification/modal-product-modification.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { ModificationItemComponent } from './components/modification-item/modification-item.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    FilterModificationGroup,
    ConfirmDialogModule,
    FilterModificationProduct,
    ProgressBarModule,
    ToastModule,
    GroupItemComponent,
    ModificationItemComponent
  ],
  templateUrl: './app-configs.page.html',
  styleUrl: './app-configs.page.scss',
  providers: [MessageService, ConfirmationService],
})
export class AppConfigsPage {
  product_modifications_groups: ProductModificationsGroups = [];
  product_modifications: ProductModifications = [];

  search_group_text: string = '';
  search_product_text: string = '';
  loading: boolean = false;

  group_selected!: GroupSelected;
  form_modification_group = productModifcationGroupForm();
  form_modification_product = productModifcationForm();

  constructor(
    private _modalController: ModalController,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.load_groups();
  }

  search_group(event: any) {
    this.search_group_text = event.target.value.toLowerCase();
  }

  search_product(event: any) {
    this.search_product_text = event.target.value.toLowerCase();
  }

  private async load_groups() {
    this.loading = true;

    try {
      const { app_product_modifications_groups } =
        await clientAdminTrpc.app_configs.product_modification_group.query();
      this.product_modifications_groups = app_product_modifications_groups;
    } catch (error) {}

    this.loading = false;
  }

  async load_product_modifications(group: GroupSelected) {
    this.loading = true;
    this.group_selected = group;
    this.product_modifications = [];
    try {
      const { app_product_modifications } =
        await clientAdminTrpc.app_configs.product_modifications_of_group.query({
          apmg: Number(group.id),
        });
      this.product_modifications = app_product_modifications;
    } catch (error) {}

    this.loading = false;
  }

  async modification_group(group: GroupSelected) {
    this.form_modification_group.patchValue({
      id: +group.id,
      name: group.name,
    });

    const modal = await this._modalController.create({
      component: ModalProductModificationGroupComponent,
      componentProps: {
        form_modification_group: this.form_modification_group,
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    const _data = {
      id: +group.id,
      name: data.name,
    };

    try {
      const { updated_group } =
        await clientAdminTrpc.app_configs.update_product_modification_group.mutate(
          _data
        );

      this.product_modifications_groups = this.product_modifications_groups.map(
        (_group: any) => {
          if (_group.id === updated_group.id) {
            return { ..._group, ...updated_group };
          }

          return _group;
        }
      );

      if (this.group_selected) {
        this.group_selected = updated_group;
      }

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Grupo actualizado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async add_product_modification(group_selected: GroupSelected) {
    this.form_modification_product = productModifcationForm();

    this.form_modification_product.patchValue({
      apmg: +group_selected.id,
    });

    const modal = await this._modalController.create({
      component: ModalProductModificationComponent,
      componentProps: {
        form_modification_product: this.form_modification_product,
        mode: 'Creando',
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') return;

    try {
      const { app_product_modification } =
        await clientAdminTrpc.app_configs.add_product_modification_to_group.mutate(
          data
        );

      this.product_modifications.push(app_product_modification);

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto añadido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit_product_modification(modification: Product) {
    this.form_modification_product = productModifcationForm();

    this.form_modification_product.patchValue({
      id: +modification.id,
      apmg: +modification.apmg,
      name: modification.name,
    });

    this.form_modification_product.get('id')?.disable();

    const modal = await this._modalController.create({
      component: ModalProductModificationComponent,
      componentProps: {
        form_modification_product: this.form_modification_product,
        mode: 'Editando',
      },
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'update') return;

    const _data = {
      id: +modification.id,
      apmg: data.apmg,
      name: data.name,
    };

    try {
      const { update_product_modification } =
        await clientAdminTrpc.app_configs.update_product_modification_in_group.mutate(
          _data
        );

      this.product_modifications = this.product_modifications.map(
        (product: Product) => {
          if (product.id === update_product_modification.id) {
            return { ...product, ...update_product_modification };
          }

          return product;
        }
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Producto editado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  confirm_delete(modification: Product) {
    const { name } = modification;

    this._confirmationService.confirm({
      message: `¿Está seguro que desea eliminar ${name}?`,
      header: `Eliminar  ${name}`,
      icon: 'pi pi-check',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.delete(modification);
      },
    });
  }

  async delete(modification: Product) {
    try {
      const { deleted_product_modification } =
        await clientAdminTrpc.app_configs.delete_product_modification_in_group.mutate(
          { id: +modification.id }
        );

      this.product_modifications = this.product_modifications.filter(
        (_product: Product) => _product.id !== deleted_product_modification.id
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Prodcuto eliminado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }
}
