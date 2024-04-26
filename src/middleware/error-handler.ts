import { CustomError } from "@vizlogic/commonsameer";
import { Request, Response, NextFunction } from "express";

export const errorHandlerLogged = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {    
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    message: err.message,
  });
};
