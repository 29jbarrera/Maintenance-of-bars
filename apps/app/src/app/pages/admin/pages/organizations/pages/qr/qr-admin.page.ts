import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  ItemReorderEventDetail,
  LoadingController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { CategoriesQR, CategoryQR } from './qr-admin.type';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { HeaderAppComponent } from '@komandero/web-share';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import * as QRCode from 'qrcode';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-qr-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    ToastModule,
    ProgressBarModule,
    ListCategoriesComponent,
  ],
  templateUrl: './qr-admin.page.html',
  styleUrl: './qr-admin.page.scss',
  providers: [MessageService],
})
export class QrAdminPage {
  categories: CategoriesQR = [];
  categories_reset: CategoriesQR = [];
  order_categories: boolean = false;
  loading: boolean = false;
  qr_code: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.load_categories();
    this.load_qr();
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  private load_qr() {
    // TODO: Generate QR
    const url = `https://carta.komandero.com/carta/${this.get_organization_id()}`;
    // var QRCode = require('qrcode')

    QRCode.toDataURL(url).then((url) => {
      this.qr_code = url;
      console.log(url);
    });
  }

  async load_categories() {
    this.loading = true;

    const organization_id = this.get_organization_id();

    try {
      const categories =
        await clientOrganizationTrpc.qr.get_categories_of_products.mutate({
          organization_id,
        });

      this.categories = categories;
      this.categories_reset = JSON.parse(JSON.stringify(categories));
    } catch (error) {}

    this.loading = false;
  }

  reorder() {
    this.order_categories = !this.order_categories;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from;
    const to = ev.detail.to;

    const item_to_move = this.categories.splice(from, 1)[0];
    this.categories.splice(to, 0, item_to_move);

    ev.detail.complete();
  }

  reset_order() {
    this.categories = [];

    try {
      this.categories = this.categories_reset.map((c) => {
        return {
          ...c,
        };
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden restablecido',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async save_order() {
    this.categories.forEach((category, index) => {
      category.qr_o = index;
    });

    const update = {
      organization_id: this.get_organization_id(),
      categories: this.categories.map((c) => {
        return {
          id: c.id,
          qr_o: c.qr_o,
        };
      }),
    };

    try {
      const response =
        await clientOrganizationTrpc.qr.save_order_category.mutate(update);

      if (!response) return;

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Orden guardado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async change_order_categories_of_products(category: CategoryQR) {
    const { id, qr_v } = category;
    const organization_id = this.get_organization_id();

    const update_qr_view = {
      organization_id,
      id,
      qr_v,
    };

    try {
      const response =
        await clientOrganizationTrpc.qr.change_order_categories_of_products.mutate(
          update_qr_view
        );

      if (!response) return;

      this.categories = this.categories.map((c) => {
        if (response.id === c.id) {
          return { ...c, ...response };
        }
        return c;
      });
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: `${
          response.qr_v ? 'Habilitado' : 'Deshabilitado'
        } vista categoría`,
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  goToManageCategory(category: CategoryQR['id']) {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
      'qr',
      category,
    ]);
  }

  goToMyWebCharter() {
    const url = `https://carta.komandero.com/carta/${this.get_organization_id()}`;

    window.open(url, '_blank');
  }

  getMyQR() {
    return this.qr_code;
  }

  async downloadQRPDF() {
    const loading = await this._loadingController.create({
      message: 'Descargando PDF...',
      backdropDismiss: false,
      duration: 0,
    });
    await loading.present();

    try {
      console.error('TODO: Descargar PDF del QR');
    } catch (error) {}
  }

  async downloadQRImage() {
    const loading = await this._loadingController.create({
      message: 'Descargando imagen...',
      backdropDismiss: false,
      duration: 0,
    });
    await loading.present();

    try {
      const imagePath = this.getMyQR();
      const a = document.createElement('a');
      a.href = imagePath;
      a.download = 'qr.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    }

    await loading.dismiss();
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
