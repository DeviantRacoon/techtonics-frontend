# --- Build using official Node image ---
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies with cache for faster rebuilds
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Production image using official Node ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER node
EXPOSE 3000
CMD ["npm", "start"]

# --- Build using system Node packages ---
FROM alpine:3.18 AS builder-system
WORKDIR /app
RUN apk add --no-cache nodejs npm
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Production image using system Node packages ---
FROM alpine:3.18 AS runner-system
WORKDIR /app
RUN apk add --no-cache nodejs npm && \
    addgroup -S node && adduser -S node -G node
ENV NODE_ENV=production

COPY --from=builder-system /app/public ./public
COPY --from=builder-system /app/.next ./.next
COPY --from=builder-system /app/node_modules ./node_modules
COPY --from=builder-system /app/package*.json ./

USER node
EXPOSE 3000
CMD ["npm", "start"]
