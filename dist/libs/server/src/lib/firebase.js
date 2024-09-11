"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_user = exports.admin = void 0;
const tslib_1 = require("tslib");
const app_1 = require("firebase-admin/app");
const firebase_admin = require("firebase-admin");
const fs_1 = require("fs");
const notifications_1 = require("./notifications");
const prisma_1 = require("./prisma");
try {
    const serviceAccount = JSON.parse((0, fs_1.readFileSync)('firebase-private-key.json', 'utf8'));
    exports.admin = firebase_admin.initializeApp({
        credential: (0, app_1.cert)(serviceAccount),
    });
    // admin
    //   .auth()
    //   .getUserByEmail('damian@kissandcode.com')
    // .then((d) => console.log(d.displayName));
}
catch (error) {
    console.error('Firebase no inicializado');
}
function create_user(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { displayName, email, password } = data;
        // Check if exists
        const user = yield exports.admin
            .auth()
            .getUserByEmail(email)
            .catch(() => null);
        if (user) {
            return {
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                },
                already_exist: true,
            };
        }
        // Create and notify
        const newUser = yield exports.admin.auth().createUser({
            displayName,
            email,
            password,
        });
        console.log('Usuario creado:', newUser.email);
        console.log('Usuario contraseña:', password);
        console.log('----------------');
        const message = `Usuario creado`
            .concat(`\n email: \`\`\`${newUser.email}\`\`\``)
            .concat(`\n contraseña: \`\`\`${password}\`\`\``);
        yield (0, notifications_1.sendMessageMarkdown)(message);
        const user_bbdd_created = yield prisma_1.prisma.user.create({
            data: {
                uid: newUser.uid,
                email: newUser.email,
                displayName: newUser.displayName,
                mla: false,
            },
        });
        // Update it
        yield prisma_1.prisma.user.update({
            where: {
                id: user_bbdd_created.id,
            },
            data: {
                claims: {
                    'https://hasura.io/jwt/claims': {
                        'x-hasura-user-id': user_bbdd_created.id,
                        'x-hasura-firebase-id': newUser.uid,
                        'x-hasura-default-role': 'user',
                        'x-hasura-allowed-roles': ['user', 'anonymous'],
                    },
                },
            },
        });
        return {
            user: {
                uid: newUser.uid,
                email: newUser.email,
                displayName: newUser.displayName,
            },
            already_exist: false,
        };
    });
}
exports.create_user = create_user;
//# sourceMappingURL=firebase.js.map