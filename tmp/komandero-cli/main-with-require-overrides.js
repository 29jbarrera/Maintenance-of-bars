
/**
 * IMPORTANT: Do not modify this file.
 * This file allows the app to run without bundling in workspace libraries.
 * Must be contained in the ".nx" folder inside the output path.
 */
const Module = require('module');
const path = require('path');
const fs = require('fs');
const originalResolveFilename = Module._resolveFilename;
const distPath = __dirname;
const manifest = [{"module":"@komandero/clientTRPC","exactMatch":"apps/app/src/app/clientTrpc.js","pattern":"apps/app/src/app/clientTrpc.ts"},{"module":"@komandero/commons","exactMatch":"libs/commons/src/index.js","pattern":"libs/commons/src/index.ts"},{"module":"@komandero/prisma","exactMatch":"libs/server/src/lib/prisma.js","pattern":"libs/server/src/lib/prisma.ts"},{"module":"@komandero/server","exactMatch":"libs/server/src/index.js","pattern":"libs/server/src/index.ts"},{"module":"@komandero/serverTRPC","exactMatch":"libs/server/src/lib/trpc/utils/index.js","pattern":"libs/server/src/lib/trpc/utils/index.ts"},{"module":"@komandero/utils","exactMatch":"apps/app/src/app/utils.js","pattern":"apps/app/src/app/utils.ts"},{"module":"@komandero/web-share","pattern":"apps/app/src/app/components/shared"}];

Module._resolveFilename = function(request, parent) {
  let found;
  for (const entry of manifest) {
    if (request === entry.module && entry.exactMatch) {
      const entry = manifest.find((x) => request === x.module || request.startsWith(x.module + "/"));
      const candidate = path.join(distPath, entry.exactMatch);
      if (isFile(candidate)) {
        found = candidate;
        break;
      }
    } else {
      const re = new RegExp(entry.module.replace(/\*$/, "(?<rest>.*)"));
      const match = request.match(re);

      if (match?.groups) {
        const candidate = path.join(distPath, entry.pattern.replace("*", ""), match.groups.rest);
        if (isFile(candidate)) {
          found = candidate;
        }
      }

    }
  }
  if (found) {
    const modifiedArguments = [found, ...[].slice.call(arguments, 1)];
    return originalResolveFilename.apply(this, modifiedArguments);
  } else {
    return originalResolveFilename.apply(this, arguments);
  }
};

function isFile(s) {
  try {
    require.resolve(s);
    return true;
  } catch (_e) {
    return false;
  }
}

// Call the user-defined main.
require('./apps/komandero-cli/src/main.js');
