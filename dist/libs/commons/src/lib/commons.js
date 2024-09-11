"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cent_to_eur_format = exports.eur_to_cent = exports.cent_to_eur = exports.format_price_amount = exports.checkStatus = exports.STATUS_TYPE = exports.stringOneIncludeInStringTwo = exports.normaliceString = exports.getNameOfAllergen = exports.getIconOfModuleHomeAdmin = void 0;
const ICONS_MODULES = {
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
function getIconOfModuleHomeAdmin(icon) {
    return ICONS_MODULES[icon];
}
exports.getIconOfModuleHomeAdmin = getIconOfModuleHomeAdmin;
const ALLERGENS = {
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
function getNameOfAllergen(id) {
    return ALLERGENS[id] || '';
}
exports.getNameOfAllergen = getNameOfAllergen;
// Función que normaliza una cadena de texto
function normaliceString(str) {
    return (str
        // Separa los caracteres diacríticos de sus letras base
        .normalize('NFD')
        // Elimina los caracteres diacríticos que no están en la lista de caracteres de combinación de diacríticos del idioma español
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
        // Combina los caracteres diacríticos con sus letras base nuevamente
        .normalize());
}
exports.normaliceString = normaliceString;
// Función que verifica si una cadena de texto está incluida en otra
function stringOneIncludeInStringTwo(str1 = '', str2 = '') {
    // Normaliza y convierte a minúsculas la cadena str1
    const _str1 = normaliceString(str1).trim().toLowerCase();
    // Normaliza y convierte a minúsculas la cadena str2
    const _str2 = normaliceString(str2).trim().toLowerCase();
    // Verifica si la cadena str1 está incluida en la cadena str2
    return _str2.includes(_str1);
}
exports.stringOneIncludeInStringTwo = stringOneIncludeInStringTwo;
exports.STATUS_TYPE = ['PENDIENTE', 'PREPARADO', 'LISTO'];
function checkStatus(status, exist) {
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
exports.checkStatus = checkStatus;
function format_price_amount(amount) {
    return amount.toFixed(2).replace('.', ',');
}
exports.format_price_amount = format_price_amount;
function cent_to_eur(amount) {
    return amount / 100;
}
exports.cent_to_eur = cent_to_eur;
function eur_to_cent(amount) {
    return Math.round(amount * 100);
}
exports.eur_to_cent = eur_to_cent;
function cent_to_eur_format(amount) {
    return format_price_amount(cent_to_eur(amount));
}
exports.cent_to_eur_format = cent_to_eur_format;
//# sourceMappingURL=commons.js.map