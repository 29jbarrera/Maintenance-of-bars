import { FormControl, Validators } from '@angular/forms';
import { TypedFormGroup } from '@komandero/web-share';

export interface OidokocinaConfig {
  a: number;
  p: string;
  modeloImpresora: number;
  numconfig: number;
  version: string;
  id: string;
  organization_id: string;
}

export type OidokocinaConfigForm = TypedFormGroup<OidokocinaConfig>;

export function oidokocinaConfigForm(): OidokocinaConfigForm {
  return new TypedFormGroup<OidokocinaConfig>({
    a: new FormControl(0, [Validators.required, Validators.min(0)]),
    p: new FormControl('', [Validators.required, Validators.minLength(3)]),
    modeloImpresora: new FormControl(0, [
      Validators.required,
      Validators.minLength(3),
    ]),
    numconfig: new FormControl(0, [Validators.required, Validators.min(0)]),
    version: new FormControl('', [Validators.required, Validators.min(0)]),
    id: new FormControl('', Validators.required),
    organization_id: new FormControl('', Validators.required),
  });
}
