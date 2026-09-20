# FitFlow Redesign - Repository Configuration & Branch Protection Guide

This guide documents the repository settings, branch protection rules, code review workflows, and CI/CD policies established for the `fitflow-redesign` project repository.

---

## 1. Branch Strategy

The repository adheres to the **Trunk-Based / GitHub Flow** branching strategy:

* **`main`**: Production-ready branch. Direct pushes are disabled. Code enters only via approved and tested Pull Requests (PRs).
* **`develop`** (Optional / Staging): Integration branch for ongoing sprint cycles.
* **`feature/<issue-id>-<description>`**: Isolated branches for feature implementation (e.g., `feature/FF-102-camera-nutrition-logger`).
* **`fix/<issue-id>-<description>`**: Bugfix branches for targeted resolutions (e.g., `fix/FF-84-reanimated-drag-jank`).
* **`hotfix/<version>`**: Emergency patches directly branched from `main`.

---

## 2. Recommended Branch Protection Rules for `main`

To configure branch protection in GitHub Settings (`Settings` -> `Branches` -> `Add branch protection rule`):

1. **Branch Name Pattern**: `main`
2. **Require a pull request before merging**:
   - Check *Require approvals*: Minimum **1 approval** from senior/peer reviewers.
   - Check *Dismiss stale pull request approvals when new commits are pushed*.
   - Check *Require review from Code Owners* (`CODEOWNERS`).
3. **Require status checks to pass before merging**:
   - Check *Require branches to be up to date before merging*.
   - Required status checks:
     - `ci/frontend-lint-test`: Frontend ESLint, Prettier, and Jest unit tests.
     - `ci/backend-lint-test`: Backend NestJS linting, TypeScript compilation, and unit tests.
     - `ci/ai-service-lint-test`: AI Service Flake8/Black linting and PyTest validation.
     - `security/trufflehog`: Secret scanning to prevent leaked API keys.
4. **Require conversation resolution before merging**:
   - All review comments must be resolved before PR can be merged.
5. **Require signed commits**:
   - Ensure GPG/SSH commit signature verification for audit compliance (HIPAA audit trails).
6. **Do not allow bypassing the above settings**:
   - Applies rules to administrators as well.

---

## 3. GitHub Actions CI/CD Pipeline Overview

The CI pipeline is defined in `.github/workflows/ci.yml` and triggers automatically on:
- All pull requests targeting `main`
- Direct pushes to `main`

### Pipeline Stages:
1. **Security & Secret Scanning**: Checks code for accidentally committed environment secrets (`.env`, private keys).
2. **Frontend Validation**: Runs TypeScript checks, linting, and Jest test suite on React Native / Expo components.
3. **Backend Validation**: Compiles NestJS TypeScript, runs type checking, and executes API unit tests.
4. **AI Service Validation**: Executes Python type hints (`mypy`), linting (`ruff`/`flake8`), and PyTest for ML endpoint schemas.
5. **Artifact Validation**: Verifies documentation, OpenAPI / Swagger specs, and architectural diagrams.
