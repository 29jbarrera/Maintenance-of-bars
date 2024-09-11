import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { get_organization_id } from '@komandero/utils';
import { IonicModule } from '@ionic/angular';
import { clientOrganizationTrpc } from '@komandero/clientTRPC';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderAppComponent } from '@komandero/web-share';
import { oidokocinaConfigForm } from './oidokocina-admin.type';
import { OidokocinaFormComponent } from './components/oidokocina-form/oidokocina-form.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-oidokocina-admin',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderAppComponent,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    OidokocinaFormComponent,
  ],
  templateUrl: './oidokocina-admin.page.html',
  styleUrl: './oidokocina-admin.page.scss',
  providers: [MessageService],
})
export class OidokocinaAdminPage {
  public form_oidokocina = oidokocinaConfigForm();
  public input_password: 'text' | 'password' = 'password';
  public organization_name: any;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private _messageService: MessageService
  ) {}

  ionViewWillEnter() {
    this.load_config();
  }

  get_organization_id() {
    return get_organization_id(this._route);
  }

  async get_organization_name(id: string) {
    try {
      const organization =
        await clientOrganizationTrpc.get_organization_name.query({ id });

      this.organization_name = organization?.name;
    } catch (error) {}
  }

  async load_config() {
    const organization_id = this.get_organization_id();
    const config = await clientOrganizationTrpc.oidokocina.get_my_config.mutate(
      {
        organization_id,
      }
    );
    if (config) {
      this.form_oidokocina.patchValue({
        a: config.a,
        p: config.p,
        modeloImpresora: config.modeloImpresora,
        numconfig: config.numconfig,
        version: config.version,
        id: config.id,
        organization_id: config.o_id,
      });
    }
    this.get_organization_name(organization_id);
  }

  async save_config() {
    if (this.form_oidokocina.invalid) {
      Object.keys(this.form_oidokocina.controls).forEach((key: string) => {
        const control = this.form_oidokocina.get(key);
        if (control) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
      return;
    }
    const formValue = this.form_oidokocina.value;
    try {
      this._messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Datos actualizados',
      });
      await clientOrganizationTrpc.oidokocina.save_my_config.mutate(formValue);
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
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
