import express, { Application, Request, Response, NextFunction } from 'express'
const cors = require('cors')
require('dotenv').config({ path: './config.dev.env' })

import config from './config'
import log from './utils/logger'
import security from './security'
import db from './utils/connectMongo'
import route from './routes/route'
import cache from './utils/cache'

const port = config.port as number
const host = config.host as string

import { AppError } from './utils/appError'
import { globalErrorHandler } from './controllers/errorController'

const app: Application = express()

// request body as JSON + set a limit of 10Kb in the body request
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

const allowList = ['http://localhost:3000']

const corsManip = (req: Request, callback: any) => {
    let corsOptions
    const origin = req.header('Origin') as string

    if (allowList.indexOf(origin) !== -1) {
        corsOptions = { origin: true } // enable requested origin in cors response
    } else {
        corsOptions = { origin: false } // disable cors in reponse
    }
    callback(null, corsOptions)
}

app.use(cors(corsManip))

// secure app
security(app)

// environment (dev - prod)
if (process.env.NODE_ENV === 'prod') {
    app.all('*', (req, res, next) => {
        if (req.secure) return next()
        else if (req.hostname == 'backend') next()
        return res.redirect(
            307,
            `https://${req.hostname}:${app.get('secPort')}${req.url}`
        )
    })
}

// handle inexistant routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    // if we pass something to next() express will assume it is an error object and call Global error handling middlware immedialtly
    next(AppError(res, `the url ${req.originalUrl} is not found`, 404, false))
})

// Global Error handling middleware
app.use(globalErrorHandler)

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`)

    // connect to MongoDB
    db()

    // cache DB
    cache

    // Routes
    route(app)
})
