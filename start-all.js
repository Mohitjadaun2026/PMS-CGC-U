#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';

console.log('🚀 Starting Campus Recruitment Portal (Frontend + Backend)\n');
console.log('📊 Backend:  http://localhost:5000');
console.log('🎨 Frontend: http://localhost:5180\n');
console.log('Press CTRL+C to stop both servers\n');
console.log('=' .repeat(60) + '\n');

// Start backend
console.log('🔧 Starting Backend Server...\n');
const backendProcess = spawn(
  isWindows ? 'node.exe' : 'node',
  [path.join(__dirname, 'backend', 'node_modules', 'nodemon', 'bin', 'nodemon.js'), 'server.js'],
  {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  }
);

// Start frontend after a short delay
setTimeout(() => {
  console.log('\n🎨 Starting Frontend Development Server...\n');
  const frontendProcess = spawn(
    'npm',
    ['run', 'dev'],
    {
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'inherit',
      shell: true
    }
  );

  // Handle process termination
  const handleExit = () => {
    console.log('\n\n🛑 Stopping servers...');
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);

  frontendProcess.on('close', (code) => {
    console.log(`\n❌ Frontend process exited with code ${code}`);
    handleExit();
  });
}, 2000);

// Handle backend process
backendProcess.on('close', (code) => {
  console.log(`\n❌ Backend process exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping servers...');
  backendProcess.kill();
  process.exit(0);
});
