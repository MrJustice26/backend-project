import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty,} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The username of the user'})
    readonly username : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The password of the user'})
    readonly password: string;

    @IsString()
    @ApiProperty({description: 'The avatar url of the user'})
    readonly avatarUrl: string;
}
