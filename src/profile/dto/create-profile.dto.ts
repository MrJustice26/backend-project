import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The full name of the user'})
    fullName: string;

    @IsPhoneNumber()
    @IsOptional()
    @ApiProperty({description: 'The phone number of the user with country code'})
    phoneNumberWithCountryCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The street of the user'})
    street: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({description: 'The house number of the user'})
    houseNumber: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({description: 'The apartment number of the user'})
    apartmentNumber: number;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The city of the user'})
    city: string;

    @IsPostalCode()
    @IsOptional()
    @ApiProperty({description: 'The postal code of the user'})
    postalCode: string;
}