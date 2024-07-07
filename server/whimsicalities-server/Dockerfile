FROM node:20-alpine
# Create these directories so that our permissions are correct later
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
ENV environment test
RUN npm install
# Ensure that application files belong to node instead of root
COPY --chown=node:node . .
RUN npm run compile
EXPOSE 8080
CMD [ "node", "dist/server.js" ]