import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUndefined } from 'src/helpers/isUndefined';

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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOneBy({id});
    if(!role){
      return new BadRequestException('Role not found')
    }
    
    if(!isUndefined(updateRoleDto.title)){
      role.title = updateRoleDto.title;
    }
    return this.roleRepository.save(role);
  }

  remove(id: number) {
    return this.roleRepository.delete({id});
  }

  getUsersWithAccordingRole(id: number){
    return this.roleRepository.query(`SELECT * FROM "user" INNER JOIN "role" ON "user"."roleId" = "role".id WHERE "user"."roleId" = ${id};`)
  }
}
