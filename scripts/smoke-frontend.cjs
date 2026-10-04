const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const viteCli = path.join(root, 'frontend', 'node_modules', 'vite', 'bin', 'vite.js');
const url = 'http://127.0.0.1:4173/';
const server = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  cwd: path.join(root, 'frontend'),
  stdio: 'ignore',
});

async function main() {
  const deadline = Date.now() + 20_000;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Vite preview exited with code ${server.exitCode}`);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Preview returned HTTP ${response.status}`);
      const html = await response.text();
      if (!html.includes('<div id="root">')) throw new Error('Built page is missing the React root element');
      console.log('Frontend smoke test passed (HTTP 200 and React root found).');
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Frontend preview did not become ready: ${lastError?.message ?? 'timeout'}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => server.kill());
