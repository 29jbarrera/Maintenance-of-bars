import {
  OK_PEDIDOS,
  OK_TYPE_OF_ORIGIN,
  OK_PEDIDO_BODY,
  OK_PEDIDO_UNO,
} from '@komandero/commons';

export async function obtener_pedidos(
  body: OK_PEDIDO_BODY
): Promise<OK_PEDIDOS> {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288'
  );

  const _body = {
    idEstablecimiento: 288,
    opcion: 2,
    ...body,
    mriders: false,
  };

  const raw = JSON.stringify(_body);

  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://apibar.okbackend.com/api/pedido/buscarPedidos',
    requestOptions
  ).then((response) => response.json());
}

export async function obtener_un_pedido(id: string): Promise<OK_PEDIDO_UNO> {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288'
  );

  const requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://apibar.okbackend.com/api/pedido/findOne?id=${id}&pdto=1`,
    requestOptions
  ).then((response) => response.json());
}

export async function get_token(body: OK_LOGIN_BODY): Promise<OK_LOGIN> {
  const myHeaders = new Headers();
  const raw = JSON.stringify(body);

  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch('https://apibar.okbackend.com/auth/local', requestOptions).then(
    (response) => response.json()
  );
}

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
