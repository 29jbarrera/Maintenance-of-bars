var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));
var import_server = require("@komandero/server");
var import_script = require("./script");
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ? Number(process.env.PORT) : 3e3;
const app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
app.use(
  "/api/kissandcode",
  trpcExpress.createExpressMiddleware({
    router: import_server.appRouter,
    createContext: import_server.createContext
  })
);
//# sourceMappingURL=main.js.map
