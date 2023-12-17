import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({summary: 'Create new user.'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all users.'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get user by id.'})
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user by id.'})
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(":id/profile")
  @ApiOperation({summary: 'Update user profile by id.'})
  updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete user by id.'})
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
