import { HttpStatus, Injectable } from '@nestjs/common';
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
          statusCode: HttpStatus.BAD_REQUEST,
          description: `"password" and "confirm_password" fields must be the same`,
        };

      if (findUser) {
        if (findUser.email === createUserDto.email)
          throw {
            message: 'badRequest',
            statusCode: HttpStatus.BAD_REQUEST,
            description: 'email is already in use by someone else',
          };

        if (findUser.username === createUserDto.username)
          throw {
            message: 'badRequest',
            statusCode: HttpStatus.BAD_REQUEST,
            description: 'username is already in use by someone else',
          };

        throw {
          message: 'internal server error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }

      const createUser = await this.userModel.create(createUserDto);

      return createUser;
    } catch (err) {
      throw err;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      return loginUserDto;
    } catch (err) {
      throw err;
    }
  }
}
