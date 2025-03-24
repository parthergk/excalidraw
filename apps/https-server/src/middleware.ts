import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token is missing or invalid" });
    return;
  }

  const verfiy = Jwt.verify(token, JWT_SECRET);
  if (verfiy) {
    req.userId = (verfiy as JwtPayload).userId;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
