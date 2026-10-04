const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const release = path.join(root, 'release');

fs.rmSync(release, { recursive: true, force: true });
fs.mkdirSync(path.join(release, 'frontend'), { recursive: true });
fs.mkdirSync(path.join(release, 'backend'), { recursive: true });

fs.cpSync(path.join(root, 'frontend', 'dist'), path.join(release, 'frontend', 'dist'), {
  recursive: true,
});

for (const entry of ['config', 'controllers', 'middleware', 'models', 'routes', 'services']) {
  const source = path.join(root, 'backend', entry);
  if (fs.existsSync(source)) {
    fs.cpSync(source, path.join(release, 'backend', entry), { recursive: true });
  }
}

for (const file of ['server.js', 'package.json', 'package-lock.json']) {
  fs.copyFileSync(path.join(root, 'backend', file), path.join(release, 'backend', file));
}

console.log(`Release bundle created at ${release}`);
