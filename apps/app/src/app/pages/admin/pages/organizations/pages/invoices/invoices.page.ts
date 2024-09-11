import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CentToEurPipe, HeaderAppComponent } from '@komandero/web-share';
import { CalendarModule } from 'primeng/calendar';
import { FilterBetweenDatesComponent } from '@komandero/web-share';
import { FilterCommonClass } from '@komandero/web-share';
import { Invoice, Invoices } from './type';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InvoicesPipe } from './invoices.pipe';
import { ModalViewInvoicesComponent } from './components/modal-view-invoices/modal-view-invoices.component';
import { cent_to_eur } from '@komandero/commons';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    HeaderAppComponent,
    CalendarModule,
    FilterBetweenDatesComponent,
    InputTextareaModule,
    InvoicesPipe,
    CentToEurPipe,
  ],
  templateUrl: './invoices.page.html',
  styleUrl: './invoices.page.scss',
  providers: [MessageService, ConfirmationService],
})
export class InvoicesPage extends FilterCommonClass {
  public invoices: Invoices = [];
  public organization_name: any;
  public loading: boolean = false;
  public search_term = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalController: ModalController,
    private _confirmationService: ConfirmationService,
    private loadingController: LoadingController
  ) {
    super();
  }

  override filtersBetweenDates(dates: any) {
    this.load_invoices_between_dates(dates);
  }

  override cleanFilterDates() {
    super.cleanFilterDates();
  }

  ionViewWillEnter() {
    const dates = this.get_month_from_today(1);
    this.load_invoices_between_dates(dates);
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });
      this.organization_name = organization?.name;
    } catch (error) {}
  }

  async load_invoices_between_dates(dates: { _from: string; _to: string }) {
    this.loading = true;
    const organization_id = this.get_organization_id();
    this.get_organization_name(this.get_organization_id());

    const from_date = new Date(dates._from);
    const to_date = new Date(dates._to);

    const from_date_string = from_date.toISOString();
    const to_date_string = to_date.toISOString();

    try {
      const response =
        await clientOrganizationTrpc.invoice.get_invoices_between_dates.mutate({
          from: from_date_string,
          to: to_date_string,
          organization_id,
        });

      this.invoices = response.invoices;
      this.loading = false;
    } catch (error) {
      console.error('Error loading invoices:', error);
      this.loading = false;
    }
  }

  get_month_from_today(months_ago: number) {
    const today = new Date();
    const from_date = new Date();

    from_date.setMonth(today.getMonth() - months_ago);

    return {
      _from: from_date.toISOString(),
      _to: today.toISOString(),
    };
  }

  async view_modal_invoices(_invoice: Invoice) {
    const loading = await this.loadingController.create({
      message: 'Cargando factura...',
      duration: 0,
    });

    await loading.present();

    const { invoice } =
      await clientOrganizationTrpc.invoice.get_invoice_by_id.mutate({
        id: _invoice.id,
        organization_id: this.get_organization_id(),
      });

    const modal = await this._modalController.create({
      component: ModalViewInvoicesComponent,
      backdropDismiss: false,
      componentProps: {
        invoice: invoice,
      },
      mode: 'ios',
    });

    await loading.dismiss();
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'print') return;

    // this.confirmation_reprint(invoice);
  }

  confirmation_reprint(invoice: Invoice) {
    this._confirmationService.confirm({
      message: '¿Está seguro que desea reeimprimir?',
      header: 'Reeimprimir',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        // this.reprint(invoices);
      },
    });
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
