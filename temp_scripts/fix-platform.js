#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Current platform
const currentPlatform = {
  os: process.platform,
  cpu: process.arch
};

console.log(`Current platform: ${currentPlatform.os}-${currentPlatform.cpu}`);

// List of platform-specific SWC packages
const platformSpecificPackages = [
  '@next/swc-darwin-arm64',
  '@next/swc-darwin-x64',
  '@next/swc-linux-arm64-gnu',
  '@next/swc-linux-arm64-musl',
  '@next/swc-linux-x64-gnu',
  '@next/swc-linux-x64-musl',
  '@next/swc-win32-arm64-msvc',
  '@next/swc-win32-ia32-msvc',
  '@next/swc-win32-x64-msvc'
];

// Check node_modules for platform-specific packages
const nodeModulesDir = path.join(process.cwd(), 'node_modules');

if (!fs.existsSync(nodeModulesDir)) {
  console.log('No node_modules directory found.');
  process.exit(0);
}

// Get all directories in node_modules
const dirs = fs.readdirSync(nodeModulesDir);

// Filter for @next/swc- packages
const swcPackages = dirs.filter(dir => 
  platformSpecificPackages.includes(dir) ||
  (dir.startsWith('@next') && fs.readdirSync(path.join(nodeModulesDir, dir)).some(subdir => 
    platformSpecificPackages.includes(`${dir}/${subdir}`))
  )
);

console.log('Found SWC packages:', swcPackages);

// Check for package.json dependencies referencing platform-specific packages
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check dependencies and devDependencies for platform-specific packages
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  for (const pkg of platformSpecificPackages) {
    if (dependencies[pkg]) {
      console.log(`⚠️ Warning: Found platform-specific package ${pkg} in package.json dependencies. This may cause deployment issues.`);
    }
  }
}

console.log('Platform check completed successfully.'); 