import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.servce';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
