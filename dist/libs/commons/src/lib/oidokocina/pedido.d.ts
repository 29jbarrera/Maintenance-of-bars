export type OK_PEDIDO_UNO = {
    pedido: Pedido;
    detalles: Detalle2[];
    descuentos: any;
    pedidosAnteriores: number;
};
export type Pedido = {
    rechazopedido: any[];
    detalles: Detalle[];
    usuario: Usuario;
    establecimiento: Establecimiento;
    estado: Estado;
    factura: any;
    facturatransp: any;
    transferencia: any;
    invitacion: any;
    rider: any;
    pedidoajustado: any;
    updatedBy: number;
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
    tiempoestimadoest: any;
    horarespuestaest: any;
    horaentregaestimada: any;
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
    repetido: any;
    prioridad: any;
    tpotrayecto: any;
    tpoentrega: any;
    tpototal: any;
    pminenviofechaped: any;
    id: number;
    createdAt: string;
    updatedAt: string;
};
export type Detalle = {
    pedido: number;
    producto: Producto;
    cantidad: number;
    pvpunidad: number;
    incrementopreciototal: number;
    preciototal: number;
    descuento: number;
    observaciones: any;
    id: number;
    textoOpciones: string;
    productoOpciones: ProductoOpciones[];
};
export type ProductoOpciones = {
    nombregrupo: string;
    nombreopcion: string;
    incrementoprecio: number;
    grupo: number;
    id: number;
    pedidodetalle: number;
    multiselec: number;
    cant: number;
    tipoingre: string;
};
export type Producto = {
    categoria: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    pvp: number;
    orden: number;
    tiempo: any;
    nocarro: boolean;
    visible: boolean;
    solorecogen: any;
    fechabaja: any;
    fechahoraagotado: any;
    txtdestacar: string;
    pvpminimoperson: any;
    pvpmaximoperson: any;
    tipo: any;
    pvpproductogrupomascaro: any;
    factorotrosprodgrup: any;
    nocomentacli: boolean;
    versionapp: any;
    donde: any;
    suplementoenvio: boolean;
    userUpdate: any;
    fechaUserUpdate: any;
    id: number;
};
export type Usuario = {
    username: string;
    email: string;
    telefono: string;
    nombre: string;
    apellidos: string;
    sendpush: boolean;
    pushpromos: boolean;
    sendemail: boolean;
    emailpromos: boolean;
    puntos: number;
    tokeninv: any;
    guardartarjetas: boolean;
    bloqueado: any;
    fechabaja: any;
    tipo: any;
    generado: any;
    comentarios: any;
    id: number;
    createdAt: string;
    updatedAt: string;
    role: number;
    establecimiento: any;
    localidad: number;
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
    telefonosMostrar: string;
};
export type Estado = {
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: any;
    id: number;
};
export type Detalle2 = {
    pedido: number;
    producto: Producto2;
    cantidad: number;
    pvpunidad: number;
    incrementopreciototal: number;
    preciototal: number;
    descuento: number;
    observaciones: any;
    id: number;
    textoOpciones: string;
};
export type Producto2 = {
    categoria: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    pvp: number;
    orden: number;
    tiempo: any;
    nocarro: boolean;
    visible: boolean;
    solorecogen: any;
    fechabaja: any;
    fechahoraagotado: any;
    txtdestacar: string;
    pvpminimoperson: any;
    pvpmaximoperson: any;
    tipo: any;
    pvpproductogrupomascaro: any;
    factorotrosprodgrup: any;
    nocomentacli: boolean;
    versionapp: any;
    donde: any;
    suplementoenvio: boolean;
    userUpdate: any;
    fechaUserUpdate: any;
    id: number;
};
