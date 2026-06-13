import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class OrganizationLoginDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsOptional()
    @IsNumberString()
    @IsNotEmpty()
    @Length(6, 6, { message: "Code must be exactly 6 digits" })
    code?: string;
}