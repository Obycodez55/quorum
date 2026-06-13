import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { EmailService } from "../../utils/email";
import { OrganizationService } from "../organization/organization.service";
import { AuthGuard } from "../../utils/auth-guard";

const router = Router()
const emailService = new EmailService();
const organizationService = new OrganizationService();
const authService = new AuthService(emailService, organizationService);
const authController = new AuthController(authService)
const authGuard = new AuthGuard();

router.post('/login', authController.login);
router.post('/logout', authGuard.authorise(), authController.logout);

export default router;