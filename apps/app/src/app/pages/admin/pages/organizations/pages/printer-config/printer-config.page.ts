import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { ToastModule } from 'primeng/toast';
import { TicketPreviewComponent } from 'apps/app/src/app/components/ticket-preview/ticket-preview.component';
import {
  EditLetterHeadForm,
  Letterhead,
  editLetterHeadForm,
} from './printer-config.type';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HeaderAppComponent } from '@komandero/web-share';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    TicketPreviewComponent,
    DropdownModule,
    ButtonModule,
    AccordionModule,
    ConfirmDialogModule,
    HeaderAppComponent,
  ],
  templateUrl: './printer-config.page.html',
  styleUrl: './printer-config.page.scss',
  providers: [ConfirmationService, MessageService],
})
export class PrinterConfigPage {
  public form_printer = new FormBuilder().group({
    letters_head: new FormArray<EditLetterHeadForm>([]),
  });

  public loading: boolean = false;
  public segment_selected: 'form' | 'preview' | '' = '';
  public mobile: boolean = false;
  public active_index: number = 0;

  private _letterhead: Letterhead = [];
  public organization_name: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  ionViewWillEnter() {
    this.load_letter_head();
    this.detectScreenSize();
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name;
    } catch (error) {}
  }

  detectScreenSize() {
    const width = window.innerWidth;

    this.mobile = width <= 768;

    if (!this.mobile) return;

    this.segment_selected = 'form';
  }

  change_segment(event: any) {
    this.segment_selected = event.detail.value;
  }

  private get_organization_id() {
    return get_organization_id(this._route);
  }

  async load_letter_head() {
    this.loading = true;
    const id = this.get_organization_id();

    (this.form_printer.get('letters_head') as FormArray).clear();

    try {
      const { letterhead } = await clientOrganizationTrpc.get_letterhead.mutate(
        {
          id,
        }
      );

      this.get_organization_name(id);
      this._letterhead = letterhead;

      this.set_form(letterhead);
    } catch (error) {}
    this.loading = false;
  }

  letter_head_controls() {
    const form_printer = this.form_printer.get('letters_head') as FormArray;
    return form_printer.controls as FormGroup[];
  }

  get letter_head() {
    return this.form_printer.value.letters_head;
  }

  private set_form(letterhead: Letterhead) {
    letterhead.forEach((letter: any) => {
      const form = editLetterHeadForm();
      form.patchValue(letter);
      (this.form_printer.get('letters_head') as FormArray).push(form);
    });
  }

  public create_form_printer_if_not_exist() {
    const form = editLetterHeadForm();
    (this.form_printer.get('letters_head') as FormArray).push(form);
  }

  goBack() {
    this._router.navigate([
      'authenticated',
      'admin',
      'organizations',
      this.get_organization_id(),
    ]);
  }

  delete_line_form(i: number) {
    (this.form_printer.get('letters_head') as FormArray).removeAt(i);
  }

  add_line_form(i: number) {
    const formArray = this.form_printer.get('letters_head') as FormArray;
    const index = i < 0 ? 0 : i >= formArray.length ? formArray.length : i;

    formArray.insert(index, editLetterHeadForm());
    this.active_index = index;
  }

  reset() {
    (this.form_printer.get('letters_head') as FormArray).clear();
    this.set_form(this._letterhead);
  }

  confirm_save() {
    this._confirmationService.confirm({
      message: '¿Está seguro que desea guardar los cambios?',
      header: 'Guardar Cambios',
      icon: 'pi pi-check',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.save();
      },
    });
  }

  async save() {
    if (this.form_printer.invalid) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
      return;
    }

    const data = {
      id: this.get_organization_id(),
      letterhead: this.form_printer.get('letters_head')?.value,
    };

    try {
      await clientOrganizationTrpc.update_letterhead.mutate(data);
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

  select_line(index: number) {
    this.active_index = index;
  }
}
