import type { Response, Request, NextFunction } from 'express';
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY as Secret;
if (!SECRET) {
    throw new Error("JWT_SECRET_KEY is missing in environment variables.");
}

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        const payload = decoded as JwtPayload;

        if (!payload.id) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        // Attach user id to request
        req.user = { id: payload.id };

        next();
    });
}
