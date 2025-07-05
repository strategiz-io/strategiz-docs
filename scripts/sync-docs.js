#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const CORE_REPO = 'strategiz-io/strategiz-core';
const BRANCH = 'main';
const DOCS_DIR = 'docs';

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Mapping of source files to destination paths
const DOC_MAPPINGS = {
  // Architecture docs
  'docs/ARCHITECTURE.md': 'docs/architecture/overview.md',
  'docs/API_ENDPOINTS.md': 'docs/api/endpoints.md',
  'docs/DEPLOY.md': 'docs/deployment/overview.md',
  
  // Authentication docs
  'service/service-auth/docs/TOTP.md': 'docs/auth/totp.md',
  'service/service-auth/docs/OAuth.md': 'docs/auth/oauth.md',
  'service/service-auth/docs/SMS.md': 'docs/auth/sms.md',
  'service/service-auth/docs/EmailOTP.md': 'docs/auth/email-otp.md',
  'service/service-auth/docs/Passkey.md': 'docs/auth/passkey.md',
  
  // Module specific docs
  'business/business-token-auth/README.md': 'docs/auth/token-auth.md',
  'client/client-coinbase/COINBASE-INTEGRATION.md': 'docs/api/coinbase.md',
  'framework/framework-exception/README.md': 'docs/architecture/exception-handling.md',
  'framework/framework-logging/README.md': 'docs/architecture/logging.md',
  'service/service-device/README.md': 'docs/api/device.md',
  'service/service-provider/README.md': 'docs/api/provider.md',
  'data/data-user/README.md': 'docs/api/user.md',
  
  // Root docs
  'README.md': 'docs/intro.md',
};

// Function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to add Docusaurus frontmatter
function addDocusaurusFrontmatter(content, title, description) {
  const frontmatter = `---
title: ${title}
description: ${description}
---

`;
  return frontmatter + content;
}

// Function to process markdown content
function processMarkdownContent(content, sourcePath) {
  // Extract title from first h1 heading or use filename
  const h1Match = content.match(/^# (.+)$/m);
  const title = h1Match ? h1Match[1] : path.basename(sourcePath, '.md');
  
  // Extract description from first paragraph after title
  const descriptionMatch = content.match(/^# .+$\n\n(.+)$/m);
  const description = descriptionMatch ? descriptionMatch[1].substring(0, 160) : `Documentation for ${title}`;
  
  // Add frontmatter
  let processedContent = addDocusaurusFrontmatter(content, title, description);
  
  // Fix relative links to point to GitHub for now
  processedContent = processedContent.replace(
    /\]\((?!https?:\/\/)([^)]+)\)/g,
    `](https://github.com/${CORE_REPO}/blob/${BRANCH}/$1)`
  );
  
  return processedContent;
}

// Function to fetch file from GitHub
async function fetchFileFromGitHub(filePath) {
  try {
    const url = `${GITHUB_RAW_BASE}/${CORE_REPO}/${BRANCH}/${filePath}`;
    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${filePath}:`, error.message);
    return null;
  }
}

// Function to write file to local docs
function writeLocalFile(content, destinationPath) {
  ensureDirectoryExists(destinationPath);
  fs.writeFileSync(destinationPath, content, 'utf8');
  console.log(`✅ Written: ${destinationPath}`);
}

// Main sync function
async function syncDocs() {
  console.log('🔄 Starting documentation sync...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [sourcePath, destinationPath] of Object.entries(DOC_MAPPINGS)) {
    try {
      const content = await fetchFileFromGitHub(sourcePath);
      if (content) {
        const processedContent = processMarkdownContent(content, sourcePath);
        writeLocalFile(processedContent, destinationPath);
        successCount++;
      } else {
        console.warn(`⚠️  Skipping ${sourcePath} (not found)`);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${sourcePath}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Sync complete:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  if (errorCount === 0) {
    console.log('🎉 All documentation synced successfully!');
  }
}

// Run the sync
if (require.main === module) {
  syncDocs().catch(console.error);
}

module.exports = { syncDocs }; 