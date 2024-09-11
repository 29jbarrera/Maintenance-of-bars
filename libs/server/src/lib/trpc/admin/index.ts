import {
  router,
} from '@komandero/serverTRPC';
import { users } from './users';
import { organizations } from './organizations';
import { app_configs } from './app-configs';

export const admin = router({
  users,
  organizations,
  app_configs
});