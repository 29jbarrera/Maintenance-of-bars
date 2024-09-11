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
var firebase_exports = {};
__export(firebase_exports, {
  admin: () => admin,
  create_user: () => create_user
});
module.exports = __toCommonJS(firebase_exports);
var import_app = require("firebase-admin/app");
var firebase_admin = __toESM(require("firebase-admin"));
var import_fs = require("fs");
var import_notifications = require("./notifications");
var import_prisma = require("./prisma");
let admin;
try {
  const serviceAccount = JSON.parse(
    (0, import_fs.readFileSync)("firebase-private-key.json", "utf8")
  );
  admin = firebase_admin.initializeApp({
    credential: (0, import_app.cert)(serviceAccount)
  });
} catch (error) {
  console.error("Firebase no inicializado");
}
async function create_user(data) {
  const { displayName, email, password } = data;
  const user = await admin.auth().getUserByEmail(email).catch(() => null);
  if (user) {
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      },
      already_exist: true
    };
  }
  const newUser = await admin.auth().createUser({
    displayName,
    email,
    password
  });
  console.log("Usuario creado:", newUser.email);
  console.log("Usuario contrase\xF1a:", password);
  console.log("----------------");
  const message = `Usuario creado`.concat(`
 email: \`\`\`${newUser.email}\`\`\``).concat(`
 contrase\xF1a: \`\`\`${password}\`\`\``);
  await (0, import_notifications.sendMessageMarkdown)(message);
  const user_bbdd_created = await import_prisma.prisma.user.create({
    data: {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      mla: false
    }
  });
  await import_prisma.prisma.user.update({
    where: {
      id: user_bbdd_created.id
    },
    data: {
      claims: {
        "https://hasura.io/jwt/claims": {
          "x-hasura-user-id": user_bbdd_created.id,
          "x-hasura-firebase-id": newUser.uid,
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user", "anonymous"]
        }
      }
    }
  });
  return {
    user: {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName
    },
    already_exist: false
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  admin,
  create_user
});
//# sourceMappingURL=firebase.js.map
