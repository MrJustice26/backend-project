import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({summary: 'Create new role.'})
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all roles.'})
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get role by id.'})
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update role by id.'})
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete role by id.'})
  remove(@Param('id') id: number) {
    return this.roleService.remove(+id);
  }
}
