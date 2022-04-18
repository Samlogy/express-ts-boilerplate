import { Request, Response } from "express";


export async function exampleController(req: Request, res: Response) {
   // call services (reusable code) then return

  return res.status(200).send({
    success: true,
    data: 'something'
  });
};