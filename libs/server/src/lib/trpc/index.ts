import { publicProcedure, router } from '@komandero/serverTRPC';
import { admin } from './admin';
import { organizations } from './organizations';

export * from './utils';

export const appRouter = router({
  version: publicProcedure.query(({ ctx }) => {
    return '1.0.0';
  }),
  admin,
  organizations
});

export type AppRouter = typeof appRouter;
