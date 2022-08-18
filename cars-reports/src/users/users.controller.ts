import {
  Body, Controller, Get, Post, Param, Query, Delete, Patch, NotFoundException,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.servce';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto) // applycall response with interceptor and dto
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password); // remember to return, unless it will cause error
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log("handling ...");
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
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
}
