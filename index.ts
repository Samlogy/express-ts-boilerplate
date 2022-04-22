import express, { Application, NextFunction, Request, Response } from 'express'

import config from './config'
import { globalErrorHandler } from './controllers/errorController'
import route from './routes/route'
import { AppError } from './utils/appError'
import corsOptions from './utils/corsOptions'
import dbPrisma from './utils/connectPrisma'
import dbMongo from './utils/connectMongo'
import cache from './utils/cache'
require('dotenv').config({ path: './config.dev.env' })

const port = config.port as number
const host = config.host as string

const app: Application = express()

// request body as JSON + set a limit of 10Kb in the body request
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// cors options
corsOptions(app)

// secure app
// security(app)

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
    console.log(`server`)

    // connect to MongoDB
    // dbMongo()

    // connect to Prisma Postgresql
    // dbPrisma

    // cache DB
    cache

    // Routes
    // route('/api', app)
})
