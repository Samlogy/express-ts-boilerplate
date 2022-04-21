import { Application, Express } from 'express'

// import { Create, Update, getAll, Delete } from '../controllers/controller'

export default function (route: string, app: Application) {
    app.get('/check-health', (req, res) => res.send('its working'))

    // prisma
    // app.get(`${route}/get`, getAll)
}
