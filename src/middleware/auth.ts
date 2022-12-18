import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
import UserInstance from "../model/usersModel";

export async function auth(req: Request | any, res: Response, next: NextFunction) {
  // console.log(req.cookies);
  // console.log(req.signedCookies);
  try {
    const authorization = req.cookies.auth;
    if (!authorization) {
      return res.status(401).send({
        Error: "Kindly sign in as a user",
      });
    }
    const token = authorization;
    
    let verified = jwt.verify(token, secret);
    // console.log(verified)

    if (!verified) {
      return res.status(401).json({
        Error: "User not verified, you cant access this route",
      });
    }

    const { _id } = verified as { [key: string]: string };
    const user = await UserInstance.findOne( { _id } );
    if (!user) {
      return res.status(404).json({
        Error: "User not verified",
      });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({
      Error: "User not logged in",
    });
  }
}
