# Architecture Decision Record (ADR-001)

## Title: Selection of Core Cross-Platform Mobile Frontend, Modular Backend, and AI Microservices Architecture for FitFlow Redesign

- **Status**: Accepted
- **Date**: 2026-09-20
- **Authors**: FitFlow Engineering & Architecture Team
- **Stakeholders**: Product Manager Priya Sharma, Engineering Team, Data Science Team, Compliance Officers

---

## 1. Context and Problem Statement

FitFlow is a mid-sized health-tech mobile fitness platform undergoing a full-scale redesign following significant user attrition (user retention dropped sharply, store rating fell from 4.6 to 3.8 stars, and 68% of users dropped off after onboarding). User research and stakeholder discovery identified the need for:
1. **AI-Driven Personalization**: Dynamic, adaptive daily workout plans ("Daily Flow") that adapt to irregular user schedules (e.g., persona Alex Rivera).
2. **Seamless Multi-Platform Experience**: High performance across iOS, Android, and Web with 60–120 FPS animation fluidity for interactive workout flows and drag-and-drop exercise routines.
3. **Computer-Vision-Powered Nutrition Logging**: Camera-based instant meal recognition to eliminate the high friction of manual logging.
4. **Real-Time Community & Social Circles**: Interactive group challenges, private accountability circles (e.g., persona Priya Singh), and live activity feeds.
5. **Strict Health Data Compliance**: Handling sensitive user biometric and physical health data under GDPR, CCPA, and HIPAA compliance mandates.
6. **Mid-Sized Team Constraints**: The engineering team must maximize development speed, maintain a single cross-platform client codebase, minimize long-term operational maintenance overhead, and ensure rapid feature delivery.

---

## 2. Decision Drivers

* **Time to Market & Velocity**: Rapid delivery of cross-platform mobile apps and web dashboards from a unified engineering team.
* **UI/UX Performance**: Native-feeling gesture response, drag-and-drop builders, and complex workout animation execution without frame drops.
* **AI & Computer Vision Integration**: Low-latency edge and cloud execution of deep learning models for food recognition and workout personalization.
* **Regulatory Compliance & Data Integrity**: ACID transactional guarantees for health/nutrition records, strong encryption, and compliance auditability.
* **Cost Efficiency**: Avoiding vendor lock-in while leveraging managed services where operational ROI is highest.

---

## 3. Considered Options

### Frontend Layer:
1. **React Native (with Expo & TypeScript)**
2. **Flutter (Google / Dart)**
3. **Kotlin Multiplatform (KMP)**
4. **Native Development (Swift/SwiftUI & Kotlin/Jetpack Compose)**

### Backend Layer:
1. **Node.js with NestJS (TypeScript)**
2. **Python with FastAPI**
3. **Go (Golang with Gin/Fiber)**

### Database Layer:
1. **PostgreSQL (Relational + JSONB + TimescaleDB)**
2. **MongoDB (Document Store)**
3. **Firebase Firestore (NoSQL Document Store)**
4. **Amazon DynamoDB (Key-Value Store)**

### Authentication Layer:
1. **Firebase Authentication**
2. **Supabase Auth (GoTrue / PostgreSQL RLS)**
3. **AWS Cognito**
4. **Auth0 by Okta**

---

## 4. Decision Outcome

We have decided to adopt a **Polyglot Modular Architecture** comprising:
1. **Frontend**: **React Native with Expo & TypeScript** (using React Native Reanimated for high-performance workout animations and React Native for Web for responsive web dashboards).
2. **Core API Gateway & Backend Services**: **Node.js with NestJS** for business logic, user management, workout scheduling, and social circles.
3. **Dedicated AI & Vision Microservice**: **Python with FastAPI** serving PyTorch/TensorFlow models for camera-based instant food macro recognition and dynamic workout recommendation generation.
4. **Primary Database**: **PostgreSQL** (hosted on Supabase/AWS RDS) for relational integrity, ACID compliance, structured biometric logs, and Row-Level Security (RLS).
5. **Real-Time & Caching Layer**: **Redis** for distributed session caching, rate limiting, and leaderboard rankings, combined with **Firebase Firestore / WebSockets** for low-latency social circle discussions and live challenge feeds.
6. **Authentication & Authorization**: **Supabase Auth / Firebase Auth** leveraging JWT tokens, OAuth 2.0 (Apple, Google), biometric device unlock, and role-based access control (RBAC).

---

## 5. Rationale & Analysis

### 5.1 Frontend: React Native (Expo)
* **Code Reusability**: >90% shared business and UI logic across iOS, Android, and Web (`react-native-web`), drastically lowering the total cost of ownership (TCO).
* **Developer Velocity**: Hot reload, TypeScript static typing, and the extensive React ecosystem enable rapid iteration of user feedback loops (evident from our SUS score improvement from 68 to 87).
* **Device Capabilities**: Seamless camera access via `expo-camera` and on-device ML execution via TensorFlow Lite / ONNX mobile runtime.
* **Animation & Gestures**: React Native Reanimated 3 runs worklets on the native UI thread, guaranteeing 60+ FPS during intense workout guidance and drag-and-drop exercise customization.

### 5.2 Backend: Node.js (NestJS) + Python (FastAPI)
* **TypeScript Uniformity**: Sharing DTOs and validation schemas between the React Native frontend and NestJS backend eliminates serialization mismatch errors.
* **NestJS Modularity**: Enterprise-ready architecture with strict dependency injection, clear domain separation (Workouts, Nutrition, Social, Analytics), and built-in support for WebSockets and microservice message brokers.
* **FastAPI for AI Isolation**: Heavy computer vision libraries (OpenCV, PyTorch, torchvision) and tensor manipulations are native to Python. Separating this into an independent FastAPI service prevents CPU-bound inference spikes from blocking core I/O API endpoints.

### 5.3 Data Layer: PostgreSQL + Redis + Firestore
* **PostgreSQL**: Health, nutrition, and workout metrics require strong schema integrity and strict relational mapping (e.g., User -> WorkoutPlan -> Exercise -> Sets/Reps; User -> DailyNutritionLog -> MealItem -> Micronutrients). JSONB columns provide flexibility for semi-structured sensor data.
* **Redis**: Provides sub-millisecond cache latency for hot workout metadata, session tokens, and real-time community challenge leaderboards.
* **Real-time Engine**: WebSockets via NestJS / Firestore listeners deliver instant notification delivery for private accountability groups.

---

## 6. Consequences & Trade-offs

### Positive Consequences
* **Unified Development Language**: TypeScript spans client, API gateway, and backend services, maximizing full-stack team productivity.
* **Optimized Resource Utilization**: Compute-intensive computer vision tasks scale independently from standard database transactions.
* **Robust Compliance Posture**: PostgreSQL's audit logs, Row-Level Security, and explicit schema constraints guarantee GDPR/HIPAA-compliant data handling.
* **Smooth User Experience**: Zero-lag workout transitions and camera-based food recognition within < 800ms.

### Negative Consequences & Mitigations
* **Microservice Network Overhead**: Calls between NestJS and the AI service introduce inter-service latency.
  * *Mitigation*: Deploy services in the same VPC/internal network using gRPC or high-throughput HTTP/2, with asynchronous job queuing (BullMQ / Celery) for non-blocking analysis.
* **Two Programming Environments (Node.js & Python)**: The engineering team must maintain dual runtimes and deployment pipelines.
  * *Mitigation*: Standardized Docker containers, unified CI/CD pipelines in GitHub Actions, and centralized observability (Prometheus/Grafana and Sentry).

---

## 7. Compliance & Security Verification
* **HIPAA/GDPR Compliance**: End-to-end TLS 1.3 transport encryption, AES-256 database-at-rest encryption, automated data retention policies, and cryptographically signed JWT access tokens with short lifetimes.
* **Data Anonymization**: AI training and telemetry pipelines strip all Personally Identifiable Information (PII) before model fine-tuning.
