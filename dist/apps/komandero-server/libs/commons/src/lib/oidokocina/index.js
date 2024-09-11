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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var oidokocina_exports = {};
__export(oidokocina_exports, {
  Detalle: () => import_pedido.Detalle,
  Estado: () => import_pedidos.Estado,
  OK_PEDIDOS: () => import_pedidos.OK_PEDIDOS,
  OK_PEDIDO_BODY: () => import_pedidos.OK_PEDIDO_BODY,
  OK_PEDIDO_UNO: () => import_pedido.OK_PEDIDO_UNO,
  Pedido: () => import_pedidos.Pedido,
  ProductoOpciones: () => import_pedido.ProductoOpciones
});
module.exports = __toCommonJS(oidokocina_exports);
__reExport(oidokocina_exports, require("./commons"), module.exports);
var import_pedido = require("./pedido");
var import_pedidos = require("./pedidos");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Detalle,
  Estado,
  OK_PEDIDOS,
  OK_PEDIDO_BODY,
  OK_PEDIDO_UNO,
  Pedido,
  ProductoOpciones,
  ...require("./commons")
});
//# sourceMappingURL=index.js.map
