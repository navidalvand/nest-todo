import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: 'ckdskslnacksdncjkbas82s038dhcjwe',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [DatabaseService, AuthService],
})
export class AuthModule {}
