import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { clientAdminTrpc } from '@komandero/clientTRPC';
import { UserTable, UsersTable } from './types';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalUserViewComponent } from './components/modal-user-view.component/modal-user-view.component';
import { ModalUserAddComponent } from './components/modal-user-add.component/modal-user-add.component';
import { HeaderAppComponent } from '@komandero/web-share';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    TableModule,
    ButtonModule,
    HeaderAppComponent,
  ],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UsersPage {
  users: UsersTable = [];

  @ViewChild('dt') dt!: Table;

  constructor(public modalController: ModalController) {}

  ionViewWillEnter() {
    this.load_users();
  }

  private async load_users() {
    const { users } = await clientAdminTrpc.users.get_users.query();
    this.users = users;
  }

  async view_user(id: UserTable['id']) {
    const modal = await this.modalController.create({
      component: ModalUserViewComponent,
      backdropDismiss: false,
      componentProps: {
        id
      },
      mode: 'ios',
    });

    await modal.present();
  }

  async view_modal_add_user() {
    const modal = await this.modalController.create({
      component: ModalUserAddComponent,
      backdropDismiss: false,
      mode: 'ios',
    });

    await modal.present();
  }
}
