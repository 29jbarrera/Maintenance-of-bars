import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { decoke_and_verify_token } from './decoke-and-verify-token';
import { prisma } from '@komandero/prisma';
import { user_data } from '@prisma/client';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(' ')[1] ?? '';
      return await decoke_and_verify_token(token);
    }
    return null;
  }
  const user = await getUserFromHeader();

  return {
    user,
  };
}

export function getUserIdFormContext(ctx: Context) {
  if (!ctx || !ctx.user || !ctx.user.id) {
    throw new trpc.TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to do this',
    });
  }
  return ctx.user.id;
}

export type UserDataFromContext = user_data;

export async function getUserFromContext(
  ctx: Context
): Promise<UserDataFromContext> {
  if (!ctx || !ctx.user || !ctx.user.id) {
    throw new trpc.TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to do this',
    });
  }

  const user_id = ctx.user.id;
  // TODO: modificar por user y user data y lanzar errr si el usuario está eliminado.
  const user = await prisma.user_data.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    throw new trpc.TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to do this',
    });
  }
  return user;
}

export type Context = inferAsyncReturnType<typeof createContext>;
