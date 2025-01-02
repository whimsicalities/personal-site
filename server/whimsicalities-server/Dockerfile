FROM node:20-alpine
# Consume arg into the build scope
# Create these directories so that our permissions are correct later
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
# The next copy commands copy the application files
# Ensure that application files belong to node instead of root
COPY --chown=node:node src ./src/
COPY --chown=node:node tsconfig.json ./
RUN npm run compile
CMD [ "node", "dist/src/server.js" ]