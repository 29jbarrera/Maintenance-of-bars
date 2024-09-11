import { isDevMode } from '@angular/core';

export const url = isDevMode()
  ? 'http://localhost:3000/api/kissandcode'
  : 'http://localhost:3000/api/kissandcode';
