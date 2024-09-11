import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@komandero/server';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { url } from './config';

export const clientTrpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
      headers() {
        const token = localStorage.getItem('it');
        const authorization = token ? `Bearer ${token}` : '';
        return {
          authorization,
        };
      },
    }),
  ],
});

export const clientAdminTrpc = clientTrpc.admin;
export const clientOrganizationTrpc = clientTrpc.organizations;
export type TRPCOutput = inferRouterOutputs<AppRouter>;
export type TRPCInput = inferRouterInputs<AppRouter>;
