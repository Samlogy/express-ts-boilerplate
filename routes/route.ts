import { Application, Express } from 'express'

export default function (app: Application) {
    app.get('/check-health', (req, res) => res.send('its working'))
}
