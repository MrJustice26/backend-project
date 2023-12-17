import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional, Validate} from 'class-validator'
import { UsernameFormatValidator } from '../validators/username.validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The username of the user'})
    @Validate(UsernameFormatValidator, {
        message: 'Invalid username format. Username can contain only letters, numbers, underscores and dashes.'
    })
    readonly username : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The password of the user'})
    readonly password: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: 'The avatar url of the user'})
    readonly avatarUrl: string;
}
