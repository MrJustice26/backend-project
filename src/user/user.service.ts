import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.avatarUrl = createUserDto.avatarUrl;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.avatarUrl = updateUserDto.avatarUrl;
    user.id = id;
    user.updatedAt = new Date().toISOString();
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
