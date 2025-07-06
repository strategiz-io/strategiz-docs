#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const CORE_REPO = 'strategiz-io/strategiz-core';
const UI_REPO = 'strategiz-io/strategiz-ui';
const BRANCH = 'main';

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Mapping of source files to destination paths - only files that exist
const DOC_MAPPINGS = {
  // ========== BACKEND (strategiz-core) ==========
  
  // Root docs that exist
  'README.md': { dest: 'docs/backend/intro.md', repo: CORE_REPO },
  
  // Docs folder files that exist
  'docs/README.md': { dest: 'docs/architecture/overview.md', repo: CORE_REPO },
  'docs/security/authentication.md': { dest: 'docs/auth/overview.md', repo: CORE_REPO },
  'docs/deployment/overview.md': { dest: 'docs/deployment/overview.md', repo: CORE_REPO },
  'docs/api/endpoints.md': { dest: 'docs/api/endpoints.md', repo: CORE_REPO },
  
  // Integration docs
  'docs/integrations/exchanges.md': { dest: 'docs/integrations/exchanges.md', repo: CORE_REPO },
  'docs/integrations/kraken-oauth.md': { dest: 'docs/integrations/kraken-oauth.md', repo: CORE_REPO },
  
  // ========== FRONTEND (strategiz-ui) ==========
  
  // Root docs
  'README.md': { dest: 'docs/frontend/overview.md', repo: UI_REPO },
  
  // Frontend-specific docs
  'docs/README.md': { dest: 'docs/frontend/intro.md', repo: UI_REPO },
  'docs/features/authentication.md': { dest: 'docs/frontend/authentication.md', repo: UI_REPO },
  'docs/components/layout.md': { dest: 'docs/frontend/layout.md', repo: UI_REPO },
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
    const response = await axios.get(url, { timeout: 10000 });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`⚠️  File not found: ${filePath} from ${repo}`);
    } else {
      console.error(`❌ Error fetching ${filePath} from ${repo}:`, error.message);
    }
    return null;
  }
}

// Function to write file to local docs
function writeLocalFile(content, destinationPath) {
  ensureDirectoryExists(destinationPath);
  fs.writeFileSync(destinationPath, content, 'utf8');
  console.log(`✅ Written: ${destinationPath}`);
}

// Function to create placeholder files for missing docs
function createPlaceholderFile(destinationPath, title, description) {
  const content = `---
title: ${title}
description: ${description}
---

# ${title}

${description}

> 📝 This documentation is coming soon. In the meantime, check out the [source code](https://github.com/strategiz-io) for implementation details.

## Contributing

If you'd like to contribute to this documentation, please see our [contributing guidelines](https://github.com/strategiz-io/strategiz-docs).
`;
  
  writeLocalFile(content, destinationPath);
}

// Main sync function
async function syncDocs() {
  console.log('🔄 Starting documentation sync...');
  console.log('📚 Syncing from:');
  console.log(`   - Backend: ${CORE_REPO}`);
  console.log(`   - Frontend: ${UI_REPO}`);
  console.log('');
  
  let successCount = 0;
  let errorCount = 0;
  let placeholderCount = 0;
  
  for (const [sourcePath, config] of Object.entries(DOC_MAPPINGS)) {
    try {
      const content = await fetchFileFromGitHub(sourcePath, config.repo);
      if (content) {
        const processedContent = processMarkdownContent(content, sourcePath, config.repo);
        writeLocalFile(processedContent, config.dest);
        successCount++;
      } else {
        // Create placeholder file
        const title = path.basename(sourcePath, '.md').replace(/[-_]/g, ' ');
        const description = `Documentation for ${title} (coming soon)`;
        createPlaceholderFile(config.dest, title, description);
        placeholderCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${sourcePath} from ${config.repo}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Sync complete:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   📝 Placeholders: ${placeholderCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 Documentation sync completed successfully!');
    console.log('💡 Run "npm run build" to build the documentation site.');
  }
}

// Run the sync
if (require.main === module) {
  syncDocs().catch(console.error);
}

module.exports = { syncDocs }; 