import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.title = createRoleDto.title;
    
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({id});
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = new Role();
    role.title = updateRoleDto.title;
    role.id = id;
    return this.roleRepository.save(role);
  }

  remove(id: number) {
    return this.roleRepository.delete({id});
  }
}
