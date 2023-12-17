import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {

  constructor(
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
  ) {}
  
  create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = new UserRole();
    userRole.roleId = createUserRoleDto.roleId;
    userRole.userId = createUserRoleDto.userId;
    return this.userRoleRepository.save(userRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(id: number) {
    return this.userRoleRepository.findOneBy({id});
  }

  remove(id: number) {
    return this.userRoleRepository.delete({id});
  }
}
