"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_type_payment_method = exports.get_who_delivery = exports.get_method_delivery = exports.get_severity_status = exports.initialization_filters = exports.state = exports.OK_TYPE_OF_STATE = exports.payment_methods = exports.OK_TYPE_OF_PAYMENT = exports.OK_ORIGIN_ARRAY = exports.origins = exports.OK_TYPE_OF_ORIGIN = exports.types_of_delivery = exports.OK_TYPE_OF_DELIVERY = void 0;
// Tipo de entrega
var OK_TYPE_OF_DELIVERY;
(function (OK_TYPE_OF_DELIVERY) {
    OK_TYPE_OF_DELIVERY[OK_TYPE_OF_DELIVERY["TODAS"] = 0] = "TODAS";
    OK_TYPE_OF_DELIVERY[OK_TYPE_OF_DELIVERY["RECOGEN"] = 1] = "RECOGEN";
    OK_TYPE_OF_DELIVERY[OK_TYPE_OF_DELIVERY["ENVIO_DOMICILIO"] = 2] = "ENVIO_DOMICILIO";
})(OK_TYPE_OF_DELIVERY || (exports.OK_TYPE_OF_DELIVERY = OK_TYPE_OF_DELIVERY = {}));
exports.types_of_delivery = [
    { label: 'Todas', value: OK_TYPE_OF_DELIVERY.TODAS },
    { label: 'Recogen', value: OK_TYPE_OF_DELIVERY.RECOGEN },
    { label: 'Envío a domicilio', value: OK_TYPE_OF_DELIVERY.ENVIO_DOMICILIO },
];
// Tipo de origen
var OK_TYPE_OF_ORIGIN;
(function (OK_TYPE_OF_ORIGIN) {
    OK_TYPE_OF_ORIGIN["TODOS"] = "";
    OK_TYPE_OF_ORIGIN["APP"] = "APP";
    OK_TYPE_OF_ORIGIN["ES"] = "ES";
    OK_TYPE_OF_ORIGIN["IN"] = "IN";
})(OK_TYPE_OF_ORIGIN || (exports.OK_TYPE_OF_ORIGIN = OK_TYPE_OF_ORIGIN = {}));
exports.origins = [
    { label: 'Todos', value: OK_TYPE_OF_ORIGIN.TODOS },
    { label: 'Por App', value: OK_TYPE_OF_ORIGIN.APP },
    { label: 'Por teléfono', value: OK_TYPE_OF_ORIGIN.ES },
    { label: 'Incidencias', value: OK_TYPE_OF_ORIGIN.IN },
];
exports.OK_ORIGIN_ARRAY = exports.origins.map((o) => o.value);
// Tipo de pago
var OK_TYPE_OF_PAYMENT;
(function (OK_TYPE_OF_PAYMENT) {
    OK_TYPE_OF_PAYMENT[OK_TYPE_OF_PAYMENT["TODOS"] = 0] = "TODOS";
    OK_TYPE_OF_PAYMENT[OK_TYPE_OF_PAYMENT["EFECTIVO"] = 1] = "EFECTIVO";
    OK_TYPE_OF_PAYMENT[OK_TYPE_OF_PAYMENT["ONLINE"] = 2] = "ONLINE";
})(OK_TYPE_OF_PAYMENT || (exports.OK_TYPE_OF_PAYMENT = OK_TYPE_OF_PAYMENT = {}));
exports.payment_methods = [
    { label: 'Todas', value: OK_TYPE_OF_PAYMENT.TODOS },
    { label: 'Efectivo', value: OK_TYPE_OF_PAYMENT.EFECTIVO },
    { label: 'Pago online', value: OK_TYPE_OF_PAYMENT.ONLINE },
];
// Tipo de estado
var OK_TYPE_OF_STATE;
(function (OK_TYPE_OF_STATE) {
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["NUEVOS"] = 1] = "NUEVOS";
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["ACEPTADOS"] = 2] = "ACEPTADOS";
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["PREPARADOS"] = 3] = "PREPARADOS";
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["RECHAZADOS"] = 4] = "RECHAZADOS";
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["ENTREGADOS"] = 6] = "ENTREGADOS";
    OK_TYPE_OF_STATE[OK_TYPE_OF_STATE["EN_REPARTO"] = 7] = "EN_REPARTO";
})(OK_TYPE_OF_STATE || (exports.OK_TYPE_OF_STATE = OK_TYPE_OF_STATE = {}));
exports.state = [
    { label: 'Nuevos', value: OK_TYPE_OF_STATE.NUEVOS },
    { label: 'Aceptados', value: OK_TYPE_OF_STATE.ACEPTADOS },
    { label: 'Preparados', value: OK_TYPE_OF_STATE.PREPARADOS },
    { label: 'En reparto', value: OK_TYPE_OF_STATE.EN_REPARTO },
    { label: 'Entregados', value: OK_TYPE_OF_STATE.ENTREGADOS },
    { label: 'Rechazados', value: OK_TYPE_OF_STATE.RECHAZADOS },
];
function initialization_filters() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const from = new Date(year, month, 1, 5, 0, 0);
    let to;
    if (day === new Date(year, month + 1, 0).getDate()) {
        // Si es el último día del mes, incrementar el mes y ajustar el año si es necesario
        to = new Date(year, month + 1, 1, 5, 0, 0);
        if (month === 11) {
            // Si el mes actual es diciembre, ajustar el año también
            to = new Date(year + 1, 0, 1, 5, 0, 0);
        }
    }
    else {
        // Si no es el último día del mes, simplemente incrementar el día
        to = new Date(year, month, day + 1, 5, 0, 0);
    }
    return {
        from,
        to,
        origin: OK_TYPE_OF_ORIGIN.TODOS,
        payment_method: OK_TYPE_OF_PAYMENT.TODOS,
        status: exports.state.map((s) => s.value),
        types_of_delivery: OK_TYPE_OF_DELIVERY.TODAS,
    };
}
exports.initialization_filters = initialization_filters;
// COLOR P-TAG PARA LOS ESTADOS
const SEVERITIES = {
    NUEVOS: 'new',
    ACEPTADOS: 'warning',
    PREPARADOS: 'secondary',
    EN_REPARTO: 'warning',
    ENTREGADOS: 'success',
    RECHAZADOS: 'dark',
};
function get_severity_status(code) {
    const status_name = OK_TYPE_OF_STATE[code];
    return SEVERITIES[status_name];
}
exports.get_severity_status = get_severity_status;
// FORMA DE ENTREGA
function get_method_delivery(type) {
    return type === 'R' ? 'RECOGEN' : 'ENVIO DOMICILIO';
}
exports.get_method_delivery = get_method_delivery;
// QUIEN REPARTE
function get_who_delivery(delivery) {
    return delivery ? delivery : 'Establecimiento';
}
exports.get_who_delivery = get_who_delivery;
// MÉTODO PAGO
function get_type_payment_method(payment_method) {
    return payment_method === 'EF' ? 'EFECTIVO' : 'PAGO ONLINE';
}
exports.get_type_payment_method = get_type_payment_method;
//# sourceMappingURL=commons.js.map