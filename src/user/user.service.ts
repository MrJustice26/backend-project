import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const DEFAULT_USER_ROLE_ID = 1;

    const userWithTheSameUserName = await this.userRepository.findOneBy({username: createUserDto.username});
    if(userWithTheSameUserName){
      return new BadRequestException('User with the same username already exists');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.avatarUrl = createUserDto.avatarUrl;
    user.posts = [];
    user.comments = [];
    user.role = DEFAULT_USER_ROLE_ID;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({relations: ['posts', 'comments', 'role']});
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      return new BadRequestException('User not found')
    }

    user.password = updateUserDto.password;
    user.avatarUrl = updateUserDto.avatarUrl;
    user.updatedAt = new Date().toISOString();
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }

  async addPostToUser(id: number, post: Post){
    const user = await this.userRepository.findOne({
      where: {id},
      relations: ['posts', 'comments']
    })   
    if(!user){
      return new BadRequestException('User not found')
    }

    user.posts.push(post);
    return this.userRepository.save(user);
  }
}
