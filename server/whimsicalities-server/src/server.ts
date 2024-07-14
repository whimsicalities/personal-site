import express from 'express'
import cors from 'cors'
import configs from './config/configs';
import EnvironmentConfig from './config/EnvironmentConfig';
import { createClient } from 'redis';

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

const corsOptions = {
  origin: config.corsOrigin,
}

const connectToRedis = async () => {
  const client = createClient({
    url: 'redis://@redis:6379'
  });

  client.on('error', err => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
  console.log(value);
}

app.get('/healthcheck', cors(corsOptions), (req, res) => {
  res.send(true);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToRedis();
})