"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_token = exports.obtener_un_pedido = exports.obtener_pedidos = void 0;
const tslib_1 = require("tslib");
function obtener_pedidos(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288');
        const _body = Object.assign(Object.assign({ idEstablecimiento: 288, opcion: 2 }, body), { mriders: false });
        const raw = JSON.stringify(_body);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        return fetch('https://apibar.okbackend.com/api/pedido/buscarPedidos', requestOptions).then((response) => response.json());
    });
}
exports.obtener_pedidos = obtener_pedidos;
function obtener_un_pedido(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjQwNjEzLCJyb2xlIjp7ImJpdE1hc2siOjQsInRpdGxlIjoiYWRtaW4iLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIn0sImlhdCI6MTcyMjIzNjUzOX0.mUl0VxHsbFid0Osd7ZfRM-7Ejb5dnVTt4jRr6aaziVA 288');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch(`https://apibar.okbackend.com/api/pedido/findOne?id=${id}&pdto=1`, requestOptions).then((response) => response.json());
    });
}
exports.obtener_un_pedido = obtener_un_pedido;
function get_token(body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const myHeaders = new Headers();
        const raw = JSON.stringify(body);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        return fetch('https://apibar.okbackend.com/auth/local', requestOptions).then((response) => response.json());
    });
}
exports.get_token = get_token;
//# sourceMappingURL=integration.js.map