var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var commons_exports = {};
__export(commons_exports, {
  STATUS_TYPE: () => STATUS_TYPE,
  cent_to_eur: () => cent_to_eur,
  cent_to_eur_format: () => cent_to_eur_format,
  checkStatus: () => checkStatus,
  eur_to_cent: () => eur_to_cent,
  format_price_amount: () => format_price_amount,
  getIconOfModuleHomeAdmin: () => getIconOfModuleHomeAdmin,
  getNameOfAllergen: () => getNameOfAllergen,
  normaliceString: () => normaliceString,
  stringOneIncludeInStringTwo: () => stringOneIncludeInStringTwo
});
module.exports = __toCommonJS(commons_exports);
const ICONS_MODULES = {
  "access": "/assets/icons/menu/access.png",
  "printer-config": "/assets/icons/menu/printer-config.png",
  "product-categories": "/assets/icons/menu/product-categories.png",
  "product-sizes": "/assets/icons/menu/product-sizes.png",
  "products": "/assets/icons/menu/products.png",
  "products-reorder": "/assets/icons/menu/products-reorder.png",
  "commander": "/assets/icons/menu/commander.png",
  "qr": "/assets/icons/menu/qr.png",
  "oidokocina": "/assets/icons/menu/oidokocina.png",
  "organization-oidokocina": "/assets/icons/menu/organization-oidokocina.png",
  "eating-tables-configuration": "/assets/icons/menu/eating-tables-configuration.png",
  "orders": "/assets/icons/menu/orders.png",
  "printer-jobs": "/assets/icons/menu/printer-jobs.png",
  "invoices": "/assets/icons/menu/invoices.png",
  "client": "/assets/icons/menu/client.png",
  "ingredients": "/assets/icons/menu/ingredients.png",
  "ingredients-masive-config": "/assets/icons/menu/ingredients-masive-config.png",
  "configuration-ingredients-product": "/assets/icons/menu/configuration-ingredients-product.png"
};
function getIconOfModuleHomeAdmin(icon) {
  return ICONS_MODULES[icon];
}
const ALLERGENS = {
  1: "Altramuces",
  2: "Apio",
  3: "Cacahuetes",
  4: "Crustaceo",
  5: "Dioxido Azufre",
  6: "Frutos Cascara",
  7: "Gluten",
  8: "Huevo",
  9: "Lacteo",
  10: "Moluscos",
  11: "Mostaza",
  12: "Pescado",
  13: "Sesamo",
  14: "Soja"
};
function getNameOfAllergen(id) {
  return ALLERGENS[id] || "";
}
function normaliceString(str) {
  return str.normalize("NFD").replace(
    /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
    "$1"
  ).normalize();
}
function stringOneIncludeInStringTwo(str1 = "", str2 = "") {
  const _str1 = normaliceString(str1).trim().toLowerCase();
  const _str2 = normaliceString(str2).trim().toLowerCase();
  return _str2.includes(_str1);
}
const STATUS_TYPE = ["PENDIENTE", "PREPARADO", "LISTO"];
function checkStatus(status, exist) {
  const isActive = exist ? "opacity-full" : "opacity-light";
  switch (status) {
    case "PENDIENTE":
      return `pending ${isActive}`;
    case "PREPARADO":
      return `prepared ${isActive}`;
    case "LISTO":
      return `ready ${isActive}`;
    default:
      return "pending opacity-light";
  }
}
function format_price_amount(amount) {
  return amount.toFixed(2).replace(".", ",");
}
function cent_to_eur(amount) {
  return amount / 100;
}
function eur_to_cent(amount) {
  return Math.round(amount * 100);
}
function cent_to_eur_format(amount) {
  return format_price_amount(cent_to_eur(amount));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  STATUS_TYPE,
  cent_to_eur,
  cent_to_eur_format,
  checkStatus,
  eur_to_cent,
  format_price_amount,
  getIconOfModuleHomeAdmin,
  getNameOfAllergen,
  normaliceString,
  stringOneIncludeInStringTwo
});
//# sourceMappingURL=commons.js.map
