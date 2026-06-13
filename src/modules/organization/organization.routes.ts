import { Router } from "express";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { Validator } from "../../utils/validator";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./organization.dto";
import { AuthGuard } from "../../utils/auth-guard";


const router = Router();
const organizationService = new OrganizationService();
const organizationController = new OrganizationController(organizationService);
const validator = new Validator();
const authGuard = new AuthGuard();



router.post('/', validator.validate(CreateOrganizationDto), organizationController.createOrganization);
router.get('/:organizationId', authGuard.authorise(), organizationController.getOrganizationById);
router.put('/:organizationId', validator.validate(UpdateOrganizationDto), authGuard.authorise(), organizationController.updateOrganization);
router.delete('/:organizationId', authGuard.authorise(), organizationController.deleteOrganization);

export default router;