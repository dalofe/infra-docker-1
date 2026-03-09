# Full-Stack CI/CD Pipeline & Container Orchestration

## Overview
This repository serves as a proof-of-concept for modern infrastructure practices, showcasing a fully containerized, decoupled web application. It demonstrates the complete software development lifecycle (SDLC) from local development to continuous deployment using immutable artifacts.

The project consists of a React/TypeScript frontend and a Node.js REST API backend, orchestrated via Docker and automatically deployed to the cloud using GitHub Actions.

## Architecture & Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, Express, CORS
* **Containerization:** Docker, Docker Compose (Multi-stage builds)
* **Web Server:** Nginx (Alpine)
* **CI/CD:** GitHub Actions
* **Artifact Registry:** GitHub Container Registry (GHCR)
* **Cloud Provider:** Render (PaaS)

## Infrastructure Design

### 1. Container Strategy
* **Frontend Container:** Utilizes a multi-stage build. Stage 1 uses Node.js to compile the Vite/React application. Stage 2 serves the static `dist` files using a lightweight Nginx server, keeping the production image minimal and secure.
* **Backend Container:** Runs a streamlined Node.js Alpine image, installing only production dependencies to minimize attack surface and image size.

### 2. CI/CD Pipeline
The automated workflow (`ci.yml`) is triggered on every push to the `main` branch:
1. **Build Validation:** Spins up an Ubuntu runner to build Docker images, ensuring no compilation or dependency errors.
2. **Artifact Creation:** Tags and pushes the verified images to the GitHub Container Registry (GHCR).
3. **Dynamic Environment Injection:** Passes production backend URLs to the Vite build process via Docker `--build-arg`, seamlessly connecting the decoupled services.
4. **Continuous Deployment:** Cloud environments automatically pull the latest tagged images from GHCR and roll out the updates with zero downtime.

## Running Locally

To run the entire ecosystem locally without installing Node.js or project dependencies, you only need Docker Desktop installed.

1. Clone the repository:
   ```bash
   git clone [https://github.com/dalofe/infra-docker-1.git](https://github.com/dalofe/infra-docker-1.git)
   cd infra-docker-1