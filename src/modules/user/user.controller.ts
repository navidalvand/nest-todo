import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const result = await this.userService.create(createUserDto, response);
      return result;
    } catch (err) {
      return new HttpException(
        { message: err.message, description: err.description } ||
          'internal server error',
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const x = await this.userService.login(loginUserDto);
    console.log(x);
    return x;
  }
}
