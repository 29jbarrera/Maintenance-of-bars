import { FormControl, Validators } from '@angular/forms';
import { TRPCOutput } from '@komandero/clientTRPC';
import { TypedFormGroup } from '@komandero/web-share';
export type Letterhead =
  TRPCOutput['organizations']['get_letterhead']['letterhead'];

export interface EditLetterHead {
  align: string;
  font: string;
  size_x: number;
  size_y: number;
  style: string;
  text: string;
}

export type EditLetterHeadForm = TypedFormGroup<EditLetterHead>;

export function editLetterHeadForm(): EditLetterHeadForm {
  return new TypedFormGroup<EditLetterHead>({
    align: new FormControl('ct', [Validators.required]),
    font: new FormControl('a', [Validators.required]),
    size_x: new FormControl(1, [Validators.required]),
    size_y: new FormControl(1, [Validators.required]),
    style: new FormControl('NORMAL', [Validators.required]),
    text: new FormControl('', [Validators.maxLength(48)]),
  });
}
