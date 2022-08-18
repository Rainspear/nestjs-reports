import {
  Body, Controller, Get, Post, Param, Query, Delete, Patch, NotFoundException,
  // UseInterceptors,
  // ClassSerializerInterceptor 
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto) // applycall response with interceptor and dto
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log("users-body", body);
    this.usersService.createUser(body.email, body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log("handling ...");
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found when removed');
    }
    return user;
  }

  @Get()
  findAllUserByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  // @Post('/singin')
  // login(@Body body: ) {

  // }
}
