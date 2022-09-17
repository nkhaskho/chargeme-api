
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connection = require("./config/db")
const users = require('./routes/users')
const stations = require('./routes/stations')
const auth = require('./routes/auth')
const reviews = require('./routes/reviews')
const chargepoints = require('./routes/charge-points')
const reservations = require('./routes/reservations')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

require('dotenv').config();

// create new express app
const app = express()

// connect to database
connection();

app.use(cors())
app.use(morgan('combined'))

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/api", [auth, users, stations,reviews,chargepoints,reservations]);

app.get('/', (req, res) => {
  res.json({ test: 'Hello Naiim!'})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
