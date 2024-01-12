import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Todo {
  @Prop({ required: true, type: String })
  title: string;
  @Prop()
  description: string;
  @Prop()
  schedule: string;
  @Prop({ required: true, default: false })
  done: boolean;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  author: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
