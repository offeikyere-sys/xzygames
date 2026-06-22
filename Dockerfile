# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY backend/ ./backend/
COPY --from=build /app/dist ./dist

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port
EXPOSE 5050

# Start the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5050", "--app-dir", "/app/backend"]
