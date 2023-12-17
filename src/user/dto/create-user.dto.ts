import {IsString, IsNotEmpty, IsNumberString, IsDateString} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username : string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsString()
    readonly avatarUrl: string;
}
