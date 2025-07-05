// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Strategiz Documentation',
  tagline: 'Comprehensive documentation for the Strategiz trading platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://strategiz-io.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/strategiz-docs/',

  // GitHub pages deployment config
  organizationName: 'strategiz-io',
  projectName: 'strategiz-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/strategiz-io/strategiz-core/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/strategiz-io/strategiz-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/strategiz-social-card.jpg',
      navbar: {
        title: 'Strategiz',
        logo: {
          alt: 'Strategiz Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/architecture/overview',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/auth/overview',
            label: 'Authentication',
            position: 'left',
          },
          {
            to: '/docs/api/endpoints',
            label: 'API',
            position: 'left',
          },
          {
            to: '/docs/deployment/overview',
            label: 'Deployment',
            position: 'left',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/strategiz-io/strategiz-core',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
              },
              {
                label: 'Authentication',
                to: '/docs/auth/overview',
              },
              {
                label: 'API Reference',
                to: '/docs/api/endpoints',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/strategiz-io/strategiz-core/discussions',
              },
              {
                label: 'Issues',
                href: 'https://github.com/strategiz-io/strategiz-core/issues',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/strategiz-io/strategiz-core',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Strategiz. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'typescript', 'json', 'bash', 'yaml'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'strategiz-docs',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push
        externalUrlRegex: 'external\\.com|domain\\.com',
      },
    }),
};

module.exports = config;