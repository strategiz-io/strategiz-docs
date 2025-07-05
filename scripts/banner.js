#!/usr/bin/env node

const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  reset: '\x1b[0m'
};

const banner = `
${colors.cyan}🚀 Initializing Strategiz Documentation Site...${colors.reset}
${colors.gray}Loading modules: Architecture • API Reference • Deployment • Auth${colors.reset}

${colors.cyan}███████╗████████╗██████╗  █████╗ ████████╗███████╗ ██████╗ ██╗███████╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██║╚══███╔╝
███████╗   ██║   ██████╔╝███████║   ██║   █████╗  ██║  ███╗██║  ███╔╝ 
╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║   ██║██║ ███╔╝  
███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗╚██████╔╝██║███████╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝╚══════╝${colors.reset}

${colors.cyan}                    ██████╗  ██████╗  ██████╗███████╗
                    ██╔══██╗██╔═══██╗██╔════╝██╔════╝
                    ██║  ██║██║   ██║██║     ███████╗
                    ██║  ██║██║   ██║██║     ╚════██║
                    ██████╔╝╚██████╔╝╚██████╗███████║
                    ╚═════╝  ╚═════╝  ╚═════╝╚══════╝${colors.reset}

${colors.green}🚀 DOCUMENTATION SITE    ${colors.yellow}🔥 POWERED BY DOCUSAURUS     ${colors.blue}💎 v1.0-SNAPSHOT${colors.reset}
${colors.green}📚 Platform Documentation  ${colors.yellow}🔒 Interactive API Reference  ${colors.blue}📝 Live Examples${colors.reset}

${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.white}🌐 Documentation: http://localhost:3000${colors.reset}
${colors.white}📖 API Reference: http://localhost:3000/docs/api${colors.reset}
${colors.white}🏗️  Architecture:  http://localhost:3000/docs/architecture${colors.reset}

${colors.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

`;

console.log(banner); 