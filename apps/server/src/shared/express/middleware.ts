import { Request, Response } from "express";

export function errorHandler(err: Error, _req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).send("Not Found");
}
