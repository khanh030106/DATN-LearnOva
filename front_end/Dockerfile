FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci

COPY . .

# Relative path so the browser calls same-origin `/api/learnova/...`, which
# Nginx below reverse-proxies to the backend container — no CORS, no domain
# baked into the build.
ARG VITE_API_URL=/api/learnova
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
