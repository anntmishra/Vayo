#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The current platform
const currentPlatform = `${process.platform}-${process.arch}`;
console.log(`Current platform: ${currentPlatform}`);

// Platform-specific SWC packages
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

// Check if we're running in a deployment environment
const isDeployment = process.env.NODE_ENV === 'production' || 
                     process.env.VERCEL === '1' || 
                     process.env.CI === 'true';

console.log(`Running in deployment environment: ${isDeployment}`);

// Only run in deployment environments
if (isDeployment) {
  console.log('Checking and cleaning up platform-specific dependencies...');
  
  // Determine the compatible SWC package for the current platform
  let compatiblePackage = null;
  
  if (process.platform === 'darwin') {
    if (process.arch === 'arm64') {
      compatiblePackage = '@next/swc-darwin-arm64';
    } else if (process.arch === 'x64') {
      compatiblePackage = '@next/swc-darwin-x64';
    }
  } else if (process.platform === 'linux') {
    if (process.arch === 'arm64') {
      // Check if musl or gnu
      try {
        const lddOutput = execSync('ldd --version', { encoding: 'utf8' });
        if (lddOutput.includes('musl')) {
          compatiblePackage = '@next/swc-linux-arm64-musl';
        } else {
          compatiblePackage = '@next/swc-linux-arm64-gnu';
        }
      } catch (e) {
        // Assume gnu as fallback
        compatiblePackage = '@next/swc-linux-arm64-gnu';
      }
    } else if (process.arch === 'x64') {
      try {
        const lddOutput = execSync('ldd --version', { encoding: 'utf8' });
        if (lddOutput.includes('musl')) {
          compatiblePackage = '@next/swc-linux-x64-musl';
        } else {
          compatiblePackage = '@next/swc-linux-x64-gnu';
        }
      } catch (e) {
        compatiblePackage = '@next/swc-linux-x64-gnu';
      }
    }
  } else if (process.platform === 'win32') {
    if (process.arch === 'arm64') {
      compatiblePackage = '@next/swc-win32-arm64-msvc';
    } else if (process.arch === 'ia32') {
      compatiblePackage = '@next/swc-win32-ia32-msvc';
    } else if (process.arch === 'x64') {
      compatiblePackage = '@next/swc-win32-x64-msvc';
    }
  }

  console.log(`Compatible package for current platform: ${compatiblePackage}`);

  // Create next.config.js temporary override if needed
  const nextConfigJsPath = path.join(process.cwd(), 'next.config.js');
  const nextConfigTsPath = path.join(process.cwd(), 'next.config.ts');
  
  if (!fs.existsSync(nextConfigJsPath) && fs.existsSync(nextConfigTsPath)) {
    console.log('Creating temporary next.config.js for compatibility...');
    const content = `
// This is a temporary file generated for cross-platform compatibility
// Original config is in next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true
  }
};

module.exports = nextConfig;
`;
    
    fs.writeFileSync(nextConfigJsPath, content, 'utf8');
    console.log('Created temporary next.config.js');
  }

  console.log('Platform compatibility fixes applied successfully.');
} else {
  console.log('Not running in deployment environment, skipping fixes.');
} 