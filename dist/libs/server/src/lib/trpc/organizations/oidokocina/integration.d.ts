import { OK_PEDIDOS, OK_PEDIDO_BODY, OK_PEDIDO_UNO } from '@komandero/commons';
export declare function obtener_pedidos(body: OK_PEDIDO_BODY): Promise<OK_PEDIDOS>;
export declare function obtener_un_pedido(id: string): Promise<OK_PEDIDO_UNO>;
export declare function get_token(body: OK_LOGIN_BODY): Promise<OK_LOGIN>;
export type OK_LOGIN_BODY = {
    identifier: string;
    password: string;
    rememberme: boolean;
};
export type OK_LOGIN = {
    id: number;
    username: string;
    role: Role;
    token: string;
    pp: string;
    tlocal: number;
    est: number;
    nombreEst: string;
    mduEst: boolean;
    permisos: any[];
};
export type Role = {
    bitMask: number;
    title: string;
    nombre: string;
};
