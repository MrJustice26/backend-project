import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator'
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The title of the post'})
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The body of the post'})
    readonly body: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: 'The id of the user who created the post'})
    readonly creator: number;
}
