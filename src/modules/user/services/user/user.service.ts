import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from '../../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto, response) {
    try {
      const { confirm_password, password, username, email } = createUserDto;

      const findUser = await this.findOne({
        $or: [{ username }, { email }],
      });

      if (password !== confirm_password)
        throw {
          message: 'badRequest',
          statusCode: HttpStatus.BAD_REQUEST,
          description: `"password" and "confirm_password" fields must be the same`,
        };

      if (findUser) {
        if (findUser.email === email)
          throw {
            message: 'badRequest',
            statusCode: HttpStatus.BAD_REQUEST,
            description: 'email is already in use by someone else',
          };

        if (findUser.username === username)
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

      const createUser = await this.userModel.create({
        email,
        password: await this.hashPassword(password),
        username,
      });

      const token = this.authService.signToken(username);
      console.log(token);
      response.cookie('token', token);

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

  async hashPassword(password): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw err;
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (err) {
      throw err;
    }
  }

  async findOne(options): Promise<User | any> {
    try {
      const findUser = await this.userModel.findOne(options);
      return findUser ? findUser : null;
    } catch (err) {
      throw err;
    }
  }
}
