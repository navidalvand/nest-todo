import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodoModule,
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todo'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
