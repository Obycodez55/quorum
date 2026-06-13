import { CookieOptions, Request, Response } from "express";
import { OrganizationLoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import config from "../../config/config";
import { ResponseDto, ResponseStatus } from "../../dtos/response.dto";


const COOKIES_OPTIONS = {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: 'strict',
} as CookieOptions;

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    async login(req: Request<{}, {}, OrganizationLoginDto>, res: Response) {
        const result = await this.authService.organizationLogin(req.body);
        if (result.emailSent) {
            const response = new ResponseDto(ResponseStatus.SUCCESS, 'Login successful', result);
            res.cookie(config.cookieName, result.token, COOKIES_OPTIONS);
            return res.status(200).send(response);
        }
        return res.status(200).send(new ResponseDto(ResponseStatus.SUCCESS, 'Login code sent'));
    }

    async logout(req: Request, res: Response) {
        res.clearCookie(config.cookieName);
        return res.status(200).send(new ResponseDto(ResponseStatus.SUCCESS, 'Logout successful'));
    }
}