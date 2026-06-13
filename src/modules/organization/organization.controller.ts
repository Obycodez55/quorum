import { Request, Response } from "express";
import { ResponseDto, ResponseStatus } from "../../dtos/response.dto";
import { HttpStatus } from "../../utils/http-enum";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./organization.dto";


export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    async createOrganization(req: Request<{}, {}, CreateOrganizationDto>, res: Response) {
        const organization = await this.organizationService.createOrganization(req.body);
        const response = new ResponseDto(ResponseStatus.SUCCESS, 'Organization created successfully', organization);
        res.status(HttpStatus.CREATED).send(response);
    }

    async getOrganizationById(req: Request<{ organizationId: string }>, res: Response) {
        const id = req.params.organizationId == "me" ? (req as any).organization.id : req.params.organizationId;
        const organization = await this.organizationService.getOrganizationById(id);
        const response = new ResponseDto(ResponseStatus.SUCCESS, 'Organization fetched successfully', organization);
        res.status(HttpStatus.OK).send(response);
    }

    async updateOrganization(req: Request<{ organizationId: string }, {}, UpdateOrganizationDto>, res: Response) {
        const organization = await this.organizationService.updateOrganization(req.params.organizationId, req.body);
        const response = new ResponseDto(ResponseStatus.SUCCESS, 'Organization updated successfully', organization);
        res.status(HttpStatus.OK).send(response);
    }

    async deleteOrganization(req: Request<{ organizationId: string }>, res: Response) {
        await this.organizationService.deleteOrganization(req.params.organizationId);
        const response = new ResponseDto(ResponseStatus.SUCCESS, 'Organization deleted successfully');
        res.status(HttpStatus.NO_CONTENT).send(response);
    }
}