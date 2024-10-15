import {IsString,IsEmail,MinLength} from 'class-validator'


export class Login {
    @IsString()
    username: string
    @IsString()
    @IsEmail()
    password:string
}