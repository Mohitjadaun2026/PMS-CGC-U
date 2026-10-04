#!/usr/bin/env node

const { spawn, execFileSync } = require('child_process');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';

function startJenkinsService() {
  if (!isWindows) {
    console.log('ℹ️  Jenkins service auto-start is only configured for Windows.');
    return;
  }

  try {
    execFileSync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-Command',
      "$service = Get-Service -Name Jenkins -ErrorAction Stop; if ($service.Status -ne 'Running') { Start-Service -Name Jenkins -ErrorAction Stop }; Write-Output 'Jenkins is running.'"
    ], { stdio: 'pipe' });
    console.log('✅ Jenkins:   http://localhost:8080');
  } catch (error) {
    const detail = error.stderr?.toString().trim();
    console.error('❌ Could not start the Jenkins Windows service.');
    if (detail) console.error(detail);
    console.error('   Open PowerShell as Administrator, then run: npm start\n');
  }
}

startJenkinsService();

console.log('🚀 Starting Campus Recruitment Portal (Frontend + Backend)\n');
console.log('📊 Backend:  http://localhost:5000');
console.log('🎨 Frontend: http://localhost:5180\n');
console.log('Press CTRL+C to stop both servers\n');
console.log('=' .repeat(60) + '\n');

// Start backend
console.log('🔧 Starting Backend Server...\n');
const backendProcess = spawn(
  'npm',
  ['run', 'dev'],
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
