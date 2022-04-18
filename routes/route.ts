import { Express } from "express";


export default function (app: Express) {
  app.get('/check-health', (req, res) => res.send('its working'))
}