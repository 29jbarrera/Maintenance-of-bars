import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export class TypedFormGroup<T> extends FormGroup {
  override value!: T;
  override controls!: { [key in keyof T]: AbstractControl };
}

// VALIDACION NIF O NIE
export function validateNIF(control: FormControl): ValidationErrors | null {
  const cifPattern = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
  const dniPattern = /^\d{8}[A-Za-z]$/;
  const niePattern = /^[XYZ][0-9]{7}[A-Z]$/i;

  if (!control.value) return null;

  const value = control.value.trim();

  if (!value) {
    return { nif: true };
  }

  if (cifPattern.test(value)) {
    console.error('TODO - Validar CIF');
    return null;
  } else if (dniPattern.test(value)) {
    // Si es un DNI, verificamos la letra
    const dni = value.substring(0, 8);
    const letra = value.charAt(8).toUpperCase();
    const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraCalculada = letrasValidas.charAt(parseInt(dni, 10) % 23);

    if (letra === letraCalculada) {
      return null;
    } else {
      return { nif: true };
    }
  } else if (niePattern.test(value)) {
    // Si es un NIE, verificamos la letra
    const letra_inicial = value.charAt(0).toUpperCase();
    const nie = value.substring(1, 8);
    const letra = value.charAt(8).toUpperCase();
    const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';

    const letraMapeo: any = { X: 0, Y: 1, Z: 2 };
    const letra_a_numero =
      letraMapeo[letra_inicial] !== undefined ? letraMapeo[letra_inicial] : -1;

    const letraCalculada = letrasValidas.charAt(
      parseInt(String(letra_a_numero).concat(nie)) % 23
    );

    if (letra === letraCalculada) {
      return null;
    } else {
      return { nif: true };
    }
  } else {
    return { nif: true };
  }
}

// -----------------------------------------------------
export function validateUUID(control: FormControl): ValidationErrors | null {
  if (!control.value) return null;

  const value = control.value.trim();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!value) {
    return { required: true };
  }

  if (!uuidRegex.test(value)) {
    return { invalid_uuid: true };
  }

  return null;
}

// COMPROBAR SI EL FORMULARIO ES VÁLIDO
export function isFormFieldInvalid(name: string, form: FormGroup) {
  const field = form.get(name);
  return !!field?.invalid && !!field?.touched;
}

// OBTENER MENSAJE DE ERROR
export function getFormErrorMessage(name: string, form: FormGroup) {
  const field = form.get(name);
  const errors = field?.errors;

  const errorMessages: { [key: string]: string | ((error: any) => string) } = {
    required: 'Este campo es requerido',
    invalid_uuid: 'Debe ser un UUID válido',
    invalidEmail: 'Formato de email inválido',
    password: 'Las contraseñas no coinciden',
    exist: 'Este ID no está disponible',
    min: (error:any) => `El Mínimo es ${error.min}`,
    minlength: (error: any) => `Mínimo ${error.requiredLength} caracteres`,
  };

  for (const key in errors) {
    if (field?.touched && errors.hasOwnProperty(key) && key in errorMessages) {
      const errorMessage = errorMessages[key];
      return typeof errorMessage === 'function'
        ? errorMessage(errors[key])
        : errorMessage;
    }
  }

  return '';
}
