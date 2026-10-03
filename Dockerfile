# ==============================================================================
# DOCKERFILE MULTI-STAGE: SUPERHERO HUB
# Optimizado para GitHub Container Registry (GHCR) y Render Web Service
# ==============================================================================

# STAGE 1: Compilación y Bundling con Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias con caché optimizado
COPY package*.json ./
RUN npm ci

# Copiar código fuente y compilar bundle para producción
COPY . .
RUN npm run build

# STAGE 2: Runtime de Producción Ultraligero
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=10000

# Copiar artefactos compilados y servidor de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Usuario sin privilegios de root para máxima seguridad
USER node

# Exponer puerto estándar de Render
EXPOSE 10000

# Monitoreo de salud activo
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:10000/healthz || exit 1

# Comando de inicio del servidor con /healthz
CMD ["node", "server.js"]
