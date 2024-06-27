FROM node:20-alpine
# Create these directories so that our permissions are correct later
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# Ensure that application files belong to node instead of root
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "dist/server.js" ]