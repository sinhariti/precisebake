# Multi-stage build

# --- Frontend Build Stage ---
    FROM node:20-alpine AS frontend-build

    WORKDIR /app/frontend
    
    # Copy frontend package.json and install dependencies
    COPY frontend/package*.json ./
    RUN npm install
    
    # Copy frontend source code
    COPY frontend/ ./
    
    # Build the frontend
    RUN npm run build
    
    # --- Backend Build Stage ---
    FROM node:20-alpine AS backend-build
    
    WORKDIR /app/backend
    
    # Copy backend package.json and install dependencies
    COPY backend/package*.json ./
    RUN npm install --production
    
    # Copy backend source code
    COPY backend/ ./
    
    # --- Production Stage ---
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Copy built frontend from frontend-build stage
    COPY --from=frontend-build /app/frontend/dist ./public
    
    # Copy backend from backend-build stage
    COPY --from=backend-build /app/backend ./
    
    # Expose the port that the app listens on
    EXPOSE 8080
    
    # Set environment variable
    ENV NODE_ENV production
    
    # Serve static files from frontend
    RUN npm install serve -g
    
    # Start the app
    CMD ["serve", "-s", "public", "-l", "3001"]