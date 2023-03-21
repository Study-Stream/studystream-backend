import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password: string;

}