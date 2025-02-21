import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码是必需的' })
  @MinLength(8, { message: '密码必须至少8个字符长' })
  password: string;
}
