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
  // Combined technical documentation sidebar
  'technical-docs': [
    {
      'type': 'category',
      'label': 'Strategiz Core',
      'collapsible': true,
      'collapsed': false,
      'items': [
        {
          'type': 'doc',
          'id': 'strategiz-core/strategiz-core-overview',
          'label': 'Overview'
        },
        {
          'type': 'doc',
          'id': 'strategiz-core/strategiz-core-architecture',
          'label': 'Architecture'
        },
      {
        'type': 'category',
        'label': 'Service',
        'items': [
          'strategiz-core/service/build',
          'strategiz-core/service/service-auth',
          'strategiz-core/service/service-base',
          'strategiz-core/service/service-dashboard',
          'strategiz-core/service/service-device',
          'strategiz-core/service/service-exchange',
          'strategiz-core/service/service-marketdata',
          'strategiz-core/service/service-marketing',
          'strategiz-core/service/service-marketplace',
          'strategiz-core/service/service-monitoring',
          'strategiz-core/service/service-portfolio',
          'strategiz-core/service/service-profile',
          {
            'type': 'category',
            'label': 'service-provider',
            'collapsible': true,
            'collapsed': false,
            'items': [
              'strategiz-core/service/service-provider',
              'strategiz-core/service/provider-connection-api',
              'strategiz-core/service/provider-query-api',
              'strategiz-core/service/provider-update-api',
              'strategiz-core/service/provider-delete-api',
              'strategiz-core/service/provider-callback-api'
            ]
          },
          'strategiz-core/service/service-strategy',
          'strategiz-core/service/service-user',
          'strategiz-core/service/service-walletaddress'
        ]
      },
      {
        'type': 'category',
        'label': 'Client',
        'items': [
          'strategiz-core/client/build',
          'strategiz-core/client/client-alpaca',
          'strategiz-core/client/client-alphavantage',
          'strategiz-core/client/client-base',
          'strategiz-core/client/client-binanceus',
          'strategiz-core/client/client-coinbase',
          'strategiz-core/client/client-coingecko',
          'strategiz-core/client/client-facebook',
          'strategiz-core/client/client-firebase-sms',
          'strategiz-core/client/client-google',
          'strategiz-core/client/client-kraken',
          'strategiz-core/client/client-polygon',
          'strategiz-core/client/client-schwab',
          'strategiz-core/client/client-walletaddress',
          'strategiz-core/client/client-yahoofinance'
        ]
      },
      {
        'type': 'category',
        'label': 'Business',
        'items': [
          'strategiz-core/business/build',
          'strategiz-core/business/business-base',
          'strategiz-core/business/business-portfolio',
          'strategiz-core/business/business-provider-alpaca',
          'strategiz-core/business/business-provider-base',
          'strategiz-core/business/business-provider-binanceus',
          'strategiz-core/business/business-provider-coinbase',
          'strategiz-core/business/business-provider-kraken',
          'strategiz-core/business/business-provider-schwab',
          'strategiz-core/business/business-strategy-execution',
          'strategiz-core/business/business-token-auth'
        ]
      },
      {
        'type': 'category',
        'label': 'Data',
        'items': [
          'strategiz-core/data/build',
          'strategiz-core/data/data-auth',
          'strategiz-core/data/data-base',
          'strategiz-core/data/data-device',
          'strategiz-core/data/data-exchange',
          'strategiz-core/data/data-marketdata',
          'strategiz-core/data/data-portfolio',
          'strategiz-core/data/data-preferences',
          'strategiz-core/data/data-provider',
          'strategiz-core/data/data-session',
          'strategiz-core/data/data-strategy',
          'strategiz-core/data/data-user',
          'strategiz-core/data/data-watchlist'
        ]
      },
      {
        'type': 'category',
        'label': 'Framework',
        'items': [
          'strategiz-core/framework/build',
          'strategiz-core/framework/framework-api-docs',
          'strategiz-core/framework/framework-exception',
          'strategiz-core/framework/framework-logging',
          'strategiz-core/framework/framework-secrets'
        ]
      },
      {
        'type': 'category',
        'label': 'Application',
        'items': [
          'strategiz-core/application/application'
        ]
      }
      ]
    },
    {
      'type': 'category',
      'label': 'Strategiz UI',
      'collapsible': true,
      'collapsed': false,
      'items': [
        {
          'type': 'doc',
          'id': 'strategiz-ui/strategiz-ui',
          'label': 'Overview'
        },
        {
          'type': 'doc',
          'id': 'strategiz-ui/ui-architecture',
          'label': 'Architecture'
        },
        {
          'type': 'category',
          'label': 'Authentication',
          'collapsible': true,
          'collapsed': false,
          'items': [
            'strategiz-ui/auth/landing-screen',
            'strategiz-ui/auth/signin-screen',
            'strategiz-ui/auth/signup-screen',
            'strategiz-ui/auth/oauth-callback-screen'
          ]
        },
        {
          'type': 'category',
          'label': 'Core Screens',
          'collapsible': true,
          'collapsed': false,
          'items': [
            'strategiz-ui/dashboard/dashboard-screen',
            'strategiz-ui/portfolio/portfolio-screen',
            'strategiz-ui/labs/labs-screen',
            'strategiz-ui/live-strategies/live-strategies-screen',
            'strategiz-ui/marketplace/marketplace-screen',
            'strategiz-ui/profile/profile-screen'
          ]
        },
        {
          'type': 'category',
          'label': 'Education',
          'collapsible': true,
          'collapsed': true,
          'items': [
            'strategiz-ui/learn/learn-screen'
          ]
        }
      ]
    }
  ]
};

module.exports = sidebars;
