import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    private databaseService: DatabaseService,
  ) {}

  async create(createUserDto: CreateUserDto, response) {
    try {
      const { confirm_password, password, username, email } = createUserDto;

      const findUser = await this.databaseService.findOne(this.userModel, {
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

      const token = await this.signToken(username);
      console.log(token);
      response.cookie('token', token);

      return createUser;
    } catch (err) {
      throw err;
    }
  }

  async signToken(username: string): Promise<{ access_token: string }> {
    try {
      const user = await this.databaseService.findOne(this.userModel, {
        username,
      });

      const payload = { id: user._id, username: user.username };
      console.log(payload);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
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
}
