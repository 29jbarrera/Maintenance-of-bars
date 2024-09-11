import { prisma } from '@komandero/prisma';

const USERS_ADMIN = ['damian@kissandcode.com'];

export async function is_admin_user(user_id: string) {
  return true;
  //   TODO: Implementar
  //   const user = await prisma.user.findFirst({
  //     where: { email: { in: USERS_ADMIN }, id: user_id },
  //   });
  //   if (user) {
  //     return true;
  //   }
  //   return false;
}

export async function get_users_admin_ids() {
  const users = await prisma.user.findMany({
    where: { email: { in: USERS_ADMIN } },
  });
  return users.map((user) => user.id);
}
