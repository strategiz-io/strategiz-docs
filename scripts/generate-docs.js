#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const STRATEGIZ_CORE_PATH = '/Users/cuztomizer/Documents/GitHub/strategiz-core';
const DOCS_OUTPUT_PATH = '/Users/cuztomizer/Documents/GitHub/strategiz-docs/docs/strategiz-core';
const SIDEBAR_CONFIG_PATH = '/Users/cuztomizer/Documents/GitHub/strategiz-docs/sidebars.js';

// Module type mappings
const MODULE_TYPES = {
  'service-': 'service',
  'client-': 'client',
  'business-': 'business',
  'data-': 'data',
  'framework-': 'framework'
};

function getModuleType(dirName) {
  for (const [prefix, type] of Object.entries(MODULE_TYPES)) {
    if (dirName.startsWith(prefix)) {
      return type;
    }
  }
  return null;
}

function findModules() {
  console.log(`Scanning ${STRATEGIZ_CORE_PATH} for modules...`);

  const modules = {};

  // Initialize module type arrays
  const MODULE_FOLDER_TYPES = ['service', 'client', 'business', 'data', 'framework'];
  MODULE_FOLDER_TYPES.forEach(type => {
    modules[type] = [];
  });

  // Also check for application module
  modules.application = [];

  // Scan each module type folder
  for (const moduleType of MODULE_FOLDER_TYPES) {
    const moduleTypePath = path.join(STRATEGIZ_CORE_PATH, moduleType);

    if (fs.existsSync(moduleTypePath) && fs.statSync(moduleTypePath).isDirectory()) {
      console.log(`  Scanning ${moduleType}/ folder...`);

      const items = fs.readdirSync(moduleTypePath, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          const modulePath = path.join(moduleTypePath, item.name);
          const readmePaths = [
            path.join(modulePath, 'README.md'),
            path.join(modulePath, 'docs', 'README.md')
          ];

          let readmeContent = null;
          let readmePath = null;

          // Try to find README in multiple locations
          for (const rPath of readmePaths) {
            if (fs.existsSync(rPath)) {
              readmeContent = fs.readFileSync(rPath, 'utf8');
              readmePath = rPath;
              break;
            }
          }

          modules[moduleType].push({
            name: item.name,
            type: moduleType,
            path: modulePath,
            readmeContent,
            readmePath,
            hasReadme: readmeContent !== null
          });
        }
      }
    }
  }

  // Handle application module separately (it's at root level)
  const applicationPath = path.join(STRATEGIZ_CORE_PATH, 'application');
  if (fs.existsSync(applicationPath) && fs.statSync(applicationPath).isDirectory()) {
    const readmePath = path.join(applicationPath, 'README.md');

    let readmeContent = null;
    if (fs.existsSync(readmePath)) {
      readmeContent = fs.readFileSync(readmePath, 'utf8');
    }

    modules.application.push({
      name: 'application',
      type: 'application',
      path: applicationPath,
      readmeContent,
      readmePath,
      hasReadme: readmeContent !== null
    });
  }

  return modules;
}

function processMarkdownContent(content, moduleName) {
  if (!content) {
    return `# ${moduleName}\n\nNo documentation available.`;
  }

  // Process the markdown content for Docusaurus
  let processed = content;

  // Fix relative links that might break in Docusaurus
  processed = processed.replace(/\[([^\]]+)\]\((?!http)([^)]+)\)/g, (match, text, url) => {
    // If it's a relative path, we might need to adjust it
    if (url.startsWith('./') || url.startsWith('../')) {
      // For now, keep as is but could be enhanced to resolve properly
      return match;
    }
    return match;
  });

  // Fix HTML-like syntax that causes MDX compilation errors
  // First, escape all angle brackets in code blocks to avoid interfering
  processed = processed.replace(/```[\s\S]*?```/g, (match) => {
    return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });

  // Fix patterns that are already HTML-escaped but still causing issues
  // Pattern 1: (`Map&lt;String, Object&gt;): - contains comma in generic type
  processed = processed.replace(/\(`Map&lt;([^&]+), ([^&]+)&gt;\)/g, '(`Map<$1, $2>`)');
  processed = processed.replace(/\(`List&lt;([^&]+)&gt;\)/g, '(`List<$1>`)');
  processed = processed.replace(/\(`Set&lt;([^&]+)&gt;\)/g, '(`Set<$1>`)');
  processed = processed.replace(/\(`Optional&lt;([^&]+)&gt;\)/g, '(`Optional<$1>`)');

  // Fix patterns with &lt; &gt; that are still causing JSX interpretation
  processed = processed.replace(/&lt;([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)&gt;/g, '`<$1>`');
  processed = processed.replace(/&lt;([A-Z][a-zA-Z0-9]*Entity)&gt;/g, '`<$1>`');
  processed = processed.replace(/&lt;(String|Object|Integer|Long|Boolean|Double|Float)&gt;/g, '`<$1>`');

  // Replace angle brackets with proper code blocks for generic types (not already escaped)
  processed = processed.replace(/Map<([^>]+)>/g, '`Map<$1>`');
  processed = processed.replace(/List<([^>]+)>/g, '`List<$1>`');
  processed = processed.replace(/Set<([^>]+)>/g, '`Set<$1>`');
  processed = processed.replace(/Optional<([^>]+)>/g, '`Optional<$1>`');

  // Fix entity names that could be interpreted as JSX tags
  processed = processed.replace(/<([A-Z][a-zA-Z0-9]*Entity)>/g, '`<$1>`');
  processed = processed.replace(/<([a-z]+-[a-z]+)>/g, '`<$1>`');
  processed = processed.replace(/<(String|Object|Integer|Long|Boolean|Double|Float)>/g, '`<$1>`');

  // Fix any remaining standalone angle bracket patterns that could be interpreted as JSX
  processed = processed.replace(/<([a-zA-Z][a-zA-Z0-9\-]*)[^>/]*>/g, '`<$1>`');

  // Restore properly escaped code blocks
  processed = processed.replace(/```[\s\S]*?```/g, (match) => {
    return match.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  });

  return processed;
}

function createDocsStructure(modules) {
  console.log('Creating documentation structure...');

  // Clean and recreate the strategiz-core docs directory
  if (fs.existsSync(DOCS_OUTPUT_PATH)) {
    fs.rmSync(DOCS_OUTPUT_PATH, { recursive: true, force: true });
  }

  fs.mkdirSync(DOCS_OUTPUT_PATH, { recursive: true });

  // Create folder structure and files
  const sidebarStructure = {
    'strategiz-core': {
      type: 'category',
      label: 'Strategiz Core',
      items: []
    }
  };

  for (const [moduleType, moduleList] of Object.entries(modules)) {
    if (moduleList.length === 0) continue;

    const typeDir = path.join(DOCS_OUTPUT_PATH, moduleType);
    fs.mkdirSync(typeDir, { recursive: true });

    // Create category in sidebar
    const categoryItems = [];

    for (const module of moduleList) {
      const fileName = `${module.name}.md`;
      const filePath = path.join(typeDir, fileName);

      // Process markdown content
      const processedContent = processMarkdownContent(module.readmeContent, module.name);

      // Write the markdown file
      fs.writeFileSync(filePath, processedContent);

      console.log(`✓ Created ${moduleType}/${fileName} ${module.hasReadme ? '(with README)' : '(placeholder)'}`);

      // Add to sidebar structure
      categoryItems.push(`strategiz-core/${moduleType}/${module.name}`);
    }

    // Add category to main sidebar
    sidebarStructure['strategiz-core'].items.push({
      type: 'category',
      label: moduleType.charAt(0).toUpperCase() + moduleType.slice(1),
      items: categoryItems
    });
  }

  return sidebarStructure;
}

function updateSidebarConfig(sidebarStructure) {
  console.log('Updating sidebar configuration...');

  // Read existing sidebar config
  let sidebarContent = fs.readFileSync(SIDEBAR_CONFIG_PATH, 'utf8');

  // Create a new sidebar structure that includes the generated structure
  const newSidebarJS = `/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Auto-generated sidebar structure for strategiz-core
  ${JSON.stringify(sidebarStructure, null, 2).replace(/"/g, "'")},

  // Keep existing manual sidebars
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
};

module.exports = sidebars;
`;

  fs.writeFileSync(SIDEBAR_CONFIG_PATH, newSidebarJS);
  console.log('✓ Updated sidebar configuration');
}

function generateReport(modules) {
  console.log('\n=== Documentation Generation Report ===');

  let totalModules = 0;
  let modulesWithReadme = 0;

  for (const [moduleType, moduleList] of Object.entries(modules)) {
    if (moduleList.length === 0) continue;

    console.log(`\n${moduleType.toUpperCase()}:`);
    for (const module of moduleList) {
      const status = module.hasReadme ? '✓' : '⚠';
      const source = module.readmePath ? ` (${path.relative(STRATEGIZ_CORE_PATH, module.readmePath)})` : ' (no README found)';
      console.log(`  ${status} ${module.name}${source}`);

      totalModules++;
      if (module.hasReadme) modulesWithReadme++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total modules: ${totalModules}`);
  console.log(`Modules with README: ${modulesWithReadme}`);
  console.log(`Modules without README: ${totalModules - modulesWithReadme}`);
  console.log(`Documentation coverage: ${Math.round((modulesWithReadme / totalModules) * 100)}%`);
}

function main() {
  console.log('🚀 Generating Strategiz Core documentation...\n');

  try {
    // Scan for modules
    const modules = findModules();

    // Create documentation structure
    const sidebarStructure = createDocsStructure(modules);

    // Update sidebar configuration
    updateSidebarConfig(sidebarStructure);

    // Generate report
    generateReport(modules);

    console.log('\n🎉 Documentation generation completed!');
    console.log(`📁 Documentation files created in: ${DOCS_OUTPUT_PATH}`);
    console.log(`⚙️  Sidebar configuration updated: ${SIDEBAR_CONFIG_PATH}`);

  } catch (error) {
    console.error('❌ Error generating documentation:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, findModules, createDocsStructure };