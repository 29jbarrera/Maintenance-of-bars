// Tipo de entrega
export enum OK_TYPE_OF_DELIVERY {
  TODAS = 0,
  RECOGEN = 1,
  ENVIO_DOMICILIO = 2,
}
export type OK_TYPE_OF_DELIVERY_SELECTION = {
  label: string;
  value: OK_TYPE_OF_DELIVERY;
};

export const types_of_delivery: OK_TYPE_OF_DELIVERY_SELECTION[] = [
  { label: 'Todas', value: OK_TYPE_OF_DELIVERY.TODAS },
  { label: 'Recogen', value: OK_TYPE_OF_DELIVERY.RECOGEN },
  { label: 'Envío a domicilio', value: OK_TYPE_OF_DELIVERY.ENVIO_DOMICILIO },
];

// Tipo de origen
export enum OK_TYPE_OF_ORIGIN {
  TODOS = '',
  APP = 'APP',
  ES = 'ES',
  IN = 'IN',
}
export type OK_TYPE_OF_ORIGIN_SELECTION = {
  label: string;
  value: OK_TYPE_OF_ORIGIN;
};
export const origins: OK_TYPE_OF_ORIGIN_SELECTION[] = [
  { label: 'Todos', value: OK_TYPE_OF_ORIGIN.TODOS },
  { label: 'Por App', value: OK_TYPE_OF_ORIGIN.APP },
  { label: 'Por teléfono', value: OK_TYPE_OF_ORIGIN.ES },
  { label: 'Incidencias', value: OK_TYPE_OF_ORIGIN.IN },
];
export const OK_ORIGIN_ARRAY: OK_TYPE_OF_ORIGIN[] = origins.map((o) => o.value);

// Tipo de pago
export enum OK_TYPE_OF_PAYMENT {
  TODOS = 0,
  EFECTIVO = 1,
  ONLINE = 2,
}
export type OK_TYPE_OF_PAYMENT_SELECTION = {
  label: string;
  value: OK_TYPE_OF_PAYMENT;
};
export const payment_methods: OK_TYPE_OF_PAYMENT_SELECTION[] = [
  { label: 'Todas', value: OK_TYPE_OF_PAYMENT.TODOS },
  { label: 'Efectivo', value: OK_TYPE_OF_PAYMENT.EFECTIVO },
  { label: 'Pago online', value: OK_TYPE_OF_PAYMENT.ONLINE },
];

// Tipo de estado
export enum OK_TYPE_OF_STATE {
  NUEVOS = 1,
  ACEPTADOS = 2,
  PREPARADOS = 3,
  RECHAZADOS = 4,
  ENTREGADOS = 6,
  EN_REPARTO = 7,
}

export type OK_TYPE_OF_STATE_SELECTION = {
  label: string;
  value: OK_TYPE_OF_STATE;
};

export const state: OK_TYPE_OF_STATE_SELECTION[] = [
  { label: 'Nuevos', value: OK_TYPE_OF_STATE.NUEVOS },
  { label: 'Aceptados', value: OK_TYPE_OF_STATE.ACEPTADOS },
  { label: 'Preparados', value: OK_TYPE_OF_STATE.PREPARADOS },
  { label: 'En reparto', value: OK_TYPE_OF_STATE.EN_REPARTO },
  { label: 'Entregados', value: OK_TYPE_OF_STATE.ENTREGADOS },
  { label: 'Rechazados', value: OK_TYPE_OF_STATE.RECHAZADOS },
];

export type FILTER_PEDIDOS = {
  from: Date;
  to: Date;
  status: OK_TYPE_OF_STATE[];
  payment_method: OK_TYPE_OF_PAYMENT;
  types_of_delivery: OK_TYPE_OF_DELIVERY;
  origin: OK_TYPE_OF_ORIGIN;
};

export function initialization_filters() {
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
  } else {
    // Si no es el último día del mes, simplemente incrementar el día
    to = new Date(year, month, day + 1, 5, 0, 0);
  }

  return {
    from,
    to,
    origin: OK_TYPE_OF_ORIGIN.TODOS,
    payment_method: OK_TYPE_OF_PAYMENT.TODOS,
    status: state.map((s) => s.value),
    types_of_delivery: OK_TYPE_OF_DELIVERY.TODAS,
  };
}

// COLOR P-TAG PARA LOS ESTADOS
const SEVERITIES: { [key: string]: string } = {
  NUEVOS: 'new',
  ACEPTADOS: 'warning',
  PREPARADOS: 'secondary',
  EN_REPARTO: 'warning',
  ENTREGADOS: 'success',
  RECHAZADOS: 'dark',
};

export function get_severity_status(code: OK_TYPE_OF_STATE): string {
  const status_name = OK_TYPE_OF_STATE[code];
  return SEVERITIES[status_name];
}

// FORMA DE ENTREGA
export function get_method_delivery(type: string): string {
  return type === 'R' ? 'RECOGEN' : 'ENVIO DOMICILIO';
}

// QUIEN REPARTE
export function get_who_delivery(delivery: string): string {
  return delivery ? delivery : 'Establecimiento';
}

// MÉTODO PAGO
export function get_type_payment_method(payment_method: string) {
  return payment_method === 'EF' ? 'EFECTIVO' : 'PAGO ONLINE';
}
