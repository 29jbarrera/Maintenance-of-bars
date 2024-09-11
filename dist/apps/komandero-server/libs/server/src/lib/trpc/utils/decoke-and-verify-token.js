var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var decoke_and_verify_token_exports = {};
__export(decoke_and_verify_token_exports, {
  comparePassword: () => comparePassword,
  decoke_and_verify_token: () => decoke_and_verify_token,
  encode: () => encode,
  hashPassword: () => hashPassword
});
module.exports = __toCommonJS(decoke_and_verify_token_exports);
var jose = __toESM(require("jose"));
var bcrypt = __toESM(require("bcrypt"));
const privateKey = new TextEncoder().encode(process.env["jwtSecrectKey"]);
async function decoke_and_verify_token(token) {
  if (!token)
    return null;
  try {
    const { payload } = await jose.jwtVerify(token, privateKey, {
      algorithms: ["HS512"]
    });
    return payload;
  } catch (error) {
    return null;
  }
}
async function encode(data) {
  const token = await new jose.SignJWT(data).setProtectedHeader({
    alg: "HS512"
  }).sign(privateKey);
  return token;
}
const saltRounds = 15;
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  comparePassword,
  decoke_and_verify_token,
  encode,
  hashPassword
});
//# sourceMappingURL=decoke-and-verify-token.js.map
