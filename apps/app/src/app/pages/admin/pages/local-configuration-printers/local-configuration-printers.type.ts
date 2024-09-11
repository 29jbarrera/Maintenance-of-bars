import { FormArray, FormControl, Validators } from '@angular/forms';
import { TypedFormGroup, validateUUID } from '@komandero/web-share';

export interface LocalConfigurationPrinter {
  organization: string;
  printers: string[];
  factor_correction: number;
  device01: string;
  device02: string;
  encoding: string;
  open_cashdraw: boolean;
}

export type LocalConfigurationPrinterForm =
  TypedFormGroup<LocalConfigurationPrinter>;

export function localConfigurationPrinterForm(): LocalConfigurationPrinterForm {
  return new TypedFormGroup<LocalConfigurationPrinter>({
    organization: new FormControl('', [Validators.required, validateUUID]),
    printers: new FormArray([
      new FormControl('cash', [Validators.required, Validators.minLength(3)]),
      new FormControl('all', [Validators.required, Validators.minLength(3)]),
    ]),
    factor_correction: new FormControl(0.05, Validators.required),
    device01: new FormControl('0x0456', Validators.required),
    device02: new FormControl('0x0808', Validators.required),
    encoding: new FormControl('macintosh', Validators.required),
    open_cashdraw: new FormControl(false, Validators.required),
  });
}
