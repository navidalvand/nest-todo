import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return createUserDto;
    } catch (err) {}
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      let user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user)
        user = await this.userModel.create({ email: loginUserDto.email });
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
