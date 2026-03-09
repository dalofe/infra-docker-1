# Use a lightweight Node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package*.json ./

# KEY DIFFERENCE: Install ONLY production dependencies.
# Ignore devDependencies (nodemon, jest, eslint, etc.) for a smaller, more secure image.
RUN npm install --production

# Copy the rest of the API source code
COPY . .

# Expose the port where the API listens (assuming 3000)
EXPOSE 3000

# The command to keep the application running
CMD ["node", "index.js"]