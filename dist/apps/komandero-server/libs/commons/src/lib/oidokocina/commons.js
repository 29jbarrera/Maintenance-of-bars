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
  OK_ORIGIN_ARRAY: () => OK_ORIGIN_ARRAY,
  OK_TYPE_OF_DELIVERY: () => OK_TYPE_OF_DELIVERY,
  OK_TYPE_OF_ORIGIN: () => OK_TYPE_OF_ORIGIN,
  OK_TYPE_OF_PAYMENT: () => OK_TYPE_OF_PAYMENT,
  OK_TYPE_OF_STATE: () => OK_TYPE_OF_STATE,
  get_method_delivery: () => get_method_delivery,
  get_severity_status: () => get_severity_status,
  get_type_payment_method: () => get_type_payment_method,
  get_who_delivery: () => get_who_delivery,
  initialization_filters: () => initialization_filters,
  origins: () => origins,
  payment_methods: () => payment_methods,
  state: () => state,
  types_of_delivery: () => types_of_delivery
});
module.exports = __toCommonJS(commons_exports);
var OK_TYPE_OF_DELIVERY = /* @__PURE__ */ ((OK_TYPE_OF_DELIVERY2) => {
  OK_TYPE_OF_DELIVERY2[OK_TYPE_OF_DELIVERY2["TODAS"] = 0] = "TODAS";
  OK_TYPE_OF_DELIVERY2[OK_TYPE_OF_DELIVERY2["RECOGEN"] = 1] = "RECOGEN";
  OK_TYPE_OF_DELIVERY2[OK_TYPE_OF_DELIVERY2["ENVIO_DOMICILIO"] = 2] = "ENVIO_DOMICILIO";
  return OK_TYPE_OF_DELIVERY2;
})(OK_TYPE_OF_DELIVERY || {});
const types_of_delivery = [
  { label: "Todas", value: 0 /* TODAS */ },
  { label: "Recogen", value: 1 /* RECOGEN */ },
  { label: "Env\xEDo a domicilio", value: 2 /* ENVIO_DOMICILIO */ }
];
var OK_TYPE_OF_ORIGIN = /* @__PURE__ */ ((OK_TYPE_OF_ORIGIN2) => {
  OK_TYPE_OF_ORIGIN2["TODOS"] = "";
  OK_TYPE_OF_ORIGIN2["APP"] = "APP";
  OK_TYPE_OF_ORIGIN2["ES"] = "ES";
  OK_TYPE_OF_ORIGIN2["IN"] = "IN";
  return OK_TYPE_OF_ORIGIN2;
})(OK_TYPE_OF_ORIGIN || {});
const origins = [
  { label: "Todos", value: "" /* TODOS */ },
  { label: "Por App", value: "APP" /* APP */ },
  { label: "Por tel\xE9fono", value: "ES" /* ES */ },
  { label: "Incidencias", value: "IN" /* IN */ }
];
const OK_ORIGIN_ARRAY = origins.map((o) => o.value);
var OK_TYPE_OF_PAYMENT = /* @__PURE__ */ ((OK_TYPE_OF_PAYMENT2) => {
  OK_TYPE_OF_PAYMENT2[OK_TYPE_OF_PAYMENT2["TODOS"] = 0] = "TODOS";
  OK_TYPE_OF_PAYMENT2[OK_TYPE_OF_PAYMENT2["EFECTIVO"] = 1] = "EFECTIVO";
  OK_TYPE_OF_PAYMENT2[OK_TYPE_OF_PAYMENT2["ONLINE"] = 2] = "ONLINE";
  return OK_TYPE_OF_PAYMENT2;
})(OK_TYPE_OF_PAYMENT || {});
const payment_methods = [
  { label: "Todas", value: 0 /* TODOS */ },
  { label: "Efectivo", value: 1 /* EFECTIVO */ },
  { label: "Pago online", value: 2 /* ONLINE */ }
];
var OK_TYPE_OF_STATE = /* @__PURE__ */ ((OK_TYPE_OF_STATE2) => {
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["NUEVOS"] = 1] = "NUEVOS";
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["ACEPTADOS"] = 2] = "ACEPTADOS";
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["PREPARADOS"] = 3] = "PREPARADOS";
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["RECHAZADOS"] = 4] = "RECHAZADOS";
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["ENTREGADOS"] = 6] = "ENTREGADOS";
  OK_TYPE_OF_STATE2[OK_TYPE_OF_STATE2["EN_REPARTO"] = 7] = "EN_REPARTO";
  return OK_TYPE_OF_STATE2;
})(OK_TYPE_OF_STATE || {});
const state = [
  { label: "Nuevos", value: 1 /* NUEVOS */ },
  { label: "Aceptados", value: 2 /* ACEPTADOS */ },
  { label: "Preparados", value: 3 /* PREPARADOS */ },
  { label: "En reparto", value: 7 /* EN_REPARTO */ },
  { label: "Entregados", value: 6 /* ENTREGADOS */ },
  { label: "Rechazados", value: 4 /* RECHAZADOS */ }
];
function initialization_filters() {
  const now = /* @__PURE__ */ new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const from = new Date(year, month, 1, 5, 0, 0);
  let to;
  if (day === new Date(year, month + 1, 0).getDate()) {
    to = new Date(year, month + 1, 1, 5, 0, 0);
    if (month === 11) {
      to = new Date(year + 1, 0, 1, 5, 0, 0);
    }
  } else {
    to = new Date(year, month, day + 1, 5, 0, 0);
  }
  return {
    from,
    to,
    origin: "" /* TODOS */,
    payment_method: 0 /* TODOS */,
    status: state.map((s) => s.value),
    types_of_delivery: 0 /* TODAS */
  };
}
const SEVERITIES = {
  NUEVOS: "new",
  ACEPTADOS: "warning",
  PREPARADOS: "secondary",
  EN_REPARTO: "warning",
  ENTREGADOS: "success",
  RECHAZADOS: "dark"
};
function get_severity_status(code) {
  const status_name = OK_TYPE_OF_STATE[code];
  return SEVERITIES[status_name];
}
function get_method_delivery(type) {
  return type === "R" ? "RECOGEN" : "ENVIO DOMICILIO";
}
function get_who_delivery(delivery) {
  return delivery ? delivery : "Establecimiento";
}
function get_type_payment_method(payment_method) {
  return payment_method === "EF" ? "EFECTIVO" : "PAGO ONLINE";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OK_ORIGIN_ARRAY,
  OK_TYPE_OF_DELIVERY,
  OK_TYPE_OF_ORIGIN,
  OK_TYPE_OF_PAYMENT,
  OK_TYPE_OF_STATE,
  get_method_delivery,
  get_severity_status,
  get_type_payment_method,
  get_who_delivery,
  initialization_filters,
  origins,
  payment_methods,
  state,
  types_of_delivery
});
//# sourceMappingURL=commons.js.map
