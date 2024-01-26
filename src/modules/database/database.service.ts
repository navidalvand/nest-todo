import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class DatabaseService {
  async findOne(Model: Model<User>, options): Promise<Model<User> | any> {
    try {
      const find = await Model.findOne(options);
      return find ? find : null;
    } catch (err) {
      throw err;
    }
  }
}
