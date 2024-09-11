"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.encode = exports.decoke_and_verify_token = void 0;
const tslib_1 = require("tslib");
const jose = require("jose");
const privateKey = new TextEncoder().encode(process.env['jwtSecrectKey']);
function decoke_and_verify_token(token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!token)
            return null;
        try {
            const { payload } = yield jose.jwtVerify(token, privateKey, {
                algorithms: ['HS512'],
            });
            return payload;
        }
        catch (error) {
            // console.error(error);
            return null;
        }
    });
}
exports.decoke_and_verify_token = decoke_and_verify_token;
function encode(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const token = yield new jose.SignJWT(data)
            .setProtectedHeader({
            alg: 'HS512',
        })
            .sign(privateKey);
        return token;
    });
}
exports.encode = encode;
const bcrypt = require("bcrypt");
const saltRounds = 15;
function hashPassword(password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt.hash(password, saltRounds);
        return hash;
    });
}
exports.hashPassword = hashPassword;
function comparePassword(password, hash) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const match = yield bcrypt.compare(password, hash);
        return match;
    });
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=decoke-and-verify-token.js.map