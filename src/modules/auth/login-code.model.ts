import { Schema, model, Document } from 'mongoose';

export interface ILoginCode extends Document {
    email: string;
    code: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const loginCodeSchema = new Schema<ILoginCode>({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

export const LoginCode = model<ILoginCode>('LoginCode', loginCodeSchema);