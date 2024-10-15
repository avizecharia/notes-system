import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.interface';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(
    private userService:UserService
  ){}
  async validateUser(loginDto: Login) {
    try {
      const user :User = await this.userService.findOne(loginDto.username)
      if(!user) throw new UnauthorizedException("user not found")
      const verify  = bcrypt.compare(loginDto.password,user.password)
      if(!verify)throw new Error("Rong password")
        const payload = {
       username:user.username,
       id:user.id
    }
      const token = jwt.sign(payload,process.env.SECRET_KEY)
      return {token}
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

 
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
