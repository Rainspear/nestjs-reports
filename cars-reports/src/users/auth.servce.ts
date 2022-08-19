import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signup(email: string, password: string) {
    // check is email exist
    const users = await this.usersService.findByEmail(email);
    console.log("users", users);
    if (users.length) {
      throw new BadRequestException("User is existed");
    }
    // randomBytes scrypt promisify
    const salt = randomBytes(8).toString('hex');
    // hash password
    const hash = await scrypt(password, salt, 32) as Buffer; // output has 32 bytes after hash
    const result = salt + "." + hash.toString('hex');
    // create new entity with hash password
    // save to db
    const user = await this.usersService.createUser(email, result);
    return user;
  }

  async signin(email: string, password: string) { 
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = await scrypt(password, salt, 32) as Buffer; // output has 32 bytes after hash
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException("Bad password");
    }
    return user;
  }
}