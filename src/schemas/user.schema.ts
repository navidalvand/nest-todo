import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: String })
  email?: string;

  @Prop({ required: true, min: 1, max: 12 })
  username: string;

  @Prop({ required: true, min: 8, max: 24 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
