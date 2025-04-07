import { IsDefined, IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateProductDto{
    @MaxLength(20)
    @IsDefined()
    title: string;
    @IsDefined()
    description: string;
    @IsDefined()
    price: number;
    @IsOptional()
    tags: string[];
    @IsOptional()
    user: string|undefined;
}