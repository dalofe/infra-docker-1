# Frontend Service: React App

This is the frontend client for our application, built with React, TypeScript, and Vite. 
It is designed to be served via Nginx in production but can be run independently for local UI development.

## Local Development (Without Docker)

If you need to develop UI components rapidly without spinning up the entire Docker ecosystem, you can run this service standalone:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. The application will be available at `http://localhost:5173`.

> **Note:** When running standalone, ensure the backend service is also running locally if you need API connectivity.