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
var integration_exports = {};
__export(integration_exports, {
  get_token: () => get_token,
  obtener_pedidos: () => obtener_pedidos,
  obtener_un_pedido: () => obtener_un_pedido
});
module.exports = __toCommonJS(integration_exports);
async function obtener_pedidos(body) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288"
  );
  const _body = {
    idEstablecimiento: 288,
    opcion: 2,
    ...body,
    mriders: false
  };
  const raw = JSON.stringify(_body);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  return fetch(
    "https://apibar.okbackend.com/api/pedido/buscarPedidos",
    requestOptions
  ).then((response) => response.json());
}
async function obtener_un_pedido(id) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288"
  );
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  return fetch(
    `https://apibar.okbackend.com/api/pedido/findOne?id=${id}&pdto=1`,
    requestOptions
  ).then((response) => response.json());
}
async function get_token(body) {
  const myHeaders = new Headers();
  const raw = JSON.stringify(body);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  return fetch("https://apibar.okbackend.com/auth/local", requestOptions).then(
    (response) => response.json()
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get_token,
  obtener_pedidos,
  obtener_un_pedido
});
//# sourceMappingURL=integration.js.map
