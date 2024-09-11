import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { getFormErrorMessage, isFormFieldInvalid } from '@komandero/web-share';
import { oidokocinaConfigForm } from '../../oidokocina-admin.type';

@Component({
  selector: 'app-oidokocina-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './oidokocina-form.component.html',
  styleUrl: './oidokocina-form.component.scss',
})
export class OidokocinaFormComponent {
  @Input() form_oidokocina = oidokocinaConfigForm();

  public input_password: 'text' | 'password' = 'password';

  change_view_password() {
    if (this.input_password === 'password') {
      this.input_password = 'text';
    } else {
      this.input_password = 'password';
    }
  }

  getFormErrorMessage(name: string) {
    return getFormErrorMessage(name, this.form_oidokocina);
  }

  isFormFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.form_oidokocina);
  }
}
