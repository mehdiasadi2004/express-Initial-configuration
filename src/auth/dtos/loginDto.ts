import { IsDefined, IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class LoginDto{
    
    @IsEmail()
    @IsDefined()
    email: string;
    @IsDefined()
    @MinLength(8)
    password: string;
    
}