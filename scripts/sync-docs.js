#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const CORE_REPO = 'strategiz-io/strategiz-core';
const UI_REPO = 'strategiz-io/strategiz-ui';
const BRANCH = 'main';
const DOCS_DIR = 'docs';

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Mapping of source files to destination paths
const DOC_MAPPINGS = {
  // ========== BACKEND (strategiz-core) ==========
  
  // Architecture docs
  'docs/ARCHITECTURE.md': { dest: 'docs/architecture/overview.md', repo: CORE_REPO },
  'docs/API_ENDPOINTS.md': { dest: 'docs/api/endpoints.md', repo: CORE_REPO },
  'docs/DEPLOY.md': { dest: 'docs/deployment/overview.md', repo: CORE_REPO },
  
  // Authentication docs
  'service/service-auth/docs/TOTP.md': { dest: 'docs/auth/totp.md', repo: CORE_REPO },
  'service/service-auth/docs/OAuth.md': { dest: 'docs/auth/oauth.md', repo: CORE_REPO },
  'service/service-auth/docs/SMS.md': { dest: 'docs/auth/sms.md', repo: CORE_REPO },
  'service/service-auth/docs/EmailOTP.md': { dest: 'docs/auth/email-otp.md', repo: CORE_REPO },
  'service/service-auth/docs/Passkey.md': { dest: 'docs/auth/passkey.md', repo: CORE_REPO },
  
  // Integration docs
  'docs/integrations/exchanges.md': { dest: 'docs/integrations/exchanges.md', repo: CORE_REPO },
  'docs/integrations/kraken-oauth.md': { dest: 'docs/integrations/kraken-oauth.md', repo: CORE_REPO },
  
  // Module specific docs
  'business/business-token-auth/README.md': { dest: 'docs/auth/token-auth.md', repo: CORE_REPO },
  'client/client-coinbase/COINBASE-INTEGRATION.md': { dest: 'docs/api/coinbase.md', repo: CORE_REPO },
  'framework/framework-exception/README.md': { dest: 'docs/architecture/exception-handling.md', repo: CORE_REPO },
  'framework/framework-logging/README.md': { dest: 'docs/architecture/logging.md', repo: CORE_REPO },
  'service/service-device/README.md': { dest: 'docs/api/device.md', repo: CORE_REPO },
  'service/service-provider/README.md': { dest: 'docs/api/provider.md', repo: CORE_REPO },
  'data/data-user/README.md': { dest: 'docs/api/user.md', repo: CORE_REPO },
  
  // Root docs
  'README.md': { dest: 'docs/backend/intro.md', repo: CORE_REPO },
  
  // ========== FRONTEND (strategiz-ui) ==========
  
  // Frontend docs
  'docs/README.md': { dest: 'docs/frontend/intro.md', repo: UI_REPO },
  'docs/features/authentication.md': { dest: 'docs/frontend/authentication.md', repo: UI_REPO },
  'docs/components/layout.md': { dest: 'docs/frontend/layout.md', repo: UI_REPO },
  
  // Root frontend docs
  'README.md': { dest: 'docs/frontend/overview.md', repo: UI_REPO },
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
function processMarkdownContent(content, sourcePath, repo) {
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
    `](https://github.com/${repo}/blob/${BRANCH}/$1)`
  );
  
  return processedContent;
}

// Function to fetch file from GitHub
async function fetchFileFromGitHub(filePath, repo) {
  try {
    const url = `${GITHUB_RAW_BASE}/${repo}/${BRANCH}/${filePath}`;
    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${filePath} from ${repo}:`, error.message);
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
  console.log('📚 Syncing from:');
  console.log(`   - Backend: ${CORE_REPO}`);
  console.log(`   - Frontend: ${UI_REPO}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [sourcePath, config] of Object.entries(DOC_MAPPINGS)) {
    try {
      const content = await fetchFileFromGitHub(sourcePath, config.repo);
      if (content) {
        const processedContent = processMarkdownContent(content, sourcePath, config.repo);
        writeLocalFile(processedContent, config.dest);
        successCount++;
      } else {
        console.warn(`⚠️  Skipping ${sourcePath} from ${config.repo} (not found)`);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${sourcePath} from ${config.repo}:`, error.message);
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