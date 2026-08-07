FROM node:22-alpine

# Build arguments
ARG BUILD_DATE
ARG APP_VERSION

# Environment variables
ENV BUILD_DATE=$BUILD_DATE
ENV APP_VERSION=$APP_VERSION
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]