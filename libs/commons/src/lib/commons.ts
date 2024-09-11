export type LetterHead = {
  align: string;
  font: string;
  size_x: number;
  size_y: number;
  style: string;
  text: string;
};

type IconsModulesHomeAdmin = {
  [key: string]: string;
};

type AllergensType = {
  [key: number]: string;
};

const ICONS_MODULES: IconsModulesHomeAdmin = {
  'access': '/assets/icons/menu/access.png',
  'printer-config': '/assets/icons/menu/printer-config.png',
  'product-categories': '/assets/icons/menu/product-categories.png',
  'product-sizes': '/assets/icons/menu/product-sizes.png',
  'products': '/assets/icons/menu/products.png',
  'products-reorder': '/assets/icons/menu/products-reorder.png',
  'commander': '/assets/icons/menu/commander.png',
  'qr': '/assets/icons/menu/qr.png',
  'oidokocina': '/assets/icons/menu/oidokocina.png',
  'organization-oidokocina': '/assets/icons/menu/organization-oidokocina.png',
  'eating-tables-configuration': '/assets/icons/menu/eating-tables-configuration.png',
  'orders': '/assets/icons/menu/orders.png',
  'printer-jobs': '/assets/icons/menu/printer-jobs.png',
  'invoices': '/assets/icons/menu/invoices.png',
  'client': '/assets/icons/menu/client.png',
  'ingredients': '/assets/icons/menu/ingredients.png',
  'ingredients-masive-config': '/assets/icons/menu/ingredients-masive-config.png',
  'configuration-ingredients-product': '/assets/icons/menu/configuration-ingredients-product.png'
};

export function getIconOfModuleHomeAdmin(icon: string) {
  return ICONS_MODULES[icon];
}

const ALLERGENS: AllergensType = {
  1: 'Altramuces',
  2: 'Apio',
  3: 'Cacahuetes',
  4: 'Crustaceo',
  5: 'Dioxido Azufre',
  6: 'Frutos Cascara',
  7: 'Gluten',
  8: 'Huevo',
  9: 'Lacteo',
  10: 'Moluscos',
  11: 'Mostaza',
  12: 'Pescado',
  13: 'Sesamo',
  14: 'Soja',
};

export function getNameOfAllergen(id: number) {
  return ALLERGENS[id] || '';
}

// Función que normaliza una cadena de texto
export function normaliceString(str: string) {
  return (
    str
      // Separa los caracteres diacríticos de sus letras base
      .normalize('NFD')
      // Elimina los caracteres diacríticos que no están en la lista de caracteres de combinación de diacríticos del idioma español
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        '$1'
      )
      // Combina los caracteres diacríticos con sus letras base nuevamente
      .normalize()
  );
}
// Función que verifica si una cadena de texto está incluida en otra
export function stringOneIncludeInStringTwo(str1 = '', str2 = ''): boolean {
  // Normaliza y convierte a minúsculas la cadena str1
  const _str1 = normaliceString(str1).trim().toLowerCase();
  // Normaliza y convierte a minúsculas la cadena str2
  const _str2 = normaliceString(str2).trim().toLowerCase();
  // Verifica si la cadena str1 está incluida en la cadena str2
  return _str2.includes(_str1);
}

export const STATUS_TYPE: string[] = ['PENDIENTE', 'PREPARADO', 'LISTO'];

export function checkStatus(status: string, exist: boolean) {
  const isActive = exist ? 'opacity-full' : 'opacity-light';

  switch (status) {
    case 'PENDIENTE':
      return `pending ${isActive}`;
    case 'PREPARADO':
      return `prepared ${isActive}`;
    case 'LISTO':
      return `ready ${isActive}`;
    default:
      return 'pending opacity-light';
  }
}

export function format_price_amount(amount: number) {
  return amount.toFixed(2).replace('.', ',');
}

export function cent_to_eur(amount: number) {
  return amount / 100;
}

export function eur_to_cent(amount: number) {
  return Math.round(amount * 100);
}

export function cent_to_eur_format(amount: number) {
  return format_price_amount(cent_to_eur(amount));
}
