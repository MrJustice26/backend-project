import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The new title of the post'})
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The new body of the post'})
    readonly body: string;
}
