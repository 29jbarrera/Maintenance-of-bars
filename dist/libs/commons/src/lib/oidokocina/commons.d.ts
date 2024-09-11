export declare enum OK_TYPE_OF_DELIVERY {
    TODAS = 0,
    RECOGEN = 1,
    ENVIO_DOMICILIO = 2
}
export type OK_TYPE_OF_DELIVERY_SELECTION = {
    label: string;
    value: OK_TYPE_OF_DELIVERY;
};
export declare const types_of_delivery: OK_TYPE_OF_DELIVERY_SELECTION[];
export declare enum OK_TYPE_OF_ORIGIN {
    TODOS = "",
    APP = "APP",
    ES = "ES",
    IN = "IN"
}
export type OK_TYPE_OF_ORIGIN_SELECTION = {
    label: string;
    value: OK_TYPE_OF_ORIGIN;
};
export declare const origins: OK_TYPE_OF_ORIGIN_SELECTION[];
export declare const OK_ORIGIN_ARRAY: OK_TYPE_OF_ORIGIN[];
export declare enum OK_TYPE_OF_PAYMENT {
    TODOS = 0,
    EFECTIVO = 1,
    ONLINE = 2
}
export type OK_TYPE_OF_PAYMENT_SELECTION = {
    label: string;
    value: OK_TYPE_OF_PAYMENT;
};
export declare const payment_methods: OK_TYPE_OF_PAYMENT_SELECTION[];
export declare enum OK_TYPE_OF_STATE {
    NUEVOS = 1,
    ACEPTADOS = 2,
    PREPARADOS = 3,
    RECHAZADOS = 4,
    ENTREGADOS = 6,
    EN_REPARTO = 7
}
export type OK_TYPE_OF_STATE_SELECTION = {
    label: string;
    value: OK_TYPE_OF_STATE;
};
export declare const state: OK_TYPE_OF_STATE_SELECTION[];
export type FILTER_PEDIDOS = {
    from: Date;
    to: Date;
    status: OK_TYPE_OF_STATE[];
    payment_method: OK_TYPE_OF_PAYMENT;
    types_of_delivery: OK_TYPE_OF_DELIVERY;
    origin: OK_TYPE_OF_ORIGIN;
};
export declare function initialization_filters(): {
    from: Date;
    to: Date;
    origin: OK_TYPE_OF_ORIGIN;
    payment_method: OK_TYPE_OF_PAYMENT;
    status: OK_TYPE_OF_STATE[];
    types_of_delivery: OK_TYPE_OF_DELIVERY;
};
export declare function get_severity_status(code: OK_TYPE_OF_STATE): string;
export declare function get_method_delivery(type: string): string;
export declare function get_who_delivery(delivery: string): string;
export declare function get_type_payment_method(payment_method: string): "EFECTIVO" | "PAGO ONLINE";
