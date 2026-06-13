import { EmailService } from "../../utils/email";
import { OrganizationLoginDto } from "./auth.dto";
import { OrganizationService } from "../organization/organization.service";
import { UnauthorizedException } from "../../utils/exceptions";
import { LoginCode } from "./login-code.model";
import bcrypt from 'bcrypt';

interface LoginResult {
    isVerified: boolean;
    emailSent: boolean;
}

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
        private readonly organizationService: OrganizationService
    ) { }

    async organizationLogin({ email, code }: OrganizationLoginDto): Promise<LoginResult> {
        const organization = await this.organizationService.getOrganizationByEmail(email);
        if (!organization) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (!code) {
            await this.sendLoginCode(email, organization.name);
            return { isVerified: false, emailSent: true };
        }

        const isVerified = await this.verifyLoginCode(email, code);
        if (!isVerified) {
            throw new UnauthorizedException('Invalid code');
        }

        return { isVerified: true, emailSent: false };
    }

    private async sendLoginCode(email: string, organizationName: string) {
        const expiresInMinutes = 10;

        await LoginCode.deleteMany({ email });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = await bcrypt.hash(code, 10);
        const loginCode = await LoginCode.create({
            email,
            code: hashedCode,
            expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000)
        });

        await this.emailService.sendEmail({
            to: email,
            subject: 'Your Quorum login code',
            template: 'login-code',
            data: { code, organizationName, expiresInMinutes }
        });
        return { isVerified: false, emailSent: true };
    }

    private async verifyLoginCode(email: string, code: string): Promise<boolean> {
        const loginCode = await LoginCode.findOne({ email });
        if (!loginCode) {
            throw new UnauthorizedException('Invalid code');
        }
        if (loginCode.expiresAt < new Date()) {
            throw new UnauthorizedException('Code expired');
        }
        return bcrypt.compare(code, loginCode.code);
    }
}