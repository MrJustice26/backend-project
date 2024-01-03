import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Validate,
  IsEmail,
} from 'class-validator';
import { UsernameFormatValidator } from '../validators/username.validator';
import { PasswordFormatValidator } from '../validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The username of the user' })
  @Validate(UsernameFormatValidator, {
    message:
      'Invalid username format. Username can contain only letters, numbers, underscores and dashes.',
  })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  @Validate(PasswordFormatValidator)
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The avatar url of the user' })
  readonly avatarUrl: string;
}
