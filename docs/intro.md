---
title: Welcome to Strategiz
description: Complete documentation for the Strategiz trading platform
slug: /
---

# Welcome to Strategiz Documentation

Welcome to the comprehensive documentation for **Strategiz**, a modern trading platform built for portfolio management and algorithmic trading.

## 🚀 What is Strategiz?

Strategiz is a full-stack trading platform that provides:

- **Portfolio Management** - Track and manage your investment portfolios
- **Multi-Exchange Support** - Connect to Coinbase, Kraken, Binance US, and more
- **Algorithmic Trading** - Build and deploy automated trading strategies
- **Real-time Market Data** - Live market data and portfolio updates
- **Advanced Authentication** - Multi-factor authentication with TOTP, SMS, Email OTP, and Passkeys

## 🏗️ Architecture Overview

The Strategiz platform consists of three main components:

### Backend (strategiz-core)
- **Spring Boot** microservices architecture
- **Java 17** with modern development practices
- **Firebase Firestore** for data persistence
- **OAuth 2.0** integrations with exchanges
- **Comprehensive API** with OpenAPI documentation

### Frontend (strategiz-ui)
- **React 18** with TypeScript
- **Material-UI** for modern, responsive design
- **Redux Toolkit** for state management
- **TradingView** widgets for advanced charting
- **Progressive Web App** capabilities

### Documentation (strategiz-docs)
- **Docusaurus 3** for beautiful, searchable documentation
- **Automated sync** from source repositories
- **Live examples** and interactive API documentation

## 📚 Documentation Structure

### 🏗️ Backend Documentation
- **Architecture** - System design and technical details
- **Authentication** - Multi-factor authentication implementation
- **API Reference** - Complete API documentation
- **Integrations** - Exchange and external service integrations
- **Deployment** - Production deployment guides

### 🎨 Frontend Documentation
- **Overview** - Frontend architecture and getting started
- **Features** - Authentication, trading, and portfolio features
- **Components** - Reusable UI components and layouts
- **Development** - Setup and development guidelines

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Java 17+** and Maven
- **Firebase** account for authentication and database

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/strategiz-io/strategiz-core.git
cd strategiz-core

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/strategiz-io/strategiz-ui.git
cd strategiz-ui

# Install dependencies and start
npm install
npm start
```

## 🔗 Useful Links

- **Backend Repository**: [strategiz-core](https://github.com/strategiz-io/strategiz-core)
- **Frontend Repository**: [strategiz-ui](https://github.com/strategiz-io/strategiz-ui)
- **Documentation Repository**: [strategiz-docs](https://github.com/strategiz-io/strategiz-docs)
- **Live API Documentation**: [Swagger UI](http://localhost:9090/swagger-ui.html)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines in each repository for details on how to get started.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Ready to get started? Check out our [Backend Overview](backend/intro) or [Frontend Overview](frontend/intro) to dive deeper into the platform.
