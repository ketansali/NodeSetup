require('dotenv').config()
require('./config/db')

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const corsOptionsDelegate = require('./middleware/cors')
const routes = require('./routes/index')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/404')

const app = express()
app.use('/uploads', express.static('uploads'))

const swaggerJson = require('./swagger/swagger.json')
const swaggerUi = require("swagger-ui-express");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// format
app.use(
  express.json({
    limit: '1024mb',
  }),
)
app.use(
  express.urlencoded({
    limit: '1024mb',
    extended: true,
  }),
)

// cors
app.use(cors(corsOptionsDelegate))

// fileupload
app.use(fileUpload())

// api routes
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(notFound)

// error handler
app.use(errorHandler)

app.listen(process.env.port || 8080)
