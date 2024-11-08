import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  Users:CreateUserDto[]=[]
  
  async createUsers(createUserDto: CreateUserDto) {
    this.Users.push(createUserDto)
  }
  create(createUserDto: CreateUserDto) {
    this.Users.push(createUserDto)
  }

  findAll() {
    return `This action returns all user`;
  }
  async findAllUsers() {
    // return `This action returns all user`;
    return this.Users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
