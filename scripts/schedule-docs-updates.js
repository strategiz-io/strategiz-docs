#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Configuration
const UPDATE_INTERVAL_HOURS = 5;
const UPDATE_INTERVAL_MS = UPDATE_INTERVAL_HOURS * 60 * 60 * 1000; // 5 hours in milliseconds
const SCRIPT_PATH = path.join(__dirname, 'auto-update-docs.sh');

console.log(`🕐 Starting docs update scheduler (every ${UPDATE_INTERVAL_HOURS} hours)`);
console.log(`📄 Script path: ${SCRIPT_PATH}`);

function updateDocs() {
  try {
    console.log(`\n🚀 ${new Date().toISOString()}: Running scheduled docs update...`);

    // Execute the update script
    const output = execSync(`bash "${SCRIPT_PATH}"`, {
      encoding: 'utf8',
      cwd: path.dirname(__dirname) // strategiz-docs directory
    });

    console.log(output);
    console.log(`✅ ${new Date().toISOString()}: Scheduled docs update completed successfully`);

  } catch (error) {
    console.error(`❌ ${new Date().toISOString()}: Error during scheduled docs update:`, error.message);
    if (error.stdout) {
      console.log('stdout:', error.stdout.toString());
    }
    if (error.stderr) {
      console.error('stderr:', error.stderr.toString());
    }
  }
}

// Run immediately on startup
console.log('🔄 Running initial docs update...');
updateDocs();

// Schedule subsequent updates
console.log(`⏰ Scheduling updates every ${UPDATE_INTERVAL_HOURS} hours`);
setInterval(updateDocs, UPDATE_INTERVAL_MS);

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping docs update scheduler...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping docs update scheduler...');
  process.exit(0);
});

console.log('📋 Docs update scheduler is running. Press Ctrl+C to stop.');
console.log(`📅 Next update scheduled for: ${new Date(Date.now() + UPDATE_INTERVAL_MS).toISOString()}`);