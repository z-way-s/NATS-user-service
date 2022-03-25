import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface, UserModel } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorResponse } from 'src/app.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(
    user: CreateUserDto,
  ): Promise<UserInterface | ErrorResponse> {
    let newUser;
    try {
      newUser = new this.userModel(user);
    } catch (err) {
      return Promise.reject({
        statusCode: 400,
        message: err.message,
      });
    }
    if (!newUser) {
      return Promise.reject({
        statusCode: 400,
        message: 'User not created',
      });
    }
    const result = await newUser.save();
    return {
      login: result.login,
      email: result.email,
      name: result.name,
      surname: result.surname,
      phone: result.phone,
      role: result.role,
    };
  }

  async getUsers(): Promise<UserInterface[] | ErrorResponse> {
    const users = await this.userModel.find();
    if (!users) {
      return Promise.reject({
        statusCode: 400,
        message: 'Users not found',
      });
    }
    return users.map((user) => {
      return {
        id: user._id,
        login: user.login,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        role: user.role,
      };
    });
  }

  async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserInterface | ErrorResponse> {
    console.log(id);
    let result;
    try {
      result = await this.userModel.findById(id);
    } catch (err) {
      return Promise.reject({
        statusCode: 400,
        message: err.message,
      });
    }
    if (!result) {
      return Promise.reject({
        statusCode: 400,
        message: 'User not found',
      });
    }
    if (user.login) result.login = user.login;
    if (user.password) result.password = user.password;
    if (user.email) result.email = user.email;
    if (user.name) result.name = user.name;
    if (user.surname) result.surname = user.surname;
    if (user.phone) result.phone = user.phone;
    if (user.role) result.role = user.role;
    try {
      await result.save();
    } catch (err) {
      return Promise.reject({
        statusCode: 400,
        message: err.message,
      });
    }
    return {
      login: result.login,
      email: result.email,
      name: result.name,
      surname: result.surname,
      phone: result.phone,
      role: result.role,
    };
  }

  async login(
    login: string,
    password: string,
  ): Promise<UserInterface | ErrorResponse> {
    const user = await this.userModel.findOne({ login, password });
    if (!user) {
      return Promise.reject({
        statusCode: 400,
        message: 'User not found',
      });
    }
    return {
      login: user.login,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      role: user.role,
    };
  }
}
