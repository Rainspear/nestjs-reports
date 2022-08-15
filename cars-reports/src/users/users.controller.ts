import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log("users-body", body);
    this.usersService.createUser(body.email, body.password);
  }

  // @Post('/singin')
  // login(@Body body: ) {

  // }
}
 