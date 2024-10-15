import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto):Promise<User>{
    try {
      const hashPass = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        username: createUserDto.username,
        password: hashPass,
        email: createUserDto.email,
      });
      return await newUser.save()
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err)
      
    }
  }


  async findOne(username:string) {
      const user : User = await this.userModel.findOne({username})
      if(!user) throw new NotFoundException("User not found")
        return user
  }


}
