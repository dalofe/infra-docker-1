# ==========================================
# STAGE 1: Builder
# ==========================================
# Use the official Node image (version 18, lightweight 'alpine' variant)
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (best practice for Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Define an argument that Docker will expect during the build process
ARG VITE_API_URL

# Convert that argument into an Environment Variable for the Node/Vite process
ENV VITE_API_URL=$VITE_API_URL

# Build the React/TS application (generates the /dist directory)
RUN npm run build


# ==========================================
# STAGE 2: Web Server (Production)
# ==========================================
# Use Nginx, a blazing-fast and lightweight web server
FROM nginx:alpine

# Here is where the magic happens!
# We take the compiled artifact from STAGE 1 (builder).
# Copy it to the default path where Nginx serves static files.
# Note: Vite uses 'dist', while Create React App uses 'build'.
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Expose port 80 to document where Nginx listens
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]