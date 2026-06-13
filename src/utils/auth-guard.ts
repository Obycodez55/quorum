import jwt from 'jsonwebtoken';
import config from "../config/config";
import { UnauthorizedException } from "./exceptions";
import { NextFunction, Request, Response } from 'express';

export class AuthGuard {

    authorise = () => async (request: Request, resposne: Response, next: NextFunction) => {
        const token = request.cookies[config.cookieName];
        const { email, id } = await this.validateToken(token);
        (request as any).organization = {
            email,
            id
        }
        next();
    }

    private async validateToken(token: string) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            return decoded as { email: string, id: string };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}