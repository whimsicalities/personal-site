# Multi stage dockerfile to build angular app and then serve it with nginx

# Run with --build-arg option for other environments eg production
ARG CONFIGURATION=development

FROM node:20-alpine AS build
ARG CONFIGURATION
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm install -g @angular/cli@18.0.3
RUN npm run build -- --configuration ${CONFIGURATION}

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/app/dist/whimsicalities/browser /usr/share/nginx/html