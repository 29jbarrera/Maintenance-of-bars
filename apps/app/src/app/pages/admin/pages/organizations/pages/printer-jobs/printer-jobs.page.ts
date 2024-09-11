import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Table, TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ModalViewTicketComponent } from './components/modal-view-ticket.component';
import { PrinterJob, PrinterJobs } from './printer-jobs.type';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderAppComponent } from '@komandero/web-share';
import { CalendarModule } from 'primeng/calendar';
import { FilterBetweenDatesComponent } from '@komandero/web-share';
import { FilterCommonClass } from '@komandero/web-share';

@Component({
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
  ],
  templateUrl: './printer-jobs.page.html',
  styleUrl: './printer-jobs.page.scss',
  providers: [MessageService, ConfirmationService],
})
export class PrinterJobsPage extends FilterCommonClass {
  public printer_jobs: PrinterJobs = [];
  public organization_name: any;
  public loading: boolean = false;

  @ViewChild('dt') override dt!: Table;

  constructor(
    private _route: ActivatedRoute,
    private _modalController: ModalController,
    private _router: Router,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {
    super();
  }

  override filtersBetweenDates(dates: any) {
    super.filtersBetweenDates(dates);
  }

  override cleanFilterDates() {
    super.cleanFilterDates();
  }

  ionViewWillEnter() {
    this.load_printer_jobs();
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

  async load_printer_jobs() {
    this.loading = true;
    const organization_id = this.get_organization_id();

    try {
      const { printer_jobs } =
        await clientOrganizationTrpc.printer_job.get_all.mutate({
          organization_id,
        });

      this.printer_jobs = printer_jobs.map((printer: any) => {
        return {
          ...printer,
          created_at: new Date(printer.created_at),
        };
      });

      this.get_organization_name(organization_id);

      this.loading = false;
    } catch (error) {}
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }

  confirmation_delete_printer(printer_job: PrinterJob) {
    this._confirmationService.confirm({
      message: '¿Está seguro que desea borrar impresora?',
      header: 'Eliminar Impresora',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.delete_printer(printer_job);
      },
    });
  }

  async delete_printer(printer_job: PrinterJob) {
    const { id, organization_id } = printer_job;

    const to_delete = {
      id,
      organization_id,
    };

    try {
      const { printer_job: deleted_printer_job } =
        await clientOrganizationTrpc.printer_job.delete.mutate(to_delete);

      if (!deleted_printer_job) return;

      this.printer_jobs = this.printer_jobs.filter(
        (printer: any) => printer.id !== deleted_printer_job.id
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Ticket eliminado',
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  confirmation_reprint(printer_job: PrinterJob) {
    this._confirmationService.confirm({
      message: '¿Está seguro que desea reeimprimir?',
      header: 'Reeimprimir',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.reprint(printer_job);
      },
    });
  }

  async reprint(printer_job: PrinterJob) {
    const { id, organization_id } = printer_job;

    const to_reprint = {
      id,
      organization_id,
    };

    try {
      const { printer_job } =
        await clientOrganizationTrpc.printer_job.reprint.mutate(to_reprint);

      if (!printer_job) return;

      this.printer_jobs = this.printer_jobs.map((printer: any) => {
        if (printer.id === printer_job.id) {
          return { ...printer, ...printer_job };
        }
        return printer;
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

  async view_ticket(printer_job: any) {
    console.log(printer_job);
    const { lines_to_print: lines } = printer_job.data;
    const modal = await this._modalController.create({
      component: ModalViewTicketComponent,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        lines,
        printer_job,
      },
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role !== 'print') return;

    this.confirmation_reprint(printer_job);
  }
}
