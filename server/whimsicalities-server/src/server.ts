import express from 'express'
import cors from 'cors'
import configs from './config/configs';
import EnvironmentConfig from './config/EnvironmentConfig';

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

app.get('/healthcheck', cors(corsOptions), (req, res) => {
  res.send(true);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})