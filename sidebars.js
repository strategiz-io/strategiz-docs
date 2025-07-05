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
  // Architecture documentation
  architectureSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/overview', 'architecture/microservices', 'architecture/database'],
    },
  ],

  // Authentication documentation
  authSidebar: [
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'auth/overview',
        'auth/totp',
        'auth/oauth',
        'auth/sms',
        'auth/email-otp',
        'auth/passkey',
      ],
    },
  ],

  // API documentation
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/endpoints',
        'api/authentication',
        'api/portfolio',
        'api/strategy',
        'api/user',
        'api/exchange',
      ],
    },
  ],

  // Deployment documentation
  deploymentSidebar: [
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/overview',
        'deployment/docker',
        'deployment/kubernetes',
        'deployment/cloud',
      ],
    },
  ],
};

module.exports = sidebars; 