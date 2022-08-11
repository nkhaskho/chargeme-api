
const express = require('express')
const connection = require("./config/db")
const users = require('./routes/users')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

require('dotenv').config();

// create new express app
const app = express()

// connect to database
connection();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/api", [users]);

app.get('/', (req, res) => {
  res.json({ test: 'Hello Naiim!'})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
