import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckLogin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.url);

    console.log('token check');
    next();
  }
}
