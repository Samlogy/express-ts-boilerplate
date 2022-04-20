import express, { Application, Request, Response, NextFunction } from 'express'
require('dotenv').config({ path: './config.dev.env' })

import config from './config'
import security from './security'
import db from './utils/connectMongo'
import route from './routes/route'
import cache from './utils/cache'
import corsOptions from './utils/corsOptions'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const port = config.port as number
const host = config.host as string

import { AppError } from './utils/appError'
import { globalErrorHandler } from './controllers/errorController'

const app: Application = express()

// request body as JSON + set a limit of 10Kb in the body request
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// cors options
corsOptions(app)

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
    console.log(`Server listing at http://${host}:${port}`)

    // connect to MongoDB
    // db()

    // connect to Prisma Postgresql

    // cache DB
    // cache

    // Routes
    route(app)
})
