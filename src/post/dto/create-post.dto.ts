import {IsString, IsNotEmpty, IsNumberString} from 'class-validator'

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly body: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly creator: number;
}
