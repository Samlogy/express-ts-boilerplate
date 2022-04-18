import Express, { Application } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
const xssCleaner = require('xss-clean')

export default function (app: Application) {
    // helmet
    app.use(helmet()) // recommended to be done early

    // rate limiting
    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 100, // Limit each IP to 100 create account requests per `window` (here, per hour)
        message:
            'Too many accounts created from this IP, please try again after an hour',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    app.use(limiter) //  apply to all requests

    // data sanitization against NoSQL Injection Attacks
    app.use(mongoSanitize())

    // data sanitization against XSS to prevent HTML code inside DB
    app.use(xssCleaner())
}
