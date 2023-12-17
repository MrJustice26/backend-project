import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator'

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The body of the comment'})
    readonly body: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: 'The id of the post this comment belongs to'})
    readonly creator: number;
}
