FROM node:20.10.0-slim as development

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

FROM development as builder

COPY . .

RUN npm run build


FROM nginx:1.25.3 as production
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
