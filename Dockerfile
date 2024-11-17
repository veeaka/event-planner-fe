# Use Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn 

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Use a lightweight web server to serve the built files
FROM nginx:alpine AS production

# Copy build output to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
