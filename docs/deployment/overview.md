---
title: Deployment Overview
description: How to deploy Strategiz platform
---

# Deployment Overview

Strategiz can be deployed using multiple methods depending on your requirements.

## Deployment Options

### Docker Compose
Quick local deployment for development and testing.

### Kubernetes
Production-ready deployment with auto-scaling and high availability.

### Cloud Providers
- Google Cloud Platform
- Amazon Web Services
- Microsoft Azure

## Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (for K8s deployment)
- PostgreSQL database
- Redis cache

## Environment Variables

Required environment variables:
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT token secret
- `REDIS_URL` - Redis connection string
- `EXCHANGE_API_KEYS` - Exchange API credentials

## Quick Start

1. Clone the repository
2. Configure environment variables
3. Run `docker-compose up`
4. Access the application at `http://localhost:3000`
