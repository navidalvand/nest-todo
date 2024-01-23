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
      const findUser = await this.userModel.findOne({
        $or: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (createUserDto.password !== createUserDto.confirm_password)
        throw {
          message: 'badRequest',
          statusCode: 400,
          fullMessage: `"password" and "confirm_password" fields must be the same`,
        };

      console.log(findUser);
      if (findUser) {
        if (findUser.email === createUserDto.email)
          throw {
            message: 'email is already in use by someone else',
            statusCode: 400,
          };

        if (findUser.username === createUserDto.username)
          throw {
            message: 'username is already in use by someone else',
            statusCode: 400,
          };

        throw {
          message: 'internal server error',
          statusCode: 500,
        };
      }

      const createUser = await this.userModel.create(createUserDto);

      console.log(createUser);

      return createUser;
    } catch (err) {
      throw err;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
    } catch (err) {
      throw err;
    }
  }
}
