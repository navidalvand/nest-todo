import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { DatabaseService } from '../database/database.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private databaseService: DatabaseService,
    private authService: AuthService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const result = await this.authService.create(createUserDto, response);
      return result;
    } catch (err) {
      return new HttpException(
        { message: err.message, description: err.description } ||
          'internal server error',
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
