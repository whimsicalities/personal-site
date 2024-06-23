import express from 'express'

const app = express();
const port = 3000

app.get('/:greeting', (req, res) => {
  res.send(req.params.greeting);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})