import express from 'express'
import cors, { CorsOptions } from 'cors'
import configs from './config/configs';
import EnvironmentConfig from './config/EnvironmentConfig';
import { createClient } from 'redis';
import increaseStatRoute from './routes/stats/increaseStatRoute';
import getStatRoute from './routes/stats/getStatRoute';
import { WhimsicalitiesRedisClient } from './types/WhimsicalitiesRedisClient';

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
  default:
    throw new Error(`Unsupported environment ${process.env.environment}`);
}

const app = express();
const port = config.port;

const corsOptions: CorsOptions = {
  origin: config.corsOrigin,
}

const connectToRedis = async (): Promise<WhimsicalitiesRedisClient> => {
  const redisClient = createClient({
    url: config.redisUrl,
  });

  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();

  // await redisClient.set('key', 'value');
  // const value = await redisClient.get('key');
  // console.log(value);

  return redisClient;
}

connectToRedis().then(
  (redisClient) => {
    increaseStatRoute(app, corsOptions, redisClient);
    getStatRoute(app, corsOptions, redisClient);
    app.get('/healthcheck', cors(corsOptions), (req, res) => {
      res.send(true);
    });
    app.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });
  },
  (error) => {
    console.log("Failed to start server. Error: " + error);
  }
)