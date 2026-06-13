import { Schema, model, Document } from 'mongoose';

export interface IOrganization extends Document {
    name: string;
    email: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, required: true }
}, { timestamps: true });

export const Organization = model<IOrganization>('Organization', organizationSchema);