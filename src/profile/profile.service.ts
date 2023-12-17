import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ){}

  create(createProfileDto: CreateProfileDto) {
    const profile = new Profile();
    profile.fullName = createProfileDto.fullName;
    profile.city = createProfileDto.city;
    profile.street = createProfileDto.street;
    profile.houseNumber = createProfileDto.houseNumber;
    profile.apartmentNumber = createProfileDto.apartmentNumber;
    profile.phoneNumberWithCountryCode = createProfileDto.phoneNumberWithCountryCode;
    profile.postalCode = createProfileDto.postalCode;
    return this.profileRepository.save(profile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: {id}
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOneBy({id});
    if(!profile){
      return new BadRequestException('Profile not found')
    }
    
    profile.fullName = updateProfileDto.fullName;
    profile.city = updateProfileDto.city;
    profile.street = updateProfileDto.street;
    profile.houseNumber = updateProfileDto.houseNumber;
    profile.apartmentNumber = updateProfileDto.apartmentNumber;
    profile.phoneNumberWithCountryCode = updateProfileDto.phoneNumberWithCountryCode;
    profile.postalCode = updateProfileDto.postalCode;
    return this.profileRepository.save(profile);
  }

  remove(id: number) {
    return this.profileRepository.delete({id});
  }
}
