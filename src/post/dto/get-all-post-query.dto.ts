import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import { booleanString } from 'src/customTypes/booleanString';

export class GetAllPostQueryDto {
  @IsOptional()
  @IsNumberString()
  readonly offset: number;

  @IsOptional()
  @IsNumberString()
  readonly limit: number;

  @IsOptional()
  @IsBooleanString()
  readonly withComments: booleanString;

  @IsOptional()
  @IsBooleanString()
  readonly withCreator: booleanString;
}
