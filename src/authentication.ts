import { Request, Response, NextFunction } from "express";
import passport from "passport";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "Bearer") {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
        if (err || !user) {
          reject(new Error("Unauthorized"));
        } else {
          resolve(user);
        }
      })(request, {} as Response, (() => {}) as NextFunction);  // ← null → {} as Response, (() => {}) as NextFunction
    });
  }
  return Promise.reject(new Error("Unknown security"));
}