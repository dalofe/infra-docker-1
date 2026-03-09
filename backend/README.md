# Backend Service: Node.js API

This is the backend REST API for our application, built with Node.js and Express.
It is designed to run as a microservice within a Docker container but can be executed independently for local development and testing.

## Local Development (Without Docker)

If you need to test endpoints or develop new features without spinning up the entire Docker ecosystem, you can run this service standalone:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Node server:
   ```bash
   npm start
   ```

3. The API will be listening at `http://localhost:3000`.

## Available Endpoints

* `GET /api/status`: Returns a JSON object verifying the connection status and current timestamp.