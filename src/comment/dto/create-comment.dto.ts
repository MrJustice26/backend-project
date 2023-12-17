import {IsString, IsNotEmpty, IsNumberString} from 'class-validator'

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    readonly body: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly creator: number;
}
