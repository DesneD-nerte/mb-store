# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend/api-gateway ./apps/backend/api-gateway
COPY packages ./packages

# Build the application
RUN pnpm nx build mb-store-backend-api-gateway

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm for production dependencies
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

# Copy built application
COPY --from=builder /app/dist/apps/backend/api-gateway ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "main.js"]

