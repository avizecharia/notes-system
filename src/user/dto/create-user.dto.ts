
import {IsString,IsEmail,MinLength, isString} from 'class-validator'
export class CreateUserDto {
    @IsString()
    username:string
    @IsString()
    @MinLength(6,{message:"password is to sort must be at lest 6 chars"})
    password:string
    @IsEmail({},{message:"invalid email format"})
    email:string

}
