import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserRoleDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: 'The id of the user who has the role'})
    readonly userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description: 'The id of the role the user has'})
    readonly roleId: number;
}
