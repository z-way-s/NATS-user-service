import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.getAll' })
  getAllUsers(): string[] {
    return this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    return this.userService.getHello();
  }
}
