const fs = require('fs');
const path = require('path');

const SERVER_DATA = path.join(__dirname, '../server/data');
const CLIENT_PUBLIC_DATA = path.join(__dirname, '../client/public/data');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      const stats = fs.statSync(destPath);
      console.log(`Synced: ${path.relative(path.join(__dirname, '..'), destPath)} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }
}

console.log('--- Syncing Server Data to Client Public Data ---');
copyDirRecursive(SERVER_DATA, CLIENT_PUBLIC_DATA);
console.log('--- Data Sync Complete ---');
