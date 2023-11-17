const connectToMongo = require("./db")
const express = require('express')
const User= require('./models/Users');
const property= require('./models/Property');
const cors = require('cors')
const path = require('path');

connectToMongo();
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/property',require('./routes/property'))
app.use('/api/transaction',require('./routes/transaction'))
app.use('/api/contract',require('./routes/contract'))
app.use('/api/payment',require('./routes/payment'))


app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '/dist/index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})