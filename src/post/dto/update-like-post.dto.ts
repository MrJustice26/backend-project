import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLikePostDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Id of the user who liked/unliked the post',
    required: true,
  })
  readonly userId: number;
}
