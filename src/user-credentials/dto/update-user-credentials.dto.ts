import { PartialType } from '@nestjs/swagger';
import { CreateUserCredentialsDto } from './create-user-credentials.dto';

export class UpdateUserCredentialsDto extends PartialType(
  CreateUserCredentialsDto,
) {
  password: string;
}
