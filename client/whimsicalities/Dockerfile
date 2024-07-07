# Multi stage dockerfile to build angular app and then serve it with nginx

FROM node:20-alpine as build
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm install -g @angular/cli@18.0.3
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/app/dist/whimsicalities/browser /usr/share/nginx/html