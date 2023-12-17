import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateUserRoleDto {
    @IsNotEmpty()
    @IsNumberString()
    readonly userId: number;

    @IsNotEmpty()
    @IsNumberString()
    readonly roleId: number;
}
