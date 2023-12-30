import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordFormatValidator } from '../validators/password.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The new password of the user' })
  @Validate(PasswordFormatValidator)
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The new avatar url of the user' })
  readonly avatarUrl: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The new role id of the user' })
  readonly roleId: number;
}
