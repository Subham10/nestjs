import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService,@Inject('USER_MICROSERVICE') private readonly user_client:ClientProxy) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
  @Post('register_user')
  registerUser(@Body() userData:any){
    const name=userData.name;
    const email=userData.email;
    return this.user_client.send({cmd:'register_user'},{name:name,email:email});
  }
  
  @Get('fetchAllUser')
  fetchAllUser(){
    return this.user_client.send({cmd:'findAllUser'},{});
  }
}
