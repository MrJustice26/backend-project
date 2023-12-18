import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsOptional()
    @IsString()
    @ApiProperty({description: 'The new full name of the user'})
    fullName: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty({description: 'The new phone number of the user with country code'})
    phoneNumberWithCountryCode: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: 'The new street of the user'})
    street: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({description: 'The new house number of the user'})
    houseNumber: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({description: 'The new apartment number of the user'})
    apartmentNumber: number;

    @IsOptional()
    @IsString()
    @ApiProperty({description: 'The new city of the user'})
    city: string;

    @IsOptional()
    @IsPostalCode('PL')
    @ApiProperty({description: 'The new postal code of the user'})
    postalCode: string;
}
