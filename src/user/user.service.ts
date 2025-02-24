import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (u) => u.username === registerUserDto.username,
    );

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User();
    newUser.username = registerUserDto.username;
    newUser.password = registerUserDto.password;

    users.push(newUser);

    await this.dbService.write(users);

    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const findUser = users.find((u) => u.username === loginUserDto.username);

    if (!findUser) {
      throw new BadRequestException('用户名或密码错误');
    }

    if (findUser.password !== loginUserDto.password) {
      throw new BadRequestException('用户名或密码错误');
    }

    return findUser;
  }
}
