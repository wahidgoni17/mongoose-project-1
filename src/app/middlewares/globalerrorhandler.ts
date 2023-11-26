import { NextFunction, Request, Response } from "express";
const GlobalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || "things just got out of hand";
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default GlobalErrorHandler
