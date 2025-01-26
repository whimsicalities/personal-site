# Build and push containers

cd client/whimsicalities;
docker build -t whimsicalities/personal-site:whimsicalities-client --no-cache --build-arg CONFIGURATION=production .;
docker push whimsicalities/personal-site:whimsicalities-client;
cd ../../server/whimsicalities-server;
docker build -t whimsicalities/personal-site:whimsicalities-server --no-cache .;
docker push whimsicalities/personal-site:whimsicalities-server;