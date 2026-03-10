# ─── Stage 1: deps ───────────────────────────────────────────────
# Install all dependencies (including devDeps needed at build time)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# ─── Stage 2: builder ────────────────────────────────────────────
# Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (not secrets)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ─── Stage 3: runner ─────────────────────────────────────────────
# Final image — as small as possible
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run as non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Copy only what is needed at runtime
COPY --from=builder /app/public   ./public
COPY --from=builder /app/messages ./messages

# Next.js standalone output (configured in next.config.js)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]