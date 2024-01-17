import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserCredentialsDto } from './dto/create-user-credentials.dto';
import { UpdateUserCredentialsDto } from './dto/update-user-credentials.dto';
import { UserCredentials } from './entities/user-credentials.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/password';

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async create(createUserCredentialsDto: CreateUserCredentialsDto) {
    const newUserCredentials = new UserCredentials();

    const hashedPassword = await hashPassword(
      createUserCredentialsDto.password,
    );

    newUserCredentials.password = hashedPassword;
    newUserCredentials.email = createUserCredentialsDto.email;
    return this.userCredentialsRepository.save(newUserCredentials);
  }

  findByEmail(email: string) {
    return this.userCredentialsRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserCredentialDto: UpdateUserCredentialsDto) {
    const userCredentials = await this.userCredentialsRepository.findOneBy({
      id,
    });
    if (!userCredentials) {
      return new BadRequestException('UserCredentials not found');
    }

    const hashedPassword = await hashPassword(updateUserCredentialDto.password);

    userCredentials.password = hashedPassword;
    return this.userCredentialsRepository.save(userCredentials);
  }

  remove(id: number) {
    return this.userCredentialsRepository.delete({ id });
  }
}
