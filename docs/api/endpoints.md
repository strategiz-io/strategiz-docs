---
title: API Endpoints
description: Complete API reference for Strategiz platform
---

# API Endpoints

This section provides comprehensive API documentation for all Strategiz services.

## Authentication API

- `POST /auth/signin` - User sign in
- `POST /auth/signup` - User registration
- `POST /auth/totp/setup/initialize` - Initialize TOTP setup
- `POST /auth/totp/setup/complete` - Complete TOTP setup
- `POST /auth/totp/authenticate` - Authenticate with TOTP

## Portfolio API

- `GET /portfolio` - Get user portfolios
- `POST /portfolio` - Create new portfolio
- `PUT /portfolio/{id}` - Update portfolio
- `DELETE /portfolio/{id}` - Delete portfolio

## Strategy API

- `GET /strategy` - Get user strategies
- `POST /strategy` - Create new strategy
- `PUT /strategy/{id}/execute` - Execute strategy

## Base URL

All API endpoints are relative to: `https://api.strategiz.io/v1`

## Authentication

All API calls require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```
