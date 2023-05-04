'use strict';

import { exec } from 'child_process';
import { config } from 'dotenv';
import updateDotenv from 'update-dotenv';
import chalk from 'chalk';

async function updateEnv() {
  if (process.argv.length > 2) {
    await updateDotenv({
      HOST: process.argv[2],
    }).then((env) => {
      console.log('New env:', env);
    });
  }
}

async function updateUrl(apiKey, appUrl, redirectUrls) {
  await new Promise((resolve, reject) => {
    const updateCmd = exec(`npm run shopify app update-url -- --api-key=${apiKey} --app-url=${appUrl} --redirect-urls=${redirectUrls}`);
    updateCmd.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    updateCmd.stderr.on('data', (err) => {
      reject(err)
    });
    updateCmd.on('close', (code) => {
      resolve(code);
    });
  });
}

(async function main() {
  await updateEnv();

  config();

  const apiKey = process.env.SHOPIFY_API_KEY;
  const appUrl = process.env.HOST;
  const redirectUrls = `${appUrl}/api/online/auth,${appUrl}/api/online/callback,${appUrl}/api/offline/auth,${appUrl}/api/offline/callback`;

  try {
    await updateUrl(apiKey, appUrl, redirectUrls);
  } catch (error) {
    const updateCmd = `npm run shopify app update-url -- --api-key=${apiKey} --app-url=${appUrl} --redirect-urls=${redirectUrls}`
    console.log(chalk.red('You haven\'t logged in to Shopify CLI!'))
    console.log(chalk.yellow(`\nplease run command:\n`))
    console.log(chalk.green(`${updateCmd}\n\n`))
  }
})();
