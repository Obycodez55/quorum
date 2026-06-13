import { IOrganization, Organization } from "./organization.model";
import { ConflictException, NotFoundException } from "../../utils/exceptions";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./organization.dto";


export class OrganizationService {
    async getOrganizationByEmail(email: string): Promise<IOrganization | null> {
        return await Organization.findOne({ email });
    }

    async createOrganization(organization: CreateOrganizationDto): Promise<IOrganization> {
        const existingOrganization = await Organization.findOne({ email: organization.email });
        if (existingOrganization) {
            throw new ConflictException('Organization already exists');
        }
        const newOrganization = await Organization.create(organization);
        return newOrganization.toObject();
    }

    async getOrganizationById(organizationId: string): Promise<IOrganization | null> {
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        return organization.toObject();
    }

    async updateOrganization(organizationId: string, organizationUpdate: UpdateOrganizationDto): Promise<IOrganization | null> {
        const existingOrganization = await Organization.findById(organizationId);
        if (!existingOrganization) {
            throw new NotFoundException('Organization not found');
        }
        existingOrganization.set(organizationUpdate);
        await existingOrganization.save();
        return existingOrganization.toObject();
    }

    async deleteOrganization(organizationId: string): Promise<void> {
        const existingOrganization = await Organization.findById(organizationId);
        if (!existingOrganization) {
            throw new NotFoundException('Organization not found');
        }
        await existingOrganization.deleteOne();
    }
}