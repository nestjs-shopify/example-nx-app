'use strict';

import { exec } from 'child_process';
import { config } from 'dotenv';
import updateDotenv from 'update-dotenv';

async function updateEnv() {
  if (process.argv.length > 2) {
    await updateDotenv({
      HOST: process.argv[2],
    }).then((env) => {
      console.log('New env:', env);
    });
  }
}

async function updateUrl() {
  await new Promise((resolve) => {
    const apiKey = process.env.SHOPIFY_API_KEY;
    const appUrl = process.env.HOST;
    const redirectUrls = `${appUrl}/api/online/auth,${appUrl}/api/online/callback,${appUrl}/api/offline/auth,${appUrl}/api/offline/callback`;

    const updateCmd = exec(`npm run shopify app update-url -- --api-key=${apiKey} --app-url=${appUrl} --redirect-urls=${redirectUrls}`);
    updateCmd.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    updateCmd.stderr.on('data', (data) => {
      console.error(`${data}`);
    });
    updateCmd.on('close', (code) => {
      resolve(code);
    });
  });
}

(async function main() {
  await updateEnv();

  config();

  await updateUrl();
})();
