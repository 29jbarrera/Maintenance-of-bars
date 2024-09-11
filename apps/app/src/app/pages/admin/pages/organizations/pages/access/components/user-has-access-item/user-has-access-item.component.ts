import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppRol, AppRoles, UserHasAccess } from '../../types';
import { PillCheckboxComponent } from 'apps/app/src/app/components/shared/pill-checkbox-component/pill-checkbox-component.component';

@Component({
  selector: 'app-user-has-access-item',
  standalone: true,
  imports: [CommonModule, IonicModule, PillCheckboxComponent],
  templateUrl: './user-has-access-item.component.html',
  styleUrl: './user-has-access-item.component.scss',
})
export class UserHasAccessItemComponent {
  @Input() user_has_access!: UserHasAccess;
  @Input() appRoles: AppRoles = [];
  @Output() toggleRole: EventEmitter<any> = new EventEmitter<any>();

  get_if_user_has_access_to(_role: AppRol) {

    const roles_user_in_organizations =
      this.user_has_access?.user.user_has_role_in_organization;
    
    if (!roles_user_in_organizations) return;

    const user_with_role_in_organization = roles_user_in_organizations?.find(
      (user_role) => {
        const the_roles_coincides = user_role.role === _role.name;
        const is_not_disabled = !user_role.disabled;

        const has_roles = is_not_disabled && the_roles_coincides;
        return has_roles;
      }
    );
    return !!user_with_role_in_organization;
  }

  add_or_remove(_role: AppRol) {

    const _data = {
      u_id: this.user_has_access?.u_id,
      role: _role.name,
    };

    this.toggleRole.emit(_data);
  }
}
