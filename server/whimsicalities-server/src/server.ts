import express from 'express'
import cors from 'cors'

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
}

app.get('/healthcheck', cors(corsOptions), (req, res) => {
  res.send(true);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})