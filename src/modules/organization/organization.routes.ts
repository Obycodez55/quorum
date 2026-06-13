import { Router } from "express";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { Validator } from "../../utils/validator";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./organization.dto";


const router = Router();
const organizationService = new OrganizationService();
const organizationController = new OrganizationController(organizationService);
const validator = new Validator();



router.post('/', validator.validate(CreateOrganizationDto), organizationController.createOrganization);
router.get('/:organizationId', organizationController.getOrganizationById);
router.put('/:organizationId', validator.validate(UpdateOrganizationDto), organizationController.updateOrganization);
router.delete('/:organizationId', organizationController.deleteOrganization);

export default router;