const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ["./routes/users.js", "./routes/stations.js", "./routes/reviews.js", "./routes/chargepoints.js",'./routes/reservations']

const doc = {
    info: {
        version: "1.0.0",
        title: "ChargeMe API",
        description: "The <b>ChergeMe</b> API Documentation."
    },
    schemes: ['http'],
    host: `localhost:3000`,
    basePath: "/api",
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
})