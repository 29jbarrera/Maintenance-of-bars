import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { HeaderAppComponent } from '@komandero/web-share';
import { localConfigurationPrinterForm } from './local-configuration-printers.type';
import {
  FormArray,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormConfigurationPrinterComponent } from './components/form-configuration-printer/form-configuration-printer.component';


@Component({
  selector: 'app-local-configuration-printers',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    InputSwitchModule,
    InputTextareaModule,
    ToggleButtonModule,
    FormConfigurationPrinterComponent
  ],
  templateUrl: './local-configuration-printers.page.html',
  styleUrl: './local-configuration-printers.page.scss',
  providers: [MessageService],

})
export class LocalConfigurationPrintersPage {
  public form_local_configuration_printers = localConfigurationPrinterForm();

  public json_input: string = '';
  public can_to_load_json: boolean = false;
  public error_not_json: string = '';

  constructor(
    private loadingController: LoadingController,
    private _messageService: MessageService,
  ) {}

  enable_charge_JSON() {
    this.can_to_load_json = !this.can_to_load_json;
  }

  clean_charge_JSON(){
    this.error_not_json = '';
    this.json_input = '';
  }

  charge_JSON() {
    this.error_not_json = '';

    if (!this.json_input.length) return;

    try {
      const json = JSON.parse(this.json_input);

      const {
        organization,
        printers,
        factor_correction,
        device01,
        device02,
        encoding,
        open_cashdraw,
      } = json;

      this.form_local_configuration_printers.patchValue({
        organization,
        printers: this.set_form_printers(printers),
        factor_correction,
        device01,
        device02,
        encoding,
        open_cashdraw,
      });

      Object.keys(this.form_local_configuration_printers.controls).forEach(
        (key: string) => {
          const control = this.form_local_configuration_printers.get(key);
          if (control) {
            control.markAsTouched();
            control.markAsDirty();
          }
        }
      );
    } catch (error) {
      this.error_not_json = 'El texto introducido no se puede convertir a JSON';
    }
  }

  private set_form_printers(printers: any) {
    const form_printers = this.form_local_configuration_printers.get(
      'printers'
    ) as FormArray;
    form_printers.clear();

    printers.forEach((printer: string) => {
      form_printers.push(
        new FormControl(printer, [Validators.required, Validators.minLength(3)])
      );
    });
  }

  get printers() {
    return this.form_local_configuration_printers.value.printers;
  }

  add_printer() {
    const form_printer = this.form_local_configuration_printers.get(
      'printers'
    ) as FormArray;

    form_printer.push(
      new FormControl('', [Validators.required, Validators.minLength(3)])
    );
  }

  remove_printer(i: number) {
    (
      this.form_local_configuration_printers.get('printers') as FormArray
    ).removeAt(i);
  }

  async downloadJSON() {
    const loading = await this.loadingController.create({
      message: 'Descargando JSON...',
      backdropDismiss: false,
      duration: 0,
    });
    await loading.present();

    try {
      const jsonData = this.form_local_configuration_printers.value;
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'configuration.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {}

    await loading.dismiss();
  }

  async copyToClipBoard() {
    const jsonData = this.form_local_configuration_printers.value;
    const jsonString = JSON.stringify(jsonData, null, 2);

    this._messageService.add({
      severity: 'success',
      summary: 'Completado',
      detail: 'JSON copiado al portapapeles',
    });

    navigator.clipboard.writeText(jsonString);
  }
}
