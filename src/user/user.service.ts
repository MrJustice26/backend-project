import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { isUndefined } from 'src/helpers/isUndefined';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly profileService: ProfileService,
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

    user.profile = await this.profileService.create({
      fullName: undefined,
      city: undefined,
      street: undefined,
      houseNumber: undefined,
      apartmentNumber: undefined,
      phoneNumberWithCountryCode: undefined,
      postalCode: undefined,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({relations: ['posts', 'comments', 'role']});
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {id},
      relations: ['posts', 'comments', 'role']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: ['posts', 'comments', 'role']
    });
    if(!user){
      return new BadRequestException('User not found')
    }

    if(updateUserDto.role !== undefined){
      const roleExist = await this.roleRepository.findOneBy({id: updateUserDto.role});
      if(!roleExist){
        return new BadRequestException('Role not found')
      }
    }

    if(!isUndefined(updateUserDto.password)){
      user.password = updateUserDto.password;
    }

    if(!isUndefined(updateUserDto.avatarUrl)){
      user.avatarUrl = updateUserDto.avatarUrl;
    }

    if(!isUndefined(updateUserDto.role)){
      user.role = updateUserDto.role;
    }

    user.updatedAt = new Date().toISOString();
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }
  
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const currentUser = await this.userRepository.findOne({
      where: {id},
      relations: ['profile']
    })
    if(!currentUser){
      return new BadRequestException('User not found')
    }
    const userProfileId = currentUser?.profile?.id;
    if(!userProfileId){
      return new BadRequestException('User profile not found')
    }

    currentUser.updatedAt = new Date().toISOString();
    await this.userRepository.save(currentUser);
    return this.profileService.update(userProfileId, updateProfileDto);
  }
}
