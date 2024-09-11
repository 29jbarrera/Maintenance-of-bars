import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { user_data } from '@prisma/client';
export declare function createContext({ req, res, }: trpcNext.CreateNextContextOptions): Promise<{
    user: import("./decoke-and-verify-token").JWTDecode | null;
}>;
export declare function getUserIdFormContext(ctx: Context): string;
export type UserDataFromContext = user_data;
export declare function getUserFromContext(ctx: Context): Promise<UserDataFromContext>;
export type Context = inferAsyncReturnType<typeof createContext>;
