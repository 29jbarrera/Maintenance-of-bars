import { FormArray, FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';

export type Commanders =
  TRPCOutput['organizations']['organization_commander']['get_all'];
export type Commander = Commanders[0];

export interface EditCommander {
  name: string;
  order: number;
  print_available: boolean;
  print_name: string;
  status_selected: string[];
  max_time: number;
  name_internals: false;
  notifications: false;
}

export type EditCommanderForm = TypedFormGroup<EditCommander>;

export function editCommanderForm(): EditCommanderForm {
  return new TypedFormGroup<EditCommander>({
    name: new FormControl('', [Validators.required]),
    order: new FormControl('', [Validators.required]),
    print_available: new FormControl(false),
    print_name: new FormControl(''),
    status_selected: new FormArray([new FormControl('')]),
    max_time: new FormControl(0),
    name_internals: new FormControl(false),
    notifications: new FormControl(false),
  });
}
