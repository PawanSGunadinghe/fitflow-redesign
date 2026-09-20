# FitFlow Backend Core API

Modular API service and gateway built with **NestJS**, **TypeScript**, and **PostgreSQL**.

## Architecture & Modules

- **Workouts Module (`/api/v1/workouts`)**: Manages personalized routines, adaptive adjustments, and historical performance tracking.
- **Nutrition Module (`/api/v1/nutrition`)**: Processes meal logs, interfaces with the AI vision microservice, and stores macro goals.
- **Social Module (`/api/v1/social`)**: Coordinates private accountability circles, real-time reactions via WebSockets, and group challenges.

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Build for production
npm run build
npm start
```
