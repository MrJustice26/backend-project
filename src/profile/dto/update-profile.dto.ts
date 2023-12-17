import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new full name of the user'})
    fullName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new phone number of the user with country code'})
    phoneNumberWithCountryCode: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new street of the user'})
    street: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new house number of the user'})
    houseNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new apartment number of the user'})
    apartmentNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new city of the user'})
    city: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'The new postal code of the user'})
    postalCode: string;
}
