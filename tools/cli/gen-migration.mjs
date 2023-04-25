'use strict';
import { exec } from 'child_process';

const customIndex = process.argv.indexOf('--name');
let migrationName;

if (customIndex > -1) {
  migrationName = process.argv[customIndex + 1];
}

if (!migrationName || migrationName == undefined) {
  console.error('name is required');
} else {
  exec(
    `npm run typeorm migration:create ./apps/api/src/app/database/migrations/${migrationName}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${stderr}`);
      console.log(`${stdout}`);
    }
  );
}
