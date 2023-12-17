import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator'

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description: 'The title of the role'})
    readonly title: string;
}
