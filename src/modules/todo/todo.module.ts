import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
