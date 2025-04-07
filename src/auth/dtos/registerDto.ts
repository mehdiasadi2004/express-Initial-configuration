import {
  IsDefined,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @MaxLength(20)
  @IsDefined()
  name: string;
  @IsEmail()
  @IsDefined()
  email: string;
  @IsDefined()
  @MinLength(8)
  password: string;
}
