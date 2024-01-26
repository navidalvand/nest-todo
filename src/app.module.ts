import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todo'),
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
