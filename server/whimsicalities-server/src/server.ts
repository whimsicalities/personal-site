import express from 'express'
import { createServer } from 'http';
import cors, { CorsOptions } from 'cors'
import { Server } from 'socket.io';
import configs from './config/configs';
import EnvironmentConfig from './config/EnvironmentConfig';
import { createClient } from 'redis';
import increaseStatRoute from './routes/stats/increaseStatRoute';
import getStatRoute from './routes/stats/getStatRoute';
import { WhimsicalitiesRedisClient } from './types/WhimsicalitiesRedisClient';
import { PET_STATS } from './PET_STATS';
import doStatDecayForever from './statDecay/doStatDecayForever';

let config: EnvironmentConfig;

switch (process.env.environment) {
  case "local": {
    config = configs.local;
    break;
  }
  case "test": {
    config = configs.test;
    break;
  }
  case "production": {
    config = configs.prod;
    break;
  }
  default:
    throw new Error(`Unsupported environment ${process.env.environment}`);
}

const app = express();
// Creating the server ourselves rather than letting express create it
// will let us also run the websocket on the same port
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ["GET", "POST"]
  }
});

const port = config.port;
app.use(express.json()); // For parsing JSON post bodies

const corsOptions: CorsOptions = {
  origin: config.corsOrigin,
  optionsSuccessStatus: 200,
}
app.options('*', cors(corsOptions)); // Configure CORS preflight OPTIONS response for all endpoints

const connectToRedis = async (): Promise<WhimsicalitiesRedisClient> => {
  const redisClient = createClient({
    url: config.redisUrl,
  });

  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();

  // Check that stats exist, and set to initial value if not
  const initialValue = 50;
  for (const stat of PET_STATS) {
    const exists = await redisClient.exists(stat);
    if (exists === 0) { // Should be 1 if exists
      await redisClient.set(stat, initialValue);
    }
  }
  return redisClient;
}

connectToRedis().then(
  (redisClient) => {
    doStatDecayForever(config.decaySpeedSeconds, redisClient, io);

    // Set up routes
    increaseStatRoute(app, io, corsOptions, redisClient);
    getStatRoute(app, corsOptions, redisClient);
    app.get('/healthcheck', cors(corsOptions), (req, res) => {
      res.send(true);
    });
    server.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });
  },
  (error) => {
    console.log("Failed to start server. Error: " + error);
  }
)