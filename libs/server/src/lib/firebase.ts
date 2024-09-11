import { cert } from 'firebase-admin/app';
import * as firebase_admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { sendMessageMarkdown } from './notifications';
import { prisma } from './prisma';

export let admin: firebase_admin.app.App;

try {
  const serviceAccount = JSON.parse(
    readFileSync('firebase-private-key.json', 'utf8')
  );
  admin = firebase_admin.initializeApp({
    credential: cert(serviceAccount),
  });
  // admin
  //   .auth()
  //   .getUserByEmail('damian@kissandcode.com')
  // .then((d) => console.log(d.displayName));
} catch (error) {
  console.error('Firebase no inicializado');
}

export async function create_user(data: {
  displayName: string;
  email: string;
  password: string;
}) {
  const { displayName, email, password } = data;

  // Check if exists
  const user = await admin
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
  const newUser = await admin.auth().createUser({
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

  await sendMessageMarkdown(message);

  const user_bbdd_created = await prisma.user.create({
    data: {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      mla: false,
    },
  });

  // Update it
  await prisma.user.update({
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
}
