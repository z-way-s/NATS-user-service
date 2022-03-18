import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  getAllUsers(): string[] {
    return ['John', 'Doe'];
  }
}
