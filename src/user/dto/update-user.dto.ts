import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The new password of the user'})
    readonly password: string;

    @IsString()
    @ApiProperty({description: 'The new avatar url of the user'})
    readonly avatarUrl: string;
}