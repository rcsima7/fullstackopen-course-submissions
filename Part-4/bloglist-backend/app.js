const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogentries')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogentries', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app