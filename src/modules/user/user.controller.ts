import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (err) {
      return new HttpException(
        err.message || 'internal server error',
        err.statusCode || 500,
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
