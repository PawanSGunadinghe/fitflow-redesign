# FitFlow Redesign 🚀

### Next-Generation Health & Fitness Platform with AI Personalization, Computer Vision Meal Tracking & Private Social Accountability

[![CI/CD Pipeline](https://github.com/PawanSGunadinghe/fitflow-redesign/actions/workflows/ci.yml/badge.svg)](https://github.com/PawanSGunadinghe/fitflow-redesign/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React Native](<https://img.shields.io/badge/React%20Native-Expo%2051-61DAFB.svg>)](https://reactnative.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-E0234E.svg)](https://nestjs.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![Compliance](<https://img.shields.io/badge/Compliance-HIPAA%20%7C%20GDPR-success.svg>)](#security--compliance)

---

## 📖 Overview

**FitFlow Redesign** is a comprehensive architectural and user-experience transformation of the FitFlow fitness tracking ecosystem. Developed under the **IT3060 Human Computer Interaction (HCI)** curriculum at **SLIIT (Faculty of Computing)**, this project translates rigorous user research, iterative usability testing (raising the System Usability Scale score from **68 to 87**), and human-centered design principles into a cloud-native, enterprise-grade polyglot microservice platform.

### The Problem We Solved

- **Drop-off Reversal**: 68% of new users abandoned FitFlow post-onboarding due to rigid routines and tedious food logging.
- **Adaptive Scheduling (Alex Rivera Persona)**: Busy professionals needed workouts that dynamically adapt to irregular schedules, fluctuating energy levels, and acute muscle soreness.
- **Instant Nutrition Recognition**: Tedious manual search-and-log meal entry replaced with sub-second computer vision camera recognition.
- **Intimidation-Free Accountability (Priya Singh Persona)**: Safe, private accountability circles with real-time cheering and milestones, free from toxic public social media pressure.

---

## 🏗️ High-Level System Architecture

FitFlow employs a **Decoupled Cloud-Native Microservices Architecture**, separating high-throughput core business operations from compute-heavy artificial intelligence and computer vision models.

```mermaid
graph TB
    subgraph Client_Tier ["Client Tier (Cross-Platform)"]
        iOS["iOS App (React Native / Expo)"]
        Android["Android App (React Native / Expo)"]
        WebDash["Web Dashboard (React Native Web / Next.js)"]
    end

    subgraph Security_Perimeter ["Edge & Security Gateway"]
        Cloudflare["Cloudflare CDN & WAF (TLS 1.3 / DDoS Shield)"]
        APIGateway["Kong API Gateway (JWT Auth, Rate Limiter)"]
    end

    subgraph Microservices ["Microservices Layer"]
        CoreAPI["FitFlow Core API (NestJS / Node.js)<br/>• Workout Scheduling & Profiles<br/>• Social Circles & Challenges<br/>• Nutrition Logs API"]
        RealtimeGW["WebSocket Gateway (Socket.io)<br/>• Live Social Broadcasts<br/>• Instant High-Fives"]
        AIService["AI & Vision Microservice (Python FastAPI)<br/>• Adaptive 'Daily Flow' Engine<br/>• YOLOv8 Food Recognition<br/>• Nutrition Macro Calculator"]
        QueueWorkers["Worker Queue (BullMQ)<br/>• Batch Health Analytics<br/>• Push Notifications"]
    end

    subgraph Persistence ["Persistence & Cache Layer"]
        Postgres[(PostgreSQL 16 Primary DB)<br/>• Row-Level Security (RLS)<br/>• Encrypted Health Records (AES-256)]
        Redis[(Redis 7 Cache)<br/>• Fast Session Store<br/>• Real-time Leaderboards]
        S3[(Object Storage: S3 / Cloudflare R2)<br/>• Encrypted Meal Photos]
        Firestore[(Firebase Firestore)<br/>• Real-Time Chat & State]
    end

    iOS --> Cloudflare
    Android --> Cloudflare
    WebDash --> Cloudflare
    Cloudflare --> APIGateway

    APIGateway --> CoreAPI
    APIGateway --> RealtimeGW
    APIGateway --> AIService

    CoreAPI --> Postgres
    CoreAPI --> Redis
    CoreAPI --> QueueWorkers
    CoreAPI --> AIService
    RealtimeGW --> Firestore
    RealtimeGW --> Redis
    AIService --> S3
```

---

## ⚡ Technology Stack Summary

| Domain                                   | Selected Technology                               | Rationale & Trade-offs                                                                                                        |
| :--------------------------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| **Mobile & Web Frontend**          | **React Native (Expo SDK 51 + TypeScript)** | >90% code reuse across iOS, Android, and Web. 60+ FPS animation fluidity via Reanimated 3 for drag-and-drop workout creation. |
| **Core API Gateway & Backend**     | **Node.js (NestJS Framework)**              | Full-stack TypeScript consistency, modular dependency injection, enterprise structure, and high asynchronous I/O throughput.  |
| **AI & Vision Microservice**       | **Python (FastAPI + PyTorch/YOLOv8)**       | Dedicated high-performance microservice isolating compute-intensive meal segmentation and ML workout recommendations.         |
| **Primary Database**               | **PostgreSQL 16**                           | Strict relational integrity and ACID transactions for biometric health logs, protected by native Row-Level Security (RLS).    |
| **In-Memory Cache & Leaderboards** | **Redis 7**                                 | Sub-millisecond latency for session verification, rate limiting, and real-time community challenge leaderboards.              |
| **Real-Time Layer & Push**         | **Socket.io + Firebase Cloud Messaging**    | Instant high-fives and streak celebrations in private circles; reliable cross-platform background push notifications.         |
| **Authentication & AuthZ**         | **Supabase Auth / Firebase Auth**           | Multi-factor authentication, biometric unlock, and native PostgreSQL RLS claims verification.                                 |

---

## 📂 Repository Structure

```
fitflow-redesign/
├── .github/
│   └── workflows/
│       └── ci.yml                         # Automated CI/CD pipeline (Lint, Typecheck, Security)
├── .gitignore                             # Ignore rules for Node, Expo, Python, and OS files
├── README.md                              # Main project documentation (This file)
├── LAB_REPORT_05.md                       # Full SLIIT Lab Exercise 05 Submission Report
├── frontend/                              # Mobile & Web client application
│   ├── src/
│   │   ├── components/                    # UI Components (DailyFlowCard, CameraModal, CircleFeed)
│   │   └── services/                      # API client & WebSocket connections
│   ├── App.tsx                            # Root React Native application
│   ├── app.json                           # Expo application configuration
│   ├── package.json                       # Frontend dependencies
│   └── tsconfig.json                      # Frontend TypeScript config
├── backend/                               # Core API Gateway and business logic
│   ├── src/
│   │   ├── modules/
│   │   │   ├── workouts/                  # Workouts controller and logic
│   │   │   ├── nutrition/                 # Nutrition tracking controller and logic
│   │   │   └── social/                    # Private circles controller and logic
│   │   ├── app.module.ts                  # NestJS root module
│   │   └── main.ts                        # Server bootstrap
│   ├── package.json                       # Backend dependencies
│   └── tsconfig.json                      # Backend TypeScript config
├── ai-service/                            # AI & Computer Vision microservice
│   ├── models/
│   │   └── schemas.py                     # Pydantic data schemas
│   ├── main.py                            # FastAPI application endpoints
│   └── requirements.txt                   # Python dependencies
└── docs/                                  # Architectural and technical documents
    ├── architecture-decision-records/
    │   └── ADR-001-tech-stack-selection.md # Formal Architecture Decision Record
    ├── system-architecture.md             # Complete architecture diagrams and data flows
    ├── technology-comparison-matrix.md    # Multi-criteria weighted decision matrices
    └── branch-protection-guide.md         # Git branch protection and PR rules
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js**: v20.x or higher
- **Python**: v3.11 or higher
- **Git**

### 1. Frontend (React Native / Expo)

```bash
cd frontend
npm install
npm start
# Press 'i' for iOS Simulator, 'a' for Android Emulator, or 'w' for Web Browser
```

### 2. Core Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
# API running at http://localhost:4000/api/v1
```

### 3. AI & Vision Microservice (FastAPI)

```bash
cd ai-service
python -m venv venv
# Windows: .\venv\Scripts\activate | Unix: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# OpenAPI Docs available at http://localhost:8000/docs
```

---

## 🔒 Security & Compliance

FitFlow handles Protected Health Information (PHI) and operates under strict **HIPAA**, **GDPR**, and **CCPA** compliance:

1. **Data in Transit**: Enforced **TLS 1.3** transport encryption across all client, gateway, and microservice traffic.
2. **Data at Rest**: **AES-256-GCM** encryption on all PostgreSQL database volumes and object storage buckets.
3. **Row-Level Security (RLS)**: User health records and workout logs are partitioned at the database kernel level; users can never read or mutate records outside their authenticated tenant.
4. **GDPR Rights**: Automated endpoints for **Data Export** (`GET /api/v1/user/export`) and **Right to be Forgotten** (`DELETE /api/v1/user/account`).
5. **Secret Protection**: Automated git scanning with **TruffleHog** in CI/CD ensures zero secrets or API keys are committed.

---

## 📚 Essential Documentation Links

- 📄 **[Lab Exercise 05 Complete Report](file:///c:/Users/pawan/OneDrive/Documents/GitHub/fitflow-redesign-1/LAB_REPORT_05.md)**
- 📐 **[System Architecture &amp; Data Flows](file:///c:/Users/pawan/OneDrive/Documents/GitHub/fitflow-redesign-1/docs/system-architecture.md)**
- 📝 **[Architecture Decision Record (ADR-001)](file:///c:/Users/pawan/OneDrive/Documents/GitHub/fitflow-redesign-1/docs/architecture-decision-records/ADR-001-tech-stack-selection.md)**
- 📊 **[Technology Comparison &amp; Decision Matrix](file:///c:/Users/pawan/OneDrive/Documents/GitHub/fitflow-redesign-1/docs/technology-comparison-matrix.md)**
- 🛡️ **[Branch Protection &amp; Git Workflow Guide](file:///c:/Users/pawan/OneDrive/Documents/GitHub/fitflow-redesign-1/docs/branch-protection-guide.md)**

---

## 👥 Contributors

- **Pawan Gunadinghe(IT23675070)** - BSc (Hons) in Information Technology, Year 3, SLIIT
- **Module**: IT3060 - Human Computer Interaction (HCI)
