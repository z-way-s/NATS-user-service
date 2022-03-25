import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ErrorResponse } from 'src/app.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './models/user.model';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.getAll' })
  async getUsers(): Promise<UserInterface[] | ErrorResponse> {
    return await this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'user.create' })
  async createUser(
    @Payload() user: CreateUserDto,
  ): Promise<UserInterface | ErrorResponse> {
    return this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'user.update' })
  async updateUser(
    @Payload() payload: any,
  ): Promise<UserInterface | ErrorResponse> {
    return await this.userService.updateUser(payload.id, payload.user);
  }

  @MessagePattern({ cmd: 'user.login' })
  async login(@Payload() payload: any): Promise<UserInterface | ErrorResponse> {
    return await this.userService.login(payload.login, payload.password);
  }
}
