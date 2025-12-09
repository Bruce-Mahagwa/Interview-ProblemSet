import { IsNumber, IsObject, IsString, Length } from "class-validator";
export class AuthDto {
    @IsString()    
    email: string

    @IsString()
    password: string    
}