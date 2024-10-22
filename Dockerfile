# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /frontend

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve
FROM nginx:1.20.0-alpine

# Copy the output of the build from the previous stage
COPY --from=build /frontend/.next /usr/share/nginx/html/.next
COPY --from=build /frontend/public /usr/share/nginx/html/public
COPY --from=build /frontend/next.config.js /usr/share/nginx/html/next.config.js

# Optionally, you can copy other required files or directories

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
