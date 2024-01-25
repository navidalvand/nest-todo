import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signToken(username: string): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOne({ username });

      const payload = { id: user._id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
