import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The full name of the user'})
    fullName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The phone number of the user with country code'})
    phoneNumberWithCountryCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The street of the user'})
    street: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The house number of the user'})
    houseNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The apartment number of the user'})
    apartmentNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The city of the user'})
    city: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The postal code of the user'})
    postalCode: string;
}