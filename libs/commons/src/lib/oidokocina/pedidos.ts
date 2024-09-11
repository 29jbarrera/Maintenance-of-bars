import {
  OK_TYPE_OF_DELIVERY,
  OK_TYPE_OF_ORIGIN,
  OK_TYPE_OF_PAYMENT,
  OK_TYPE_OF_STATE,
} from './commons';

// Respuesta servidor cuando solicitamos un listado de pedidos
export type OK_PEDIDOS = {
  pedidos: Pedido[];
  totalnumpedidos: number;
  totalNeto: string;
  totalFacturable: string;
  totalEfectivo: string;
  totalCobraReparto: string;
  totalYaPagado: string;
  totalOnline: string;
  mensaje: string;
};

export type Pedido = {
  rechazopedido: any[];
  detalles: any[];
  codigopromocion: any;
  descuento: number;
  importedto: number;
  importedtoenvio: number;
  importedtook: number;
  importedtoenviook: number;
  envioobservaciones: any;
  importeproductos: number;
  importeenvio: number;
  comisionpago: number;
  preciototal: number;
  observaciones: any;
  formapago: string;
  formaentrega: string;
  enviodireccion: any;
  enviocodpostal: any;
  enviomunicipio: any;
  envioprovincia: any;
  fechahoraprograma: any;
  margenentregaprog: any;
  tiempoestimado: number;
  tiempoestimadoest?: number;
  horarespuestaest?: string;
  horaentregaestimada?: string;
  pagado: boolean;
  numeropedidoest: string;
  origen: string;
  cambio: any;
  webparticular: boolean;
  userdeestablec: any;
  horaasignarider: any;
  verider: any;
  quienreparte: any;
  lat: any;
  lon: any;
  repetido?: number;
  prioridad: any;
  tpotrayecto: any;
  tpoentrega: any;
  tpototal: any;
  pminenviofechaped: any;
  id: number;
  createdAt: string;
  updatedAt: string;
  usuario: number;
  establecimiento: Establecimiento;
  estado: Estado;
  factura: any;
  facturatransp: any;
  transferencia: any;
  invitacion: any;
  rider: any;
  pedidoajustado: any;
  updatedBy: number;
  entrada: string;
};

export type Establecimiento = {
  nombre: string;
  email: string;
  imagen: string;
  direccion: string;
  codpostal: string;
  municipio: string;
  provincia: string;
  loclatitud: number;
  loclongitud: number;
  abierto: boolean;
  pedidoonline: boolean;
  enviodomicilio: boolean;
  arecoger: boolean;
  pedidominimo: number;
  importeenvio: number;
  tiempoenvio: number;
  tiempopedido: number;
  codurl: any;
  codigo: string;
  asumecompago: boolean;
  acauto: boolean;
  reiniciarprodagotados: boolean;
  importeenvgratis: any;
  relevancia: number;
  distmax: number;
  versioncarta: number;
  pedmesa: any;
  imgcabecera: any;
  ped1pagoonline: any;
  fechabaja: any;
  horariofestdomingo: boolean;
  cerradohasta: any;
  tiesca: string;
  versioninfob: number;
  reparto: number;
  efectivorepartook: any;
  gestmensajesusu: boolean;
  sumartiempoenvio: any;
  tiempopedsinresp: number;
  llamadaauto: boolean;
  programapedidos: boolean;
  solopedidosprogenv: any;
  margenentregasprogenv: number;
  margenentregasprogrec: number;
  progantelacion: any;
  imglistado: any;
  emailavisopednormales: any;
  emailavisopedprogr: any;
  emailresumenpedprog: any;
  emailavisopedsinresponder: any;
  edcarta: any;
  siempreabierto: any;
  distpedidos: any;
  uuid: any;
  puedeAjustar: any;
  usaSemaforo: any;
  id: number;
  cliente: any;
  tipoestablecimiento: number;
  infoalergenoest: number;
  zona: any;
  sector: number;
};

export type Estado = {
  codigo: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
  id: number;
};

export type OK_PEDIDO_BODY = {
  fechaini: string;
  fechafin: string;
  estado: OK_TYPE_OF_STATE[];
  formaPago: OK_TYPE_OF_PAYMENT;
  formaEntrega: OK_TYPE_OF_DELIVERY;
  origen: OK_TYPE_OF_ORIGIN;
};
