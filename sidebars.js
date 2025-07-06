/**
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
  // Main sidebar with organized sections
  mainSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: '🏗️ Backend (strategiz-core)',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'architecture/overview',
          ],
        },
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'auth/overview',
            'auth/totp',
          ],
        },
        {
          type: 'category',
          label: 'API Reference',
          items: [
            'api/endpoints',
          ],
        },
        {
          type: 'category',
          label: 'Integrations',
          items: [
            'integrations/exchanges',
            'integrations/kraken-oauth',
          ],
        },
        {
          type: 'category',
          label: 'Deployment',
          items: [
            'deployment/overview',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🎨 Frontend (strategiz-ui)',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'frontend/intro',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'frontend/overview',
          label: 'Getting Started',
        },
        {
          type: 'category',
          label: 'Features',
          items: [
            'frontend/authentication',
          ],
        },
        {
          type: 'category',
          label: 'Components',
          items: [
            'frontend/layout',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
