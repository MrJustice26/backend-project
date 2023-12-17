import { IsNumberString, IsOptional } from "class-validator";

export class GetAllPostQueryDto {
    @IsOptional()
    @IsNumberString()
    readonly offset: number;

    @IsOptional()
    @IsNumberString()
    readonly limit: number;
}